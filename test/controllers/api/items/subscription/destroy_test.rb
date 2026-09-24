require "test_helper"

class Api::Items::SubscriptionDestroyTest < ActionDispatch::IntegrationTest
  setup { @item = items(:export_csv) }

  test "unfollows the item" do
    sign_in users(:stranger)
    @item.upvote!(users(:stranger))

    delete api_item_subscription_path(@item), as: :json

    assert_response :success
    assert_not json["subscribed"]
    assert json["voted"]
  end

  test "signed-out visitor cannot unfollow" do
    delete api_item_subscription_path(@item), as: :json

    assert_response :unauthorized
  end
end
