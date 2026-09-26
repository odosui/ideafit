# New items and votes per week, oldest week first.
class Board::Analytics::WeeklyActivity
  WEEKS = 12

  def initialize(board, weeks: WEEKS)
    @board = board
    @weeks = weeks
  end

  def to_a
    items = per_week(@board.items)
    votes = per_week(@board.votes)

    week_starts.map do |week|
      { week: week.to_date.iso8601, items: items[week] || 0, votes: votes[week] || 0 }
    end
  end

  private

  def week_starts
    first = (@weeks - 1).weeks.ago.beginning_of_week
    Array.new(@weeks) { |index| first + index.weeks }
  end

  def per_week(records)
    records
      .where(created_at: week_starts.first..)
      .pluck(:created_at)
      .map(&:beginning_of_week)
      .tally
  end
end
