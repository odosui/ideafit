require "test_helper"

class Item::StatusNotificationsTest < ActiveSupport::TestCase
  include ActionMailer::TestHelper
  include ActiveJob::TestHelper

  setup do
    @item = items(:export_csv)
    @admin = users(:board_owner)
    @item.upvote!(users(:stranger))
    @item.upvote!(users(:author))
  end

  test "changing the status schedules a notification after the settle time" do
    freeze_time do
      assert_enqueued_with(job: Item::StatusNotificationJob, at: 10.minutes.from_now) do
        @item.change_status!("planned", by: @admin)
      end
    end
  end

  test "emails every subscriber" do
    change_and_notify("planned")

    assert_enqueued_emails 2
  end

  test "skips the admin who made the change" do
    @item.upvote!(@admin)

    change_and_notify("planned")

    assert_enqueued_emails 2
  end

  test "skips unsubscribed followers and users who turned emails off" do
    @item.unsubscribe!(users(:stranger))
    users(:author).stop_email_updates!

    change_and_notify("planned")

    assert_enqueued_emails 0
  end

  test "only the latest change in a burst is sent" do
    @item.change_status!("planned", by: @admin)
    first = @item.status_changes.last
    @item.change_status!("done", by: @admin)

    @item.notify_status_change(first)
    assert_enqueued_emails 0

    @item.notify_status_change(@item.status_changes.last)
    assert_enqueued_emails 2
  end

  test "ready to ship sends nothing, followers hear once it ships" do
    change_and_notify("ready", from: "in_progress")

    assert_enqueued_emails 0
  end

  test "moving back to new sends nothing" do
    change_and_notify("fresh", from: "planned")

    assert_enqueued_emails 0
  end

  test "the same status is not sent twice" do
    change_and_notify("planned")
    change_and_notify("fresh")
    change_and_notify("planned")

    assert_enqueued_emails 2
  end

  private

  def change_and_notify(status, from: nil)
    @item.update!(status: from) if from
    @item.change_status!(status, by: @admin)
    @item.notify_status_change(@item.status_changes.last)
  end
end
