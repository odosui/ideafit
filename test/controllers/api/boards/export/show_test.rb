require "test_helper"

class Api::Boards::ExportShowTest < ActionDispatch::IntegrationTest
  test "an admin downloads the board as Ideafit JSON" do
    sign_in users(:board_owner)

    get api_board_export_path("roadmap0pid")

    assert_response :success
    assert_match "attachment", response.headers["Content-Disposition"]
    assert_match "roadmap-", response.headers["Content-Disposition"]
    assert_equal ["ideafit", 1, 4], [json["format"], json["version"], json["items"].size]
  end

  test "other users are forbidden" do
    sign_in users(:author)

    get api_board_export_path("roadmap0pid")

    assert_response :forbidden
  end
end
