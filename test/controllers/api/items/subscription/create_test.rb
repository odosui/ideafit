require "test_helper"

class Api::Items::SubscriptionCreateTest < ActionDispatch::IntegrationTest
  setup { @item = items(:export_csv) }

  test "follows the item" do
    sign_in users(:stranger)

    post api_item_subscription_path(@item), as: :json

    assert_response :success
    assert json["subscribed"]
    assert @item.subscribed?(users(:stranger))
  end

  test "unknown item returns 404" do
    sign_in users(:stranger)

    post api_item_subscription_path(item_id: 0), as: :json
    assert_response :not_found
  end

  test "signed-out visitor cannot follow" do
    post api_item_subscription_path(@item), as: :json

    assert_response :unauthorized
  end
end
