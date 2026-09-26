require "test_helper"

class Board::Analytics::WeeklyActivityTest < ActiveSupport::TestCase
  setup do
    travel_to Time.zone.local(2026, 9, 24, 12)
    @board = boards(:roadmap)
    @board.items.update_all(created_at: Time.current)
    @board.votes.update_all(created_at: Time.current)
    items(:dark_mode).update_columns(created_at: 1.week.ago)
    items(:export_csv).update_columns(created_at: 1.year.ago)
    votes(:author_likes_dark_mode).update_columns(created_at: 1.week.ago)
  end

  def weeks
    Board::Analytics::WeeklyActivity.new(@board, weeks: 3).to_a
  end

  test "returns one entry per week, oldest first, starting on Monday" do
    assert_equal %w[2026-09-07 2026-09-14 2026-09-21], weeks.map { |week| week[:week] }
  end

  test "counts new items and votes per week" do
    assert_equal({ week: "2026-09-14", items: 1, votes: 1 }, weeks[1])
    assert_equal({ week: "2026-09-21", items: 2, votes: 2 }, weeks[2])
  end

  test "ignores activity older than the window" do
    assert_equal 3, weeks.sum { |week| week[:items] }
  end
end
