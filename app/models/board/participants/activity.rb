class Board::Participants::Activity
  def initialize(board)
    @items = board.items
    @votes = Vote.where(item: board.items)
  end

  def user_ids
    items_count.keys | votes_count.keys
  end

  def participant_for(user)
    Board::Participant.new(
      user:,
      items_count: items_count.fetch(user.id, 0),
      votes_count: votes_count.fetch(user.id, 0),
      last_active_at: [last_item_at[user.id], last_vote_at[user.id]].compact.max,
    )
  end

  private

  def items_count
    @items_count ||= @items.group(:user_id).count
  end

  def votes_count
    @votes_count ||= @votes.group(:user_id).count
  end

  def last_item_at
    @last_item_at ||= @items.group(:user_id).maximum(:created_at)
  end

  def last_vote_at
    @last_vote_at ||= @votes.group(:user_id).maximum(:created_at)
  end
end
