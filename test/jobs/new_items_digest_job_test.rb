require "test_helper"

class NewItemsDigestJobTest < ActiveJob::TestCase
  include ActionMailer::TestHelper

  test "sends digests only to admins who chose them" do
    users(:board_owner).update!(new_item_emails: :daily)
    users(:stranger).update!(new_item_emails: :daily)

    assert_enqueued_emails(1) { NewItemsDigestJob.perform_now }
  end

  test "skips admins who turned emails off" do
    users(:board_owner).update!(new_item_emails: :daily, email_updates: false)

    assert_no_enqueued_emails { NewItemsDigestJob.perform_now }
  end
end
