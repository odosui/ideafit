require "test_helper"

class User::EmailUpdatesTest < ActiveSupport::TestCase
  test "email updates are on by default" do
    assert User.create!(email: "new@example.com").email_updates
  end

  test "stopping email updates leaves the user out of the recipients" do
    users(:stranger).stop_email_updates!

    assert_not_includes User.with_email_updates, users(:stranger)
    assert_includes User.with_email_updates, users(:author)
  end

  test "the unsubscribe token finds the user" do
    token = users(:stranger).generate_token_for(:unsubscribe)

    assert_equal users(:stranger), User.find_by_token_for(:unsubscribe, token)
  end
end
