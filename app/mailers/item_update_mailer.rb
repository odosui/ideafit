class ItemUpdateMailer < ApplicationMailer
  include SubscriberMail

  # One email per follower, however many of their items changed.
  def statuses_changed(subscriptions)
    @subscriptions = subscriptions
    @board = subscriptions.first.item.board
    mail_to_subscriber(subscriptions.first.user, subject: statuses_changed_subject)
  end

  private

  def statuses_changed_subject
    return t(".digest_subject", count: @subscriptions.size, board: @board.name) unless @subscriptions.one?

    item = @subscriptions.first.item
    t(".subject.#{item.notified_status}", title: item.title)
  end
end
