require "test_helper"

class Board::AnalyticsTest < ActiveSupport::TestCase
  setup { @analytics = Board::Analytics.new(boards(:roadmap)).as_json }

  test "totals count items, votes, distinct participants and shipped items" do
    assert_equal({ items: 4, votes: 3, participants: 3, shipped: 1 }, @analytics[:totals])
  end

  test "breaks items down by status and kind" do
    assert_equal({ "fresh" => 2, "done" => 1, "rejected" => 1 }, @analytics[:by_status])
    assert_equal({ "idea" => 3, "bug" => 1 }, @analytics[:by_kind])
  end

  test "top items are voted, not rejected, most voted first" do
    assert_equal ["Dark mode", "Crash on login"], @analytics[:top_items].map { |item| item[:title] }
    assert_equal %i[id title status votes], @analytics[:top_items].first.keys
  end

  test "exposes nothing about individual people" do
    assert_no_match(/@example\.com/, @analytics.to_json)
  end
end
