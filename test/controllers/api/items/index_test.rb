require "test_helper"

class Api::ItemsIndexTest < ActionDispatch::IntegrationTest
  def titles
    json.map { |item| item["title"] }
  end

  test "returns every kind except rejected when kind is missing" do
    get api_items_path, params: { board_pid: "roadmap0pid" }, as: :json

    assert_response :success
    assert_equal ["Dark mode", "Crash on login", "Export to CSV"], titles
  end

  test "filters by kind" do
    get api_items_path, params: { board_pid: "roadmap0pid", kind: "bug" }, as: :json

    assert_equal ["Crash on login"], titles
  end

  test "filters by progress" do
    get api_items_path, params: { board_pid: "roadmap0pid", filter: "open" }, as: :json
    assert_equal ["Dark mode", "Export to CSV"], titles

    get api_items_path, params: { board_pid: "roadmap0pid", filter: "done" }, as: :json
    assert_equal ["Crash on login"], titles
  end

  test "marks what the viewer voted for and what they can edit" do
    sign_in users(:author)

    get api_items_path, params: { board_pid: "roadmap0pid", kind: "idea" }, as: :json

    dark_mode, export_csv = json
    assert_equal(
      { "votes" => 2, "voted" => true, "can_edit" => true, "can_delete" => true },
      dark_mode.slice("votes", "voted", "can_edit", "can_delete")
    )
    assert_equal false, export_csv["voted"]
  end

  test "the board owner may delete but not edit someone else's item" do
    sign_in users(:board_owner)

    get api_items_path, params: { board_pid: "roadmap0pid", kind: "idea" }, as: :json

    assert_equal({ "can_edit" => false, "can_delete" => true }, json.first.slice("can_edit", "can_delete"))
  end

  test "signed-out visitor sees items without votes or edit rights" do
    get api_items_path, params: { board_pid: "roadmap0pid" }, as: :json

    assert json.none? { |item| item["voted"] || item["can_edit"] || item["can_delete"] }
  end

  test "board owner sees rejected items" do
    sign_in users(:board_owner)

    get api_items_path, params: { board_pid: "roadmap0pid", filter: "rejected" }, as: :json

    assert_response :success
    assert_equal ["Buy cheap stuff"], titles
  end

  test "others cannot see rejected items" do
    sign_in users(:author)

    get api_items_path, params: { board_pid: "roadmap0pid", filter: "rejected" }, as: :json

    assert_response :forbidden
  end

  test "signed-out visitor cannot see rejected items" do
    get api_items_path, params: { board_pid: "roadmap0pid", filter: "rejected" }, as: :json

    assert_response :forbidden
  end

  test "unknown board returns 404" do
    get api_items_path, params: { board_pid: "nope" }, as: :json

    assert_response :not_found
  end
end
