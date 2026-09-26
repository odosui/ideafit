class Board::Analytics::Totals
  def initialize(board)
    @board = board
  end

  def to_h
    {
      items: @board.items.count,
      votes: @board.votes.count,
      participants: participants_count,
      shipped: @board.items.done.count,
    }
  end

  private

  def participants_count
    (@board.items.distinct.pluck(:user_id) | @board.votes.distinct.pluck(:user_id)).size
  end
end
