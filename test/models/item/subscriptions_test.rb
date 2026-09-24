require "test_helper"

class Item::SubscriptionsTest < ActiveSupport::TestCase
  setup do
    @item = items(:export_csv)
    @user = users(:stranger)
  end

  test "auto-subscribing adds the user to the subscribers" do
    @item.auto_subscribe!(@user, source: :voted)

    assert @item.subscribed?(@user)
    assert_includes @item.subscribers, @user
  end

  test "auto-subscribing keeps the original source" do
    @item.auto_subscribe!(@user, source: :created)
    @item.auto_subscribe!(@user, source: :voted)

    assert @item.subscriptions.find_by(user: @user).source_created?
  end

  test "an unsubscribe sticks through auto-subscribing" do
    @item.auto_subscribe!(@user, source: :voted)
    @item.unsubscribe!(@user)
    @item.auto_subscribe!(@user, source: :voted)

    assert_not @item.subscribed?(@user)
    assert_empty @item.subscribers
  end

  test "unsubscribing without a subscription opts out ahead" do
    @item.unsubscribe!(@user)
    @item.auto_subscribe!(@user, source: :voted)

    assert_not @item.subscribed?(@user)
  end

  test "following again after unsubscribing resubscribes" do
    @item.unsubscribe!(@user)
    @item.subscribe!(@user)

    assert @item.subscribed?(@user)
  end

  test "forgetting a vote drops only a vote-sourced subscription" do
    @item.auto_subscribe!(@user, source: :voted)
    @item.auto_subscribe!(users(:author), source: :created)

    @item.forget_vote_subscription!(@user)
    @item.forget_vote_subscription!(users(:author))

    assert_not @item.subscribed?(@user)
    assert @item.subscribed?(users(:author))
  end

  test "forgetting a vote keeps an explicit unsubscribe" do
    @item.auto_subscribe!(@user, source: :voted)
    @item.unsubscribe!(@user)

    @item.forget_vote_subscription!(@user)
    @item.auto_subscribe!(@user, source: :voted)

    assert_not @item.subscribed?(@user)
  end

  test "nobody is subscribed when signed out" do
    assert_not @item.subscribed?(nil)
  end

  test "is deleted along with the item" do
    @item.subscribe!(@user)

    assert_difference("Item::Subscription.count", -1) { @item.destroy! }
  end
end
