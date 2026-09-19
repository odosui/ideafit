require "test_helper"

class Api::ItemsDestroyTest < ActionDispatch::IntegrationTest

  setup { @item = items(:dark_mode) }

  test "author can delete their item" do
    sign_in users(:author)

    assert_difference -> { Item.count }, -1 do
      delete api_item_path(@item), as: :json
    end
    assert_response :success
  end

  test "board owner can delete any item on their board" do
    sign_in users(:board_owner)

    assert_difference -> { Item.count }, -1 do
      delete api_item_path(@item), as: :json
    end
    assert_response :success
  end

  test "stranger cannot delete the item" do
    sign_in users(:stranger)

    assert_no_difference -> { Item.count } do
      delete api_item_path(@item), as: :json
    end
    assert_response :forbidden
  end

  test "signed-out visitor cannot delete the item" do
    assert_no_difference -> { Item.count } do
      delete api_item_path(@item), as: :json
    end
    assert_response :unauthorized
  end

  test "unknown item returns 404" do
    sign_in users(:author)

    delete api_item_path(id: 0), as: :json
    assert_response :not_found
  end
end
