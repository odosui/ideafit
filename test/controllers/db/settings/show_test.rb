require "test_helper"

class Db::SettingsShowTest < ActionDispatch::IntegrationTest
  test "a signed-in user sees the settings" do
    sign_in users(:author)

    get db_settings_path

    assert_response :success
  end

  test "signed-out visitor is sent to sign-in" do
    get db_settings_path

    assert_redirected_to new_user_session_path
  end
end
