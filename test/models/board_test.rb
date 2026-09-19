require "test_helper"

class BoardTest < ActiveSupport::TestCase
  test "generates a pid" do
    board = Board.create!(user: users(:author), name: "New")

    assert_match(/\A\h{16}\z/, board.pid)
  end

  test "requires a name" do
    assert_not Board.new(user: users(:author)).valid?
  end

  test "owned by its user only" do
    board = boards(:roadmap)

    assert board.owned_by?(users(:board_owner))
    assert_not board.owned_by?(users(:author))
    assert_not board.owned_by?(nil)
  end
end
