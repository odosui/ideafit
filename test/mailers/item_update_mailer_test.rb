require "test_helper"

class ItemUpdateMailerTest < ActionMailer::TestCase
  setup do
    items(:dark_mode).upvote!(users(:stranger))
    items(:export_csv).upvote!(users(:stranger))
    items(:dark_mode).update!(status: "done", notified_status: "done")
    items(:export_csv).update!(status: "planned", notified_status: "planned")
  end

  test "a single change is named in the subject" do
    mail = ItemUpdateMailer.statuses_changed([subscription(:dark_mode)])

    assert_equal ["stranger@example.com"], mail.to
    assert_equal "“Dark mode” has shipped", mail.subject
    assert_includes mail.text_part.body.decoded, "It's done and available now."
  end

  test "several changes go in one email" do
    mail = ItemUpdateMailer.statuses_changed([subscription(:dark_mode), subscription(:export_csv)])
    body = mail.text_part.body.decoded

    assert_equal "2 updates on Roadmap", mail.subject
    assert_includes body, "Dark mode — Shipped"
    assert_includes body, "Export to CSV — Planned"
    assert_includes mail.html_part.body.decoded, "Good news: it&#39;s on the roadmap."
  end

  test "links to the board and to unsubscribing" do
    mail = ItemUpdateMailer.statuses_changed([subscription(:dark_mode), subscription(:export_csv)])
    body = mail.text_part.body.decoded

    assert_includes body, "/b/roadmap0pid/ideas"
    assert_equal 2, body.scan(%r{/unsubscribe/item/}).size
    assert_includes body, "/unsubscribe/all/"
    assert_match %r{/unsubscribe/all/}, mail["List-Unsubscribe"].value
  end

  test "a host site's user is sent to the page that embeds the board" do
    boards(:roadmap).update!(embed_page_url: "https://example.com/feedback")
    visitor = embed_user(email: "visitor@example.com")
    items(:dark_mode).upvote!(visitor)

    mail = ItemUpdateMailer.statuses_changed([items(:dark_mode).subscriptions.find_by(user: visitor)])
    body = mail.text_part.body.decoded

    assert_equal 2, body.scan("https://example.com/feedback").size
    assert_not_includes body, "/b/roadmap0pid"
  end

  test "a host site's user falls back to the board without an embed page" do
    visitor = embed_user(email: "visitor@example.com")
    items(:dark_mode).upvote!(visitor)

    mail = ItemUpdateMailer.statuses_changed([items(:dark_mode).subscriptions.find_by(user: visitor)])

    assert_includes mail.text_part.body.decoded, "/b/roadmap0pid/ideas"
  end

  test "accounts keep the board link when an embed page is set" do
    boards(:roadmap).update!(embed_page_url: "https://example.com/feedback")

    mail = ItemUpdateMailer.statuses_changed([subscription(:dark_mode)])

    assert_includes mail.text_part.body.decoded, "/b/roadmap0pid/ideas"
  end

  private

  def subscription(item)
    items(item).subscriptions.find_by(user: users(:stranger))
  end
end
