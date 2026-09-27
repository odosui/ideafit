require "test_helper"

class User::EmbedIdentityTest < ActiveSupport::TestCase
  test "a site's user may share an email with an account" do
    user = embed_user(email: users(:author).email)

    assert user.persisted?
    assert user.embedded?
  end

  test "accounts still need a unique email" do
    assert_not User.new(email: users(:author).email).valid?
  end

  test "external ids are unique per workspace" do
    embed_user
    assert_raises(ActiveRecord::RecordInvalid) { embed_user }
    assert embed_user(workspaces(:elsewhere)).persisted?
  end

  test "never becomes an admin" do
    user = embed_user

    assert_not Workspace::Membership.new(workspace: workspaces(:main), user:).valid?
    assert_not user.admin?
  end

  test "gets no email updates until they verify their email" do
    user = embed_user(email: "visitor@example.com")

    assert_not_includes User.with_email_updates, user
  end

  test "an embed session finds only that user" do
    user = embed_user
    token = user.generate_token_for(:embed_session)

    assert_equal user, User.find_by_embed_session(token)
    assert_nil User.find_by_embed_session(users(:author).generate_token_for(:embed_session))
  end

  test "an embed session lasts an hour" do
    token = embed_user.generate_token_for(:embed_session)

    travel 61.minutes do
      assert_nil User.find_by_embed_session(token)
    end
  end

  test "is named by the site's id when it gave no name or email" do
    assert_equal "site-42", embed_user.display_name
  end
end
