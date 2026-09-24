require "test_helper"

class Item::VotingTest < ActiveSupport::TestCase
  setup do
    @item = items(:export_csv)
    @user = users(:stranger)
  end

  test "upvoting votes and subscribes" do
    @item.upvote!(@user)

    assert @item.voted_by?(@user)
    assert @item.subscribed?(@user)
  end

  test "downvoting removes the vote and the vote's subscription" do
    @item.upvote!(@user)
    @item.downvote!(@user)

    assert_not @item.voted_by?(@user)
    assert_not @item.subscribed?(@user)
  end

  test "downvoting keeps an explicit follow" do
    @item.upvote!(@user)
    @item.subscribe!(@user)
    @item.downvote!(@user)

    assert @item.subscribed?(@user)
  end

  test "the author stays subscribed after downvoting their own item" do
    @item.auto_subscribe!(users(:author), source: :created)
    @item.upvote!(users(:author))
    @item.downvote!(users(:author))

    assert @item.subscribed?(users(:author))
  end
end
