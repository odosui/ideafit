class BoardTransfer::Export
  def initialize(board)
    @board = board
  end

  def as_json(*)
    {
      format: BoardTransfer::FORMAT,
      version: BoardTransfer::VERSION,
      exported_at: Time.current,
      board: { name: @board.name, description: @board.description },
      users: users.map { |user| BoardTransfer::Export::UserEntry.new(user).to_h },
      items: items.map { |item| BoardTransfer::Export::ItemEntry.new(item).to_h },
    }.as_json
  end

  def filename
    "#{@board.name.parameterize}-#{Date.current}.json"
  end

  private

  def items
    @items ||= @board.items.includes(:user, votes: :user).order(:created_at, :id).to_a
  end

  def users
    items.flat_map { |item| [item.user, *item.votes.map(&:user)] }.uniq
  end
end
