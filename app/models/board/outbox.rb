# Status changes a board's followers haven't heard about yet.
# Nothing goes out until an admin sends them; each follower gets one email.
class Board::Outbox
  class Stale < StandardError; end

  def initialize(board)
    @board = board
  end

  def changes
    @changes ||= @board.items.awaiting_status_notification.order(:updated_at).map { Change.new(it) }
  end

  def letters
    changes.flat_map(&:subscriptions).group_by(&:user_id).values
  end

  # Identifies exactly what the admin reviewed, so a stale review sends nothing.
  def fingerprint
    Digest::SHA256.hexdigest(changes.map(&:signature).join("|"))
  end

  def deliver!(reviewed:)
    sealed = Item.transaction { seal!(reviewed) }
    sealed.each { ItemUpdateMailer.statuses_changed(it).deliver_later }
    sealed.size
  end

  # Followers never hear about this status; they will about the next one.
  def drop!(item_id, reviewed_status:)
    item = @board.items.awaiting_status_notification.find_by(id: item_id, status: reviewed_status)
    raise Stale, "This change is no longer in the outbox. Please review it again." unless item

    item.mark_status_notified!
  end

  private

  def seal!(reviewed)
    raise Stale, "The outbox changed since you reviewed it. Please review it again." unless reviewed == fingerprint

    letters.tap { changes.each { it.item.mark_status_notified! } }
  end
end
