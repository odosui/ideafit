require "test_helper"

class Api::Boards::AnalyticsShowTest < ActionDispatch::IntegrationTest
  def show(pid = "roadmap0pid")
    get api_board_analytics_path(pid), as: :json
  end

  test "the owner sees the board analytics" do
    sign_in users(:board_owner)

    show

    assert_response :success
    assert_equal 4, json["totals"]["items"]
    assert_equal 12, json["weekly"].size
    assert_equal "Dark mode", json["top_items"].first["title"]
  end

  test "another user is forbidden" do
    sign_in users(:author)

    show

    assert_response :forbidden
  end

  test "signed-out visitor is unauthorized" do
    show

    assert_response :unauthorized
  end

  test "unknown board returns 404" do
    sign_in users(:board_owner)

    show("nope")

    assert_response :not_found
  end
end
