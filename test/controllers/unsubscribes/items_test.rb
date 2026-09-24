require "test_helper"

class Unsubscribes::ItemsTest < ActionDispatch::IntegrationTest
  setup do
    @item = items(:dark_mode)
    @item.upvote!(users(:stranger))
    @token = @item.subscriptions.find_by(user: users(:stranger)).generate_token_for(:unsubscribe)
  end

  test "asks before unsubscribing, signed out" do
    get unsubscribe_item_path(@token)

    assert_response :success
    assert_select "h1", "Stop emails about this item?"
    assert @item.subscribed?(users(:stranger))
  end

  test "unsubscribes from the item" do
    post unsubscribe_item_path(@token)

    assert_response :success
    assert_select "h1", "You're unsubscribed"
    assert_not @item.subscribed?(users(:stranger))
    assert users(:stranger).reload.email_updates
  end

  test "accepts a one-click POST from a mail provider" do
    post unsubscribe_item_path(@token), params: { "List-Unsubscribe" => "One-Click" }

    assert_response :success
    assert_not @item.subscribed?(users(:stranger))
  end

  test "an invalid token shows an error" do
    post unsubscribe_item_path("nope")

    assert_response :not_found
    assert_select "h1", "This link doesn't work"
  end
end
