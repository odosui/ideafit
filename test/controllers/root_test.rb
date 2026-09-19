require "test_helper"

class RootTest < ActionDispatch::IntegrationTest
  test "signed-out visitor is sent to sign-in" do
    get root_path

    assert_redirected_to new_user_session_path
  end

  test "signed-in user sees the dashboard" do
    sign_in users(:author)

    get root_path

    assert_response :success
  end
end
