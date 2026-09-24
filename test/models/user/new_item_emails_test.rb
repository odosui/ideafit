require "test_helper"

class User::NewItemEmailsTest < ActiveSupport::TestCase
  include ActionMailer::TestHelper

  setup do
    @admin = users(:board_owner)
    @admin.update!(new_item_emails: :daily)
  end

  test "new item emails are instant by default" do
    assert User.create!(email: "new@example.com").new_item_emails_instant?
  end

  test "items posted by others on the admin's boards" do
    own = boards(:roadmap).items.create!(user: @admin, kind: "idea", title: "Own")
    elsewhere = boards(:side_project).items.create!(user: users(:stranger), kind: "idea", title: "Elsewhere")

    items = @admin.items_posted_by_others(between: 1.day.ago..)

    assert_not_includes items, own
    assert_not_includes items, elsewhere
    assert_includes items, items(:dark_mode)
  end

  test "the digest covers items since the last one" do
    @admin.update!(new_items_digested_at: 1.hour.ago)
    Item.update_all(created_at: 2.hours.ago)

    assert_no_enqueued_emails { @admin.send_new_items_digest }

    boards(:roadmap).items.create!(user: users(:stranger), kind: "idea", title: "Fresh")
    assert_enqueued_emails(1) { @admin.send_new_items_digest }
    assert_in_delta Time.current, @admin.reload.new_items_digested_at, 1.second
  end

  test "stopping new item emails" do
    @admin.stop_new_item_emails!

    assert @admin.reload.new_item_emails_off?
  end
end
