require "test_helper"

class Api::Boards::OutboxChangeDestroyTest < ActionDispatch::IntegrationTest
  include ActionMailer::TestHelper

  setup do
    @item = items(:dark_mode)
    @item.subscribe!(users(:author))
    @item.change_status!("planned", by: users(:board_owner))
  end

  test "the owner drops a change without emailing anyone" do
    sign_in users(:board_owner)

    assert_no_enqueued_emails do
      delete drop_path, params: { status: "planned" }, as: :json
    end

    assert_response :success
    assert_equal "planned", @item.reload.notified_status
  end

  test "a status other than the reviewed one stays" do
    sign_in users(:board_owner)

    delete drop_path, params: { status: "done" }, as: :json

    assert_response :conflict
    assert_nil @item.reload.notified_status
  end

  test "another user is forbidden" do
    sign_in users(:author)

    delete drop_path, params: { status: "planned" }, as: :json

    assert_response :forbidden
    assert_nil @item.reload.notified_status
  end

  private

  def drop_path
    api_board_outbox_change_path("roadmap0pid", @item)
  end
end
