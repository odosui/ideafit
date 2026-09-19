require "test_helper"

class Api::BoardsCreateTest < ActionDispatch::IntegrationTest
  test "creates a board for the viewer" do
    sign_in users(:board_owner)

    assert_difference -> { users(:board_owner).boards.count }, 1 do
      post api_boards_path, params: { name: "Ideas" }, as: :json
    end
    assert_response :success
    assert_equal({ "name" => "Ideas", "items_count" => 0 }, json.slice("name", "items_count"))
  end

  test "saves an optional description" do
    sign_in users(:board_owner)

    post api_boards_path, params: { name: "Ideas", description: "What should we build?" }, as: :json

    assert_equal "What should we build?", json["description"]
  end

  test "missing name returns 422" do
    sign_in users(:board_owner)

    post api_boards_path, params: { name: "" }, as: :json
    assert_response :unprocessable_content
  end

  test "a participant cannot create a board" do
    sign_in users(:author)

    assert_no_difference -> { Board.count } do
      post api_boards_path, params: { name: "Ideas" }, as: :json
    end
    assert_response :forbidden
  end

  test "signed-out visitor cannot create a board" do
    post api_boards_path, params: { name: "Ideas" }, as: :json

    assert_response :unauthorized
  end
end
