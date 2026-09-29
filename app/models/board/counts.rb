# The numbers the admin sidebar shows next to a board's sections.
class Board::Counts
  def initialize(board)
    @board = board
  end

  def as_json(*)
    {
      new_items: @board.items.fresh.count,
      outbox: @board.items.awaiting_status_notification.count,
      participants: Board::Participants::Activity.new(@board).user_ids.size,
    }
  end
end
