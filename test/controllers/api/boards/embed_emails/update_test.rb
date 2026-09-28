require "test_helper"

class Api::Boards::EmbedEmailsUpdateTest < ActionDispatch::IntegrationTest
  test "an admin trusts the site's emails and sets the embed page" do
    sign_in users(:board_owner)

    patch api_board_embed_emails_path("roadmap0pid"),
      params: { trust_emails: true, page_url: " https://example.com/feedback " }, as: :json

    assert_response :success
    assert workspaces(:main).reload.trust_embed_emails
    assert_equal "https://example.com/feedback", boards(:roadmap).reload.embed_page_url
  end

  test "an admin turns trust off and clears the page" do
    workspaces(:main).update!(trust_embed_emails: true)
    boards(:roadmap).update!(embed_page_url: "https://example.com/feedback")
    sign_in users(:board_owner)

    patch api_board_embed_emails_path("roadmap0pid"), params: { trust_emails: false, page_url: "" }, as: :json

    assert_response :success
    assert_not workspaces(:main).reload.trust_embed_emails
    assert_nil boards(:roadmap).reload.embed_page_url
  end

  test "rejects a page that isn't a web address and saves nothing" do
    sign_in users(:board_owner)

    patch api_board_embed_emails_path("roadmap0pid"), params: { trust_emails: true, page_url: "javascript:alert(1)" }, as: :json

    assert_response :unprocessable_content
    assert_not workspaces(:main).reload.trust_embed_emails
  end

  test "other users are forbidden" do
    sign_in users(:author)

    patch api_board_embed_emails_path("roadmap0pid"), params: { trust_emails: true }, as: :json

    assert_response :forbidden
    assert_not workspaces(:main).reload.trust_embed_emails
  end
end
