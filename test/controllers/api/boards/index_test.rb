require "test_helper"

class Api::BoardsIndexTest < ActionDispatch::IntegrationTest
  test "lists only the viewer's boards with item counts" do
    sign_in users(:board_owner)

    get api_boards_path, as: :json

    assert_response :success
    assert_equal [{ "pid" => "roadmap0pid", "name" => "Roadmap", "items_count" => 4 }],
      json.map { |board| board.slice("pid", "name", "items_count") }
  end

  test "signed-out visitor cannot list boards" do
    get api_boards_path, as: :json

    assert_response :unauthorized
  end
end
