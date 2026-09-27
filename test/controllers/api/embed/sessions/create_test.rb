require "test_helper"

class Api::Embed::SessionsCreateTest < ActionDispatch::IntegrationTest
  setup do
    Rails.cache.clear
    workspaces(:main).regenerate_embed_secret!
  end

  def secret
    workspaces(:main).embed_secret
  end

  def exchange(token, board_pid: "roadmap0pid")
    post api_embed_sessions_path, params: { board_pid:, token: }, as: :json
  end

  test "trades the site's JWT for an Ideafit token for that user" do
    exchange identity_jwt(secret, name: "Ada", email: "ada@example.com", avatar: "https://cdn.example.com/ada.png")

    assert_response :success
    user = User.find_by_embed_session(json["token"])
    assert_equal ["site-42", "Ada", "ada@example.com", "https://cdn.example.com/ada.png"],
      [user.external_id, user.name, user.email, user.avatar_url]
    assert_equal workspaces(:main), user.embed_workspace
    assert_equal({ "name" => "Ada", "admin" => false, "embedded" => true }, json["user"].slice("name", "admin", "embedded"))
  end

  test "signs the same site user in again and refreshes their profile" do
    user = embed_user(name: "Old name")

    assert_no_difference -> { User.count } do
      exchange identity_jwt(secret, name: "New name")
    end
    assert_equal "New name", user.reload.name
  end

  test "never matches an account by email" do
    exchange identity_jwt(secret, email: users(:board_owner).email)

    user = User.find_by_embed_session(json["token"])
    assert_not_equal users(:board_owner), user
    assert_not user.admin?
  end

  test "the board's workspace picks the secret" do
    workspaces(:elsewhere).regenerate_embed_secret!

    exchange identity_jwt(workspaces(:elsewhere).embed_secret)

    assert_response :unauthorized
  end

  test "rejects a token without a user id" do
    exchange identity_jwt(secret, id: "")

    assert_response :unauthorized
  end

  test "rejects a bad signature" do
    exchange identity_jwt("guess")

    assert_response :unauthorized
    assert_equal false, json["success"]
  end

  test "unknown board returns 404" do
    exchange identity_jwt(secret), board_pid: "nope"

    assert_response :not_found
  end

  test "is rate limited" do
    31.times { exchange identity_jwt("guess") }

    assert_response :too_many_requests
  end
end
