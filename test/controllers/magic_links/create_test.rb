require "test_helper"

class MagicLinksCreateTest < ActionDispatch::IntegrationTest
  setup { Rails.cache.clear }

  test "emails a sign-in link to an existing user" do
    assert_enqueued_email_with MagicLinkMailer, :sign_in_link, args: [users(:author), { return_to: nil }] do
      post magic_links_path, params: { email: "Author@Example.com " }
    end
    assert_response :success
    assert_select "h1", "Check your email"
  end

  test "creates the user on first sign-in with the same response" do
    assert_difference -> { User.count }, 1 do
      assert_enqueued_emails 1 do
        post magic_links_path, params: { email: "newcomer@example.com" }
      end
    end
    assert_response :success
    assert_select "h1", "Check your email"
  end

  test "passes a local return_to into the link" do
    assert_enqueued_email_with MagicLinkMailer, :sign_in_link,
      args: [users(:author), { return_to: "/b/roadmap0pid/ideas" }] do
      post magic_links_path, params: { email: "author@example.com", return_to: "/b/roadmap0pid/ideas" }
    end
  end

  test "drops a return_to pointing to another site" do
    assert_enqueued_email_with MagicLinkMailer, :sign_in_link, args: [users(:author), { return_to: nil }] do
      post magic_links_path, params: { email: "author@example.com", return_to: "//evil.example.com" }
    end
  end

  test "rejects an invalid email" do
    assert_no_difference -> { User.count } do
      post magic_links_path, params: { email: "not-an-email" }
    end
    assert_response :unprocessable_content
    assert_no_enqueued_emails
  end

  test "rate-limits requests for the same email" do
    3.times { post magic_links_path, params: { email: "author@example.com" } }
    assert_response :success

    post magic_links_path, params: { email: "author@example.com" }
    assert_response :too_many_requests
  end
end
