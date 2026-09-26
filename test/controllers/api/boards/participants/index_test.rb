require "test_helper"

class Api::Boards::ParticipantsIndexTest < ActionDispatch::IntegrationTest
  def list(params = {})
    get api_board_participants_path("roadmap0pid"), params:, as: :json
  end

  test "the owner sees the board's participants" do
    sign_in users(:board_owner)

    list(q: "author")

    assert_response :success
    assert_equal(
      { "email" => "author@example.com", "name" => nil, "items" => 2, "votes" => 2 },
      json.first.slice("email", "name", "items", "votes"),
    )
    assert json.first["last_active_at"].present?
  end

  test "sorts by votes" do
    sign_in users(:board_owner)

    list(sort: "most_votes")

    assert_equal "author@example.com", json.first["email"]
    assert_equal 3, json.size
  end

  test "another user is forbidden" do
    sign_in users(:author)

    list

    assert_response :forbidden
  end

  test "signed-out visitor is unauthorized" do
    list

    assert_response :unauthorized
  end

  test "unknown board returns 404" do
    sign_in users(:board_owner)

    get api_board_participants_path("nope"), as: :json

    assert_response :not_found
  end
end
