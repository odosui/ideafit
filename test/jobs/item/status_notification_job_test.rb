require "test_helper"

class Item::StatusNotificationJobTest < ActiveJob::TestCase
  include ActionMailer::TestHelper

  test "emails followers about the change" do
    item = items(:export_csv)
    item.upvote!(users(:stranger))
    item.change_status!("done", by: users(:board_owner))

    Item::StatusNotificationJob.perform_now(item.status_changes.last)

    assert_enqueued_emails 1
  end

  test "is dropped when the item is gone" do
    item = items(:export_csv)
    item.change_status!("done", by: users(:board_owner))

    item.destroy!

    assert_nothing_raised { perform_enqueued_jobs }
  end
end
