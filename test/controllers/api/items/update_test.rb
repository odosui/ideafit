require "test_helper"

class Api::ItemsUpdateTest < ActionDispatch::IntegrationTest
  setup { @item = items(:dark_mode) }

  test "board owner changes the status" do
    sign_in users(:board_owner)

    patch api_item_path(@item), params: { status: "in_progress" }, as: :json

    assert_response :success
    assert_equal "in_progress", json["status"]
    assert_equal true, json["voted"]
    assert @item.reload.in_progress?
  end

  test "board owner can reject an item" do
    sign_in users(:board_owner)

    patch api_item_path(@item), params: { status: "rejected" }, as: :json

    assert_response :success
    assert @item.reload.rejected?
  end

  test "board owner can plan an item" do
    sign_in users(:board_owner)

    patch api_item_path(@item), params: { status: "planned" }, as: :json

    assert_response :success
    assert @item.reload.planned?
  end

  test "author cannot change the status" do
    sign_in users(:author)

    patch api_item_path(@item), params: { status: "done" }, as: :json

    assert_response :forbidden
    assert @item.reload.fresh?
  end

  test "stranger cannot change the status" do
    sign_in users(:stranger)

    patch api_item_path(@item), params: { status: "done" }, as: :json

    assert_response :forbidden
  end

  test "signed-out visitor cannot change the status" do
    patch api_item_path(@item), params: { status: "done" }, as: :json

    assert_response :unauthorized
  end

  test "unknown status returns 422" do
    sign_in users(:board_owner)

    patch api_item_path(@item), params: { status: "shipped" }, as: :json

    assert_response :unprocessable_content
    assert @item.reload.fresh?
  end

  test "unknown item returns 404" do
    sign_in users(:board_owner)

    patch api_item_path(id: 0), params: { status: "done" }, as: :json

    assert_response :not_found
  end
end
