require "test_helper"

class Db::BoardsShowTest < ActionDispatch::IntegrationTest
  test "the owner sees the board settings" do
    sign_in users(:board_owner)

    get db_board_path(boards(:roadmap).pid)

    assert_response :success
  end

  test "someone else gets 404" do
    sign_in users(:author)

    get db_board_path(boards(:roadmap).pid)

    assert_response :not_found
  end

  test "signed-out visitor is sent to sign-in" do
    get db_board_path(boards(:roadmap).pid)

    assert_redirected_to new_user_session_path
  end
end
