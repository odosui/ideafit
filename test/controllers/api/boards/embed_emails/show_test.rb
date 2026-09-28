require "test_helper"

class Api::Boards::EmbedEmailsShowTest < ActionDispatch::IntegrationTest
  test "an admin sees the workspace's trust and the board's embed page" do
    workspaces(:main).update!(trust_embed_emails: true)
    boards(:roadmap).update!(embed_page_url: "https://example.com/feedback")
    sign_in users(:board_owner)

    get api_board_embed_emails_path("roadmap0pid"), as: :json

    assert_response :success
    assert_equal({ "trust_emails" => true, "page_url" => "https://example.com/feedback" }, json)
  end

  test "other users are forbidden" do
    sign_in users(:author)

    get api_board_embed_emails_path("roadmap0pid"), as: :json

    assert_response :forbidden
  end
end
