require "test_helper"

class Api::Items::HistoryShowTest < ActionDispatch::IntegrationTest
  setup do
    @item = items(:dark_mode)
    @item.edit!(title: "Night mode", text: nil, by: users(:author))
    travel 1.minute
    @item.change_status!("planned", by: users(:board_owner))
  end

  def show(item = @item)
    get api_item_history_path(item), as: :json
  end

  test "the owner sees edits and status changes, newest first" do
    sign_in users(:board_owner)

    show

    assert_response :success
    assert_equal %w[status_change edit], json.map { |event| event["type"] }
    assert_equal ["planned", "owner@example.com"], json.first.values_at("status", "by")
    assert_equal ["Dark mode", "author@example.com"], json.last.values_at("previous_title", "by")
    assert json.first["created_at"].present?
  end

  test "an untouched item has an empty history" do
    sign_in users(:board_owner)

    show(items(:export_csv))

    assert_response :success
    assert_equal [], json
  end

  test "the author cannot see the history" do
    sign_in users(:author)

    show

    assert_response :forbidden
  end

  test "a signed-out visitor cannot see the history" do
    show

    assert_response :unauthorized
  end

  test "unknown item returns 404" do
    sign_in users(:board_owner)

    get api_item_history_path(item_id: 0), as: :json

    assert_response :not_found
  end
end
