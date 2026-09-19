require "test_helper"

class Api::BoardsUpdateTest < ActionDispatch::IntegrationTest
  test "the owner changes the description" do
    sign_in users(:board_owner)

    patch api_board_path(boards(:roadmap).pid), params: { description: "Tell us what to build" }, as: :json

    assert_response :success
    assert_equal "Tell us what to build", json["description"]
    assert_equal "Tell us what to build", boards(:roadmap).reload.description
  end

  test "a blank description goes back to the default" do
    boards(:roadmap).update!(description: "Custom")
    sign_in users(:board_owner)

    patch api_board_path(boards(:roadmap).pid), params: { description: "  " }, as: :json

    assert_nil boards(:roadmap).reload.description
  end

  test "the owner picks a color scheme" do
    sign_in users(:board_owner)

    patch api_board_path(boards(:roadmap).pid), params: { color_scheme: "plum" }, as: :json

    assert_equal "plum", json["color_scheme"]
    assert_equal "plum", boards(:roadmap).reload.color_scheme
  end

  test "an unknown color scheme returns 422" do
    sign_in users(:board_owner)

    patch api_board_path(boards(:roadmap).pid), params: { color_scheme: "neon" }, as: :json

    assert_response :unprocessable_content
    assert_equal "teal", boards(:roadmap).reload.color_scheme
  end

  test "someone else cannot edit the board" do
    sign_in users(:author)

    patch api_board_path(boards(:roadmap).pid), params: { description: "Hacked" }, as: :json

    assert_response :forbidden
    assert_nil boards(:roadmap).reload.description
  end

  test "signed-out visitor cannot edit the board" do
    patch api_board_path(boards(:roadmap).pid), params: { description: "Hacked" }, as: :json

    assert_response :unauthorized
  end
end
