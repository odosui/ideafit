require "test_helper"

class Api::BoardsDestroyTest < ActionDispatch::IntegrationTest
  test "the owner deletes the board with its items and votes" do
    board = boards(:roadmap)
    item = items(:dark_mode)
    vote = votes(:author_likes_dark_mode)
    sign_in users(:board_owner)

    delete api_board_path(board.pid), as: :json

    assert_response :success
    assert_not Board.exists?(board.id)
    assert_not Item.exists?(item.id)
    assert_not Vote.exists?(vote.id)
  end

  test "someone else cannot delete the board" do
    sign_in users(:author)

    delete api_board_path(boards(:roadmap).pid), as: :json

    assert_response :forbidden
    assert Board.exists?(boards(:roadmap).id)
  end

  test "signed-out visitor cannot delete the board" do
    delete api_board_path(boards(:roadmap).pid), as: :json

    assert_response :unauthorized
    assert Board.exists?(boards(:roadmap).id)
  end
end
