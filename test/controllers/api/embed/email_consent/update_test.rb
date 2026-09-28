require "test_helper"

class Api::Embed::EmailConsentUpdateTest < ActionDispatch::IntegrationTest
  setup do
    workspaces(:main).update!(trust_embed_emails: true)
    @visitor = embed_user(email: "visitor@example.com")
  end

  test "a site's user says yes to emails" do
    patch api_embed_email_consent_path, params: { granted: true }, headers: embed_session_headers(@visitor), as: :json

    assert_response :success
    assert_equal({ "email_updates" => true, "embed_email_consent" => "answered" }, json.slice("email_updates", "embed_email_consent"))
    assert_includes User.with_email_updates, @visitor
  end

  test "a site's user says no to emails" do
    patch api_embed_email_consent_path, params: { granted: false }, headers: embed_session_headers(@visitor), as: :json

    assert_response :success
    assert_equal false, json["email_updates"]
    assert_not_includes User.with_email_updates, @visitor
  end

  test "the session tells the widget to ask" do
    token = JWT.encode({ id: "site-42", email: "visitor@example.com", exp: 1.hour.from_now.to_i }, workspaces(:main).tap(&:regenerate_embed_secret!).embed_secret, "HS256")

    post api_embed_sessions_path, params: { board_pid: "roadmap0pid", token: }, as: :json

    assert_equal "pending", json["user"]["embed_email_consent"]
  end

  test "there's nothing to answer without the workspace's trust" do
    workspaces(:main).update!(trust_embed_emails: false)

    patch api_embed_email_consent_path, params: { granted: true }, headers: embed_session_headers(@visitor), as: :json

    assert_response :forbidden
  end

  test "accounts use their own settings instead" do
    sign_in users(:author)

    patch api_embed_email_consent_path, params: { granted: true }, as: :json

    assert_response :forbidden
  end

  test "requires a session" do
    patch api_embed_email_consent_path, params: { granted: true }, as: :json

    assert_response :unauthorized
  end
end
