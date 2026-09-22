require "test_helper"

class Db::BoardsShowTest < ActionDispatch::IntegrationTest
  test "the owner sees the board settings" do
    sign_in users(:board_owner)

    get db_board_path(boards(:roadmap).pid)

    assert_response :success
  end

  test "the owner opens a board section" do
    sign_in users(:board_owner)

    get db_board_section_path(boards(:roadmap).pid, "settings")

    assert_response :success
  end

  test "another admin of the workspace sees it too" do
    workspaces(:main).add_member(users(:stranger))
    sign_in users(:stranger)

    get db_board_path(boards(:roadmap).pid)

    assert_response :success
  end

  test "an admin of another workspace gets 404" do
    workspaces(:elsewhere).add_member(users(:stranger))
    sign_in users(:stranger)

    get db_board_path(boards(:roadmap).pid)

    assert_response :not_found
  end

  test "a participant is sent to their home" do
    sign_in users(:author)

    get db_board_path(boards(:roadmap).pid)

    assert_redirected_to participant_home_path
  end

  test "signed-out visitor is sent to sign-in" do
    get db_board_path(boards(:roadmap).pid)

    assert_redirected_to new_user_session_path
  end
end
