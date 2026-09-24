require "test_helper"

class Unsubscribes::EmailsTest < ActionDispatch::IntegrationTest
  setup { @token = users(:stranger).generate_token_for(:unsubscribe) }

  test "asks before unsubscribing, signed out" do
    get unsubscribe_all_path(@token)

    assert_response :success
    assert_select "h1", "Stop all Ideafit emails?"
    assert users(:stranger).reload.email_updates
  end

  test "stops all email updates" do
    post unsubscribe_all_path(@token)

    assert_response :success
    assert_not users(:stranger).reload.email_updates
  end

  test "an invalid token shows an error" do
    get unsubscribe_all_path("nope")

    assert_response :not_found
  end
end
