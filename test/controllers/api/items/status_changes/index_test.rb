require "test_helper"

class Api::Items::StatusChangesIndexTest < ActionDispatch::IntegrationTest
  setup do
    @item = items(:dark_mode)
    @item.change_status!("planned", by: users(:board_owner))
    travel 1.minute
    @item.change_status!("done", by: users(:board_owner))
  end

  def list(item = @item)
    get api_item_status_changes_path(item), as: :json
  end

  test "the owner sees the history, newest first" do
    sign_in users(:board_owner)

    list

    assert_response :success
    assert_equal %w[done planned], json.map { |change| change["status"] }
    assert_equal "owner@example.com", json.first["changed_by"]
    assert json.first["created_at"].present?
  end

  test "an item without changes has an empty history" do
    sign_in users(:board_owner)

    list(items(:export_csv))

    assert_response :success
    assert_equal [], json
  end

  test "the author cannot see the history" do
    sign_in users(:author)

    list

    assert_response :forbidden
  end

  test "a signed-out visitor cannot see the history" do
    list

    assert_response :unauthorized
  end

  test "unknown item returns 404" do
    sign_in users(:board_owner)

    get api_item_status_changes_path(item_id: 0), as: :json

    assert_response :not_found
  end
end
