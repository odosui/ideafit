require "test_helper"

class Api::Boards::OutboxShowTest < ActionDispatch::IntegrationTest
  setup do
    items(:dark_mode).subscribe!(users(:author))
    items(:dark_mode).change_status!("planned", by: users(:board_owner))
  end

  test "the owner sees who will hear about each change" do
    sign_in users(:board_owner)

    get api_board_outbox_path("roadmap0pid"), as: :json

    assert_response :success
    assert_equal 1, json["emails"]
    assert json["fingerprint"].present?
    assert_equal(
      { "title" => "Dark mode", "status" => "planned", "recipients" => [{ "id" => users(:author).id, "name" => nil, "email" => "author@example.com" }] },
      json["changes"].first.slice("title", "status", "recipients"),
    )
  end

  test "another user is forbidden" do
    sign_in users(:author)

    get api_board_outbox_path("roadmap0pid"), as: :json

    assert_response :forbidden
  end

  test "signed-out visitor is unauthorized" do
    get api_board_outbox_path("roadmap0pid"), as: :json

    assert_response :unauthorized
  end
end
