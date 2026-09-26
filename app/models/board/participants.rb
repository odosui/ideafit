# People who posted or voted on a board, with what they did there.
class Board::Participants
  def initialize(board, query: nil, sort: nil)
    @activity = Activity.new(board)
    @query = query
    @sort = sort
  end

  def to_a
    users = User.where(id: @activity.user_ids).matching(@query)
    Sorting.sort(users.map { |user| @activity.participant_for(user) }, @sort)
  end
end
