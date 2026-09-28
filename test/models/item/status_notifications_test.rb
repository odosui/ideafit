require "test_helper"

class Item::StatusNotificationsTest < ActiveSupport::TestCase
  include ActionMailer::TestHelper

  setup do
    @item = items(:export_csv)
    @admin = users(:board_owner)
    @item.upvote!(users(:stranger))
    @item.upvote!(users(:author))
  end

  test "changing the status emails no one by itself" do
    @item.change_status!("planned", by: @admin)

    assert_no_enqueued_emails
  end

  test "a changed status awaits notification" do
    @item.change_status!("planned", by: @admin)

    assert_includes Item.awaiting_status_notification, @item
  end

  test "new and ready to ship stay quiet" do
    @item.change_status!("ready", by: @admin)
    refute_includes Item.awaiting_status_notification, @item

    @item.change_status!("fresh", by: @admin)
    refute_includes Item.awaiting_status_notification, @item
  end

  test "the same status is not announced twice" do
    @item.change_status!("planned", by: @admin)
    @item.mark_status_notified!
    @item.change_status!("fresh", by: @admin)
    @item.change_status!("planned", by: @admin)

    refute_includes Item.awaiting_status_notification, @item
  end

  test "followers are emailed, but not the admin who made the change" do
    @item.upvote!(@admin)
    @item.change_status!("planned", by: @admin)

    assert_equal [users(:author), users(:stranger)].sort_by(&:id),
      @item.status_notification_subscriptions.map(&:user).sort_by(&:id)
  end

  test "skips unsubscribed followers and users who turned emails off" do
    @item.unsubscribe!(users(:stranger))
    users(:author).stop_email_updates!
    @item.change_status!("planned", by: @admin)

    assert_empty @item.status_notification_subscriptions
  end
end
