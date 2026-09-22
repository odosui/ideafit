require "test_helper"

class BoardTest < ActiveSupport::TestCase
  test "generates a pid" do
    board = Board.create!(workspace: workspaces(:main), user: users(:author), name: "New")

    assert_match(/\A\h{16}\z/, board.pid)
  end

  test "requires a name" do
    assert_not Board.new(user: users(:author)).valid?
  end
end
