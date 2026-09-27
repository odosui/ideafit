require "test_helper"

class BoardTransfer::ExportTest < ActiveSupport::TestCase
  def exported(board = boards(:roadmap))
    BoardTransfer::Export.new(board).as_json
  end

  test "writes the board's items with their voters" do
    item = exported["items"].find { |entry| entry["title"] == "Dark mode" }

    assert_equal "idea", item["kind"]
    assert_equal "new", item["status"]
    assert_equal "ideafit:#{users(:author).id}", item["author"]
    assert_equal ["ideafit:#{users(:author).id}", "ideafit:#{users(:board_owner).id}"].sort, item["voters"].sort
  end

  test "names statuses as the board shows them" do
    statuses = exported["items"].to_h { |entry| [entry["title"], entry["status"]] }

    assert_equal "shipped", statuses["Crash on login"]
    assert_equal "declined", statuses["Buy cheap stuff"]
  end

  test "lists everyone who posted or voted, once" do
    ids = exported["users"].map { |user| user["id"] }

    assert_equal ids.uniq, ids
    assert_includes exported["users"], { "id" => "ideafit:#{users(:author).id}", "email" => "author@example.com" }
  end

  test "keeps the site's ids of imported users and items" do
    visitor = embed_user(name: "Visitor")
    boards(:roadmap).items.create!(user: visitor, kind: "bug", title: "Imported", external_id: "bug-7")

    item = exported["items"].find { |entry| entry["title"] == "Imported" }

    assert_equal ["bug-7", "site-42"], [item["id"], item["author"]]
  end

  test "imports back into another board" do
    target = boards(:side_project)

    summary = BoardTransfer::Import.new(target, exported).run

    assert_equal({ users: 3, items: 4, votes: 3 }, summary)
    assert_equal boards(:roadmap).items.pluck(:title).sort, target.items.pluck(:title).sort
  end
end
