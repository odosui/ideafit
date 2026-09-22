require "test_helper"

class Item::StatusHistoryTest < ActiveSupport::TestCase
  setup { @item = items(:dark_mode) }

  test "records who changed the status, when and to what" do
    freeze_time do
      @item.change_status!("planned", by: users(:board_owner))

      change = @item.status_changes.last
      assert_equal users(:board_owner), change.user
      assert_equal "planned", change.status
      assert_equal Time.current, change.created_at
    end
  end

  test "keeps changes in chronological order" do
    @item.change_status!("planned", by: users(:board_owner))
    travel 1.minute
    @item.change_status!("done", by: users(:board_owner))

    assert_equal %w[planned done], @item.status_changes.map(&:status)
  end

  test "skips a change to the same status" do
    @item.change_status!("fresh", by: users(:board_owner))

    assert_empty @item.status_changes
  end

  test "records nothing when the status is invalid" do
    assert_raises(ActiveRecord::RecordInvalid) do
      @item.change_status!("shipped", by: users(:board_owner))
    end

    assert_empty @item.status_changes
    assert @item.reload.fresh?
  end

  test "is deleted along with the item" do
    @item.change_status!("planned", by: users(:board_owner))

    assert_difference("Item::StatusChange.count", -1) { @item.destroy! }
  end
end
