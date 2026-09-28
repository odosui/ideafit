class Board::Outbox::Change
  attr_reader :item

  delegate :status, to: :item

  def initialize(item)
    @item = item
  end

  def subscriptions
    @subscriptions ||= item.status_notification_subscriptions.to_a
  end

  def recipients
    subscriptions.map(&:user)
  end

  def signature
    [item.id, status, *subscriptions.map(&:user_id).sort].join(":")
  end
end
