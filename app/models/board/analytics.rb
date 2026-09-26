# Board statistics for admins, computed only from items and votes the
# board already stores. Aggregates only: no tracking, no per-person figures.
class Board::Analytics
  def initialize(board)
    @board = board
  end

  def as_json(*)
    {
      totals: Totals.new(@board).to_h,
      by_status: @board.items.group(:status).count,
      by_kind: @board.items.group(:kind).count,
      weekly: WeeklyActivity.new(@board).to_a,
      top_items: TopItems.new(@board).to_a,
    }
  end
end
