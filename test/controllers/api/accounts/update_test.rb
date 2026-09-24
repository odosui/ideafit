require "test_helper"

class Api::AccountsUpdateTest < ActionDispatch::IntegrationTest
  test "sets the viewer's name" do
    sign_in users(:author)

    patch api_account_path, params: { name: "Ada" }, as: :json

    assert_response :success
    assert_equal "Ada", json["name"]
    assert_equal "Ada", users(:author).reload.name
  end

  test "turns email updates off" do
    sign_in users(:author)

    patch api_account_path, params: { name: "Ada", email_updates: false }, as: :json

    assert_response :success
    assert_equal false, json["email_updates"]
    assert_not users(:author).reload.email_updates
  end

  test "does not change the email" do
    sign_in users(:author)

    patch api_account_path, params: { name: "Ada", email: "new@example.com" }, as: :json

    assert_equal "author@example.com", users(:author).reload.email
  end

  test "a too long name returns 422" do
    sign_in users(:author)

    patch api_account_path, params: { name: "a" * 51 }, as: :json

    assert_response :unprocessable_content
  end

  test "signed-out visitor cannot change a name" do
    patch api_account_path, params: { name: "Ada" }, as: :json

    assert_response :unauthorized
  end
end
