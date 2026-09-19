class BoardSerializer
  def initialize(board)
    @board = board
  end

  def as_json(*)
    {
      id: @board.id,
      pid: @board.pid,
      name: @board.name,
      description: @board.description,
      color_scheme: @board.color_scheme,
      items_count: @board.attributes['items_count'] || @board.items.size,
      created_at: @board.created_at.iso8601,
    }
  end
end
