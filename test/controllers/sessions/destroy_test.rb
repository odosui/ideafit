require "test_helper"

class SessionsDestroyTest < ActionDispatch::IntegrationTest
  test "signs out and returns to the given page" do
    sign_in users(:author)

    get destroy_user_session_path(return_to: "/b/roadmap0pid")

    assert_redirected_to "/b/roadmap0pid"
    get root_path
    assert_redirected_to new_user_session_path
  end
end
