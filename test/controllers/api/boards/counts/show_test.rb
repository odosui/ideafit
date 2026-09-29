require "test_helper"

class Api::Boards::CountsShowTest < ActionDispatch::IntegrationTest
  test "the owner sees new items, changes to send and participants" do
    items(:export_csv).change_status!("planned", by: users(:board_owner))
    sign_in users(:board_owner)

    get api_board_counts_path("roadmap0pid"), as: :json

    assert_response :success
    assert_equal({ "new_items" => 1, "outbox" => 1, "participants" => 3 }, json)
  end

  test "another user is forbidden" do
    sign_in users(:author)

    get api_board_counts_path("roadmap0pid"), as: :json

    assert_response :forbidden
  end

  test "signed-out visitor is unauthorized" do
    get api_board_counts_path("roadmap0pid"), as: :json

    assert_response :unauthorized
  end
end
