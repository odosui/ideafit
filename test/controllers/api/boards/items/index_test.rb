require "test_helper"

class Api::Boards::ItemsIndexTest < ActionDispatch::IntegrationTest
  setup do
    items(:dark_mode).update_columns(created_at: 3.days.ago)
    items(:export_csv).update_columns(created_at: 2.days.ago)
    items(:crash_on_login).update_columns(created_at: 1.day.ago)
    items(:spam).update_columns(created_at: 4.days.ago)
  end

  def titles
    json.map { |item| item["title"] }
  end

  def list(params = {})
    get api_board_items_path("roadmap0pid"), params:, as: :json
  end

  test "the owner sees every item, newest first" do
    sign_in users(:board_owner)

    list

    assert_response :success
    assert_equal ["Crash on login", "Export to CSV", "Dark mode", "Buy cheap stuff"], titles
  end

  test "includes the author and creation date" do
    sign_in users(:board_owner)

    list(q: "dark")

    assert_equal "author@example.com", json.first["author"]
    assert json.first["created_at"].present?
  end

  test "filters by kind, status and search" do
    sign_in users(:board_owner)

    list(kind: "bug")
    assert_equal ["Crash on login"], titles

    list(status: "rejected")
    assert_equal ["Buy cheap stuff"], titles

    list(q: "csv")
    assert_equal ["Export to CSV"], titles
  end

  test "sorts by votes and by age" do
    sign_in users(:board_owner)

    list(sort: "most_voted")
    assert_equal "Dark mode", titles.first

    list(sort: "oldest")
    assert_equal "Buy cheap stuff", titles.first
  end

  test "another user is forbidden" do
    sign_in users(:author)

    list

    assert_response :forbidden
  end

  test "signed-out visitor is unauthorized" do
    list

    assert_response :unauthorized
  end

  test "unknown board returns 404" do
    sign_in users(:board_owner)

    get api_board_items_path("nope"), as: :json

    assert_response :not_found
  end
end
