require "test_helper"

class ItemTest < ActiveSupport::TestCase
  test "rejects an unknown kind" do
    item = Item.new(board: boards(:roadmap), user: users(:author), title: "X", kind: "feature")

    assert_not item.valid?
    assert_includes item.errors[:kind], "is not included in the list"
  end

  test "of_kind returns every kind when kind is blank" do
    assert_equal Item.count, Item.of_kind(nil).count
    assert_equal [items(:crash_on_login)], Item.of_kind("bug").to_a
  end

  test "with_progress splits done from open" do
    assert_equal [items(:crash_on_login)], Item.with_progress("done").to_a
    assert_not_includes Item.with_progress("open"), items(:crash_on_login)
  end

  test "with_progress hides rejected items unless asked for them" do
    assert_equal [items(:spam)], Item.with_progress("rejected").to_a
    assert_not_includes Item.with_progress("open"), items(:spam)
    assert_not_includes Item.with_progress(nil), items(:spam)
    assert_equal Item.count - 1, Item.with_progress(nil).count
  end

  test "rejects an unknown status" do
    item = items(:dark_mode)
    item.status = "shipped"

    assert_not item.valid?
    assert_includes item.errors[:status], "is not included in the list"
  end

  test "most_voted_first orders by votes count" do
    assert_equal items(:dark_mode), Item.most_voted_first.first
  end

  test "deletable by the author and the board owner only" do
    item = items(:dark_mode)

    assert item.deletable_by?(users(:author))
    assert item.deletable_by?(users(:board_owner))
    assert_not item.deletable_by?(users(:stranger))
    assert_not item.deletable_by?(nil)
  end
end
