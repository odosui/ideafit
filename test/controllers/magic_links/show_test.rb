require "test_helper"

class MagicLinksShowTest < ActionDispatch::IntegrationTest
  setup { @user = users(:author) }

  def link_token
    @user.generate_token_for(:magic_link)
  end

  test "signs the user in and returns them where they were" do
    get magic_link_path(link_token, return_to: "/b/roadmap0pid")

    assert_redirected_to "/b/roadmap0pid"
    get root_path
    assert_response :success
  end

  test "goes to the dashboard without return_to" do
    get magic_link_path(link_token)

    assert_redirected_to root_path
  end

  test "ignores a return_to pointing to another site" do
    get magic_link_path(link_token, return_to: "//evil.example.com")

    assert_redirected_to root_path
  end

  test "works only once" do
    token = link_token
    get magic_link_path(token)
    delete_session_cookie

    get magic_link_path(token)

    assert_redirected_to new_user_session_path
    assert_equal "That sign-in link is invalid or has expired.", flash[:alert]
  end

  test "expires after 15 minutes" do
    token = link_token

    travel 16.minutes do
      get magic_link_path(token)
    end

    assert_redirected_to new_user_session_path
  end

  test "rejects a made-up token" do
    get magic_link_path("nope")

    assert_redirected_to new_user_session_path
  end

  private

  def delete_session_cookie
    cookies.delete("_ideafit_session")
    cookies.delete("remember_user_token")
  end
end
