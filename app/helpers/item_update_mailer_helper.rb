module ItemUpdateMailerHelper
  def status_badge_style(status)
    colors = MailColors::STATUS_BADGES.fetch(status)
    "display:inline-block;padding:2px 10px;border-radius:999px;font-size:12px;font-weight:600;" \
      "background-color:#{colors[:background]};color:#{colors[:text]};"
  end

  def board_accent(board)
    MailColors::BOARD_ACCENTS.fetch(board.color_scheme, MailColors::BOARD_ACCENTS["teal"])
  end

  def item_on_board_url(item)
    public_board_url(item.board.pid, view: item.kind.pluralize)
  end

  def unsubscribe_from_item_url(subscription)
    unsubscribe_item_url(subscription.generate_token_for(:unsubscribe))
  end
end
