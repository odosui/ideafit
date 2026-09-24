class AdminMailer < ApplicationMailer
  include AdminMail

  def new_item(admin, item)
    @item = item
    mail_to_admin(admin, subject: t(".subject.#{item.kind}", board: item.board.name, title: item.title))
  end

  def new_items_digest(admin, since:, till:)
    @items = admin.items_posted_by_others(between: since...till).includes(:board, :user).order(:created_at)
    return if @items.empty?

    mail_to_admin(admin, subject: t(".subject", count: @items.size))
  end
end
