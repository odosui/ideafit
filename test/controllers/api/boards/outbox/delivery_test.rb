require "test_helper"

class Api::Boards::OutboxDeliveryTest < ActionDispatch::IntegrationTest
  include ActionMailer::TestHelper

  setup do
    items(:dark_mode).subscribe!(users(:author))
    items(:dark_mode).change_status!("planned", by: users(:board_owner))
    @fingerprint = Board::Outbox.new(boards(:roadmap)).fingerprint
  end

  test "the owner sends what they reviewed" do
    sign_in users(:board_owner)

    assert_enqueued_emails 1 do
      post api_board_outbox_delivery_path("roadmap0pid"), params: { fingerprint: @fingerprint }, as: :json
    end

    assert_response :success
    assert_equal 1, json["emails"]
  end

  test "a stale review sends nothing" do
    sign_in users(:board_owner)
    items(:export_csv).change_status!("done", by: users(:board_owner))

    assert_no_enqueued_emails do
      post api_board_outbox_delivery_path("roadmap0pid"), params: { fingerprint: @fingerprint }, as: :json
    end

    assert_response :conflict
  end

  test "another user is forbidden" do
    sign_in users(:author)

    post api_board_outbox_delivery_path("roadmap0pid"), params: { fingerprint: @fingerprint }, as: :json

    assert_response :forbidden
  end
end
