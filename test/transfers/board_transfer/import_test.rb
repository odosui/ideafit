require "test_helper"

class BoardTransfer::ImportTest < ActiveSupport::TestCase
  include ActiveJob::TestHelper

  def document(**overrides)
    {
      "format" => "ideafit",
      "version" => 1,
      "users" => [
        { "id" => "u1", "name" => "Ada", "email" => "ada@example.com" },
        { "id" => "u2", "name" => "Grace" },
      ],
      "items" => [
        {
          "id" => "idea-1",
          "kind" => "idea",
          "title" => "Offline mode",
          "text" => "Works on a plane",
          "status" => "planned",
          "author" => "u1",
          "created_at" => "2025-03-01T12:00:00Z",
          "voters" => ["u1", "u2"],
        },
      ],
    }.merge(overrides.stringify_keys)
  end

  def import(data = document)
    BoardTransfer::Import.new(boards(:roadmap), data).run
  end

  def imported_item
    boards(:roadmap).items.find_by!(external_id: "idea-1")
  end

  test "imports items with their votes, dates and statuses" do
    assert_equal({ users: 2, items: 1, votes: 2 }, import)

    item = imported_item
    assert_equal ["Offline mode", "Works on a plane", "idea", "planned", 2],
      [item.title, item.text, item.kind, item.status, item.votes_count]
    assert_equal Time.utc(2025, 3, 1, 12), item.created_at
    assert_equal "u1", item.user.external_id
  end

  test "people become the site's users in the board's workspace" do
    import

    ada = workspaces(:main).embed_users.find_by!(external_id: "u1")
    assert_equal ["Ada", "ada@example.com"], [ada.name, ada.email]
    assert_not ada.admin?
  end

  test "imported voters follow the item but hear nothing yet" do
    assert_no_enqueued_jobs { import }

    assert_equal 2, imported_item.subscribers.count
  end

  test "running it again updates instead of duplicating" do
    import

    assert_no_difference -> { Item.count } => 0, -> { Vote.count } => 0, -> { User.count } => 0 do
      import document(items: [document["items"].first.merge("title" => "Offline mode, please")])
    end
    assert_equal "Offline mode, please", imported_item.title
  end

  test "items may refer to users imported earlier" do
    import

    import document(users: [], items: [{ "kind" => "bug", "title" => "Crash", "author" => "u2" }])

    assert_equal "u2", boards(:roadmap).items.find_by!(title: "Crash").user.external_id
  end

  test "is all or nothing" do
    broken = document(items: [document["items"].first, { "kind" => "idea", "title" => "Orphan", "author" => "nobody" }])

    error = assert_raises(BoardTransfer::Invalid) { import(broken) }

    assert_equal 'items[1]: unknown user "nobody", add them to "users"', error.message
    assert_not boards(:roadmap).items.exists?(external_id: "idea-1")
    assert_not workspaces(:main).embed_users.exists?
  end

  test "explains what's wrong" do
    {
      document(format: "canny") => 'not an Ideafit file: "format" must be "ideafit"',
      document(version: 2) => 'unsupported "version" 2, expected 1',
      document(items: {}) => '"items" must be a list',
      document(users: [{ "name" => "No id" }]) => "users[0]: user id is missing",
      document(items: [{ "title" => "X", "author" => "u1", "status" => "done" }]) => 'items[0]: unknown status "done", expected one of new, planned, in_progress, ready, shipped, declined',
      document(items: [{ "kind" => "feature", "title" => "X", "author" => "u1" }]) => "items[0]: Validation failed: Kind is not included in the list",
      document(items: [{ "kind" => "idea", "title" => "X", "author" => "u1", "created_at" => "yesterday" }]) => 'items[0]: "created_at" must be an ISO 8601 time, like 2025-03-01T12:00:00Z',
    }.each do |data, message|
      assert_equal message, assert_raises(BoardTransfer::Invalid) { import(data) }.message
    end
  end

  test "rejects invalid JSON" do
    assert_raises(BoardTransfer::Invalid) { BoardTransfer::Import.from_json(boards(:roadmap), "{nope") }
  end
end
