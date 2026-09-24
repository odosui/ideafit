require "test_helper"

class Item::NewItemNotificationJobTest < ActiveJob::TestCase
  include ActionMailer::TestHelper

  test "emails each admin about the item" do
    assert_enqueued_emails(1) { Item::NewItemNotificationJob.perform_now(items(:dark_mode)) }
  end

  test "is dropped when the item is gone" do
    Item::NewItemNotificationJob.perform_later(items(:export_csv))
    items(:export_csv).destroy!

    assert_nothing_raised { perform_enqueued_jobs }
  end
end
