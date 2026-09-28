require "test_helper"

class User::EmbedEmailConsentTest < ActiveSupport::TestCase
  setup do
    workspaces(:main).update!(trust_embed_emails: true)
  end

  test "asks once the workspace trusts the site's emails" do
    assert_equal :pending, embed_user(email: "visitor@example.com").embed_email_consent
  end

  test "has nothing to ask without an email or the workspace's trust" do
    workspaces(:elsewhere).update!(trust_embed_emails: false)

    assert_equal :none, embed_user(external_id: "site-43").embed_email_consent
    assert_equal :none, embed_user(workspaces(:elsewhere), email: "visitor@example.com").embed_email_consent
    assert_equal :none, users(:author).embed_email_consent
  end

  test "gets no email updates before answering" do
    assert_not_includes User.with_email_updates, embed_user(email: "visitor@example.com")
  end

  test "gets email updates after saying yes" do
    user = embed_user(email: "visitor@example.com")
    user.answer_email_consent!(true)

    assert_equal :answered, user.embed_email_consent
    assert_includes User.with_email_updates, user
    assert_includes User.with_email_updates, users(:author)
  end

  test "gets none after saying no" do
    user = embed_user(email: "visitor@example.com")
    user.answer_email_consent!(false)

    assert_equal :answered, user.embed_email_consent
    assert_not_includes User.with_email_updates, user
  end

  test "gets none once the workspace stops trusting the site's emails" do
    user = embed_user(email: "visitor@example.com")
    user.answer_email_consent!(true)
    workspaces(:main).update!(trust_embed_emails: false)

    assert_not_includes User.with_email_updates, user
  end

  test "is asked again when the site sends a different email" do
    user = embed_user(email: "visitor@example.com")
    user.answer_email_consent!(false)

    user.update!(name: "Visitor")
    assert_equal :answered, user.embed_email_consent

    user.update!(email: "new@example.com")
    assert_equal :pending, user.embed_email_consent
    assert_not_includes User.with_email_updates, user
  end

  test "unsubscribing from an email stops them without asking again" do
    user = embed_user(email: "visitor@example.com")
    user.answer_email_consent!(true)

    User.find_by_token_for(:unsubscribe, user.generate_token_for(:unsubscribe)).stop_email_updates!

    assert_equal :answered, user.reload.embed_email_consent
    assert_not_includes User.with_email_updates, user
  end
end
