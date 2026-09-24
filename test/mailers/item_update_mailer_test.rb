require "test_helper"

class ItemUpdateMailerTest < ActionMailer::TestCase
  setup do
    items(:dark_mode).upvote!(users(:stranger))
    subscription = items(:dark_mode).subscriptions.find_by(user: users(:stranger))
    @mail = ItemUpdateMailer.status_changed(subscription, "done")
  end

  test "tells the follower what happened" do
    assert_equal ["stranger@example.com"], @mail.to
    assert_equal "“Dark mode” has shipped", @mail.subject
    assert_includes @mail.text_part.body.decoded, "It's done and available now."
  end

  test "links to the item's board and to unsubscribing" do
    body = @mail.text_part.body.decoded

    assert_includes body, "/b/roadmap0pid/ideas"
    assert_includes body, "/unsubscribe/item/"
    assert @mail["List-Unsubscribe"]
  end
end
