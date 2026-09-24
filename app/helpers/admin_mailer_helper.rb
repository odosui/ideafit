module AdminMailerHelper
  def dashboard_item_url(item)
    db_board_item_url(item.board.pid, item)
  end
end
