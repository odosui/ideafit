require "test_helper"

class Item::PostingTest < ActiveSupport::TestCase
  include ActiveJob::TestHelper

  def post_item(by: users(:stranger))
    boards(:roadmap).items.post!(by:, kind: "idea", title: "Keyboard shortcuts")
  end

  test "the author votes for and follows the item" do
    item = post_item

    assert item.voted_by?(users(:stranger))
    assert item.subscriptions.find_by(user: users(:stranger)).source_created?
  end

  test "schedules telling the admins" do
    assert_enqueued_with(job: Item::NewItemNotificationJob) { post_item }
  end

  test "emails workspace admins who want instant emails" do
    assert_equal [users(:board_owner)], post_item.admins_to_email.to_a
  end

  test "skips admins who chose a digest, turned emails off, or posted it themselves" do
    users(:board_owner).update!(new_item_emails: :daily)
    assert_empty post_item.admins_to_email

    users(:board_owner).update!(new_item_emails: :instant, email_updates: false)
    assert_empty post_item.admins_to_email

    users(:board_owner).update!(email_updates: true)
    assert_empty post_item(by: users(:board_owner)).admins_to_email
  end

  test "an invalid item is not posted or announced" do
    assert_raises(ActiveRecord::RecordInvalid) do
      boards(:roadmap).items.post!(by: users(:stranger), kind: "idea", title: "")
    end
    assert_no_enqueued_jobs only: Item::NewItemNotificationJob
  end
end
