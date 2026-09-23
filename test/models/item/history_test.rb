require "test_helper"

class Item::HistoryTest < ActiveSupport::TestCase
  setup { @item = items(:dark_mode) }

  test "merges edits and status changes, newest first" do
    @item.edit!(title: "Night mode", text: nil, by: users(:author))
    travel 1.minute
    @item.change_status!("planned", by: users(:board_owner))

    events = Item::History.new(@item).events

    assert_equal [Item::StatusChange, Item::Edit], events.map(&:class)
  end

  test "is empty for an untouched item" do
    assert_empty Item::History.new(@item).events
  end
end
