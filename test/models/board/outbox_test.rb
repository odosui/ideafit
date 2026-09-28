require "test_helper"

class Board::OutboxTest < ActiveSupport::TestCase
  include ActionMailer::TestHelper

  setup do
    @admin = users(:board_owner)
    @outbox = Board::Outbox.new(boards(:roadmap))
    [items(:export_csv), items(:dark_mode)].each do |item|
      item.subscribe!(users(:stranger))
      item.subscribe!(users(:author))
    end
    items(:export_csv).change_status!("planned", by: @admin)
    items(:dark_mode).change_status!("done", by: @admin)
  end

  test "lists the unsent changes with who will hear about each" do
    recipients = @outbox.changes.to_h { [it.item.title, it.recipients.map(&:email).sort] }

    assert_equal(
      {
        "Export to CSV" => ["author@example.com", "stranger@example.com"],
        "Dark mode" => ["author@example.com", "stranger@example.com"],
      },
      recipients,
    )
  end

  test "writes one letter per follower, whatever the number of changes" do
    assert_equal 2, @outbox.letters.size
    assert @outbox.letters.all? { it.size == 2 }
  end

  test "sending emails each follower once and empties the outbox" do
    assert_enqueued_emails 2 do
      assert_equal 2, @outbox.deliver!(reviewed: @outbox.fingerprint)
    end

    assert_empty Board::Outbox.new(boards(:roadmap)).changes
    assert_equal "done", items(:dark_mode).reload.notified_status
  end

  test "a change after the review stops the send" do
    reviewed = @outbox.fingerprint
    items(:crash_on_login).change_status!("rejected", by: @admin)

    assert_raises(Board::Outbox::Stale) do
      Board::Outbox.new(boards(:roadmap)).deliver!(reviewed:)
    end
    assert_no_enqueued_emails
    assert_nil items(:dark_mode).reload.notified_status
  end

  test "changes nobody follows are cleared without email" do
    items(:dark_mode).unsubscribe!(users(:stranger))
    items(:dark_mode).unsubscribe!(users(:author))
    items(:export_csv).unsubscribe!(users(:stranger))
    items(:export_csv).unsubscribe!(users(:author))

    assert_no_enqueued_emails do
      assert_equal 0, @outbox.deliver!(reviewed: @outbox.fingerprint)
    end
    assert_empty Board::Outbox.new(boards(:roadmap)).changes
  end

  test "a dropped change is never sent" do
    @outbox.drop!(items(:dark_mode).id, reviewed_status: "done")

    outbox = Board::Outbox.new(boards(:roadmap))
    assert_equal ["Export to CSV"], outbox.changes.map { it.item.title }
    assert outbox.letters.all? { it.size == 1 }
  end

  test "dropping keeps a newer status than the one reviewed" do
    items(:dark_mode).change_status!("rejected", by: @admin)

    assert_raises(Board::Outbox::Stale) do
      @outbox.drop!(items(:dark_mode).id, reviewed_status: "done")
    end
    assert_nil items(:dark_mode).reload.notified_status
  end

  test "the next status after a dropped one goes out as usual" do
    @outbox.drop!(items(:dark_mode).id, reviewed_status: "done")
    items(:dark_mode).change_status!("rejected", by: @admin)

    assert_includes Board::Outbox.new(boards(:roadmap)).changes.map(&:item), items(:dark_mode)
  end
end
