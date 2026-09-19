require "test_helper"

class RootTest < ActionDispatch::IntegrationTest
  test "signed-out visitor is sent to sign-in" do
    get root_path

    assert_redirected_to new_user_session_path
  end

  test "an admin sees the dashboard" do
    sign_in users(:board_owner)

    get root_path

    assert_response :success
  end

  test "a participant is sent to their home" do
    sign_in users(:author)

    get root_path

    assert_redirected_to participant_home_path
  end
end
