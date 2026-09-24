class ItemUpdateMailer < ApplicationMailer
  include SubscriberMail

  def status_changed(subscription, status)
    @item = subscription.item
    @status = status
    @item_url = public_board_url(@item.board.pid, kind: @item.kind.pluralize)
    mail_to_subscriber(subscription, subject: t(".subject.#{status}", title: @item.title))
  end
end
