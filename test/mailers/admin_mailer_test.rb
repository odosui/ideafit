require "test_helper"

class AdminMailerTest < ActionMailer::TestCase
  setup { @admin = users(:board_owner) }

  test "a new item links to the dashboard" do
    mail = AdminMailer.new_item(@admin, items(:crash_on_login))

    assert_equal ["owner@example.com"], mail.to
    assert_equal "New bug on Roadmap: “Crash on login”", mail.subject
    assert_includes mail.text_part.body.decoded, "/db/boards/roadmap0pid/items/#{items(:crash_on_login).id}"
  end

  test "has a one-click way to stop new item emails" do
    mail = AdminMailer.new_item(@admin, items(:crash_on_login))
    token = mail["List-Unsubscribe"].value[%r{/unsubscribe/new_items/([^>]+)>}, 1]

    assert_equal @admin, User.find_by_token_for(:stop_new_item_emails, token)
    assert_includes mail.text_part.body.decoded, "/db/settings"
  end

  test "the digest lists items posted by others" do
    mail = AdminMailer.new_items_digest(@admin, since: 1.day.ago, till: Time.current)
    body = mail.text_part.body.decoded

    assert_equal "4 new items on your boards", mail.subject
    assert_includes body, "Crash on login (bug on Roadmap by stranger@example.com)"
  end

  test "no digest when nothing is new" do
    mail = AdminMailer.new_items_digest(@admin, since: 1.minute.from_now, till: 2.minutes.from_now)

    assert_nil mail.message.to
  end
end
