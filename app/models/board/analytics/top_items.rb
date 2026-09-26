class Board::Analytics::TopItems
  LIMIT = 5

  def initialize(board, limit: LIMIT)
    @board = board
    @limit = limit
  end

  def to_a
    @board.items.not_rejected.where(votes_count: 1..).most_voted_first.limit(@limit).map do |item|
      { id: item.id, title: item.title, status: item.status, votes: item.votes_count }
    end
  end
end
