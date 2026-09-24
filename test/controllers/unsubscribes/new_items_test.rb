require "test_helper"

class Unsubscribes::NewItemsTest < ActionDispatch::IntegrationTest
  setup { @token = users(:board_owner).generate_token_for(:stop_new_item_emails) }

  test "asks before unsubscribing, signed out" do
    get unsubscribe_new_items_path(@token)

    assert_response :success
    assert users(:board_owner).reload.new_item_emails_instant?
  end

  test "stops new item emails only" do
    post unsubscribe_new_items_path(@token)

    assert_response :success
    admin = users(:board_owner).reload
    assert admin.new_item_emails_off?
    assert admin.email_updates
  end

  test "another token purpose does not work" do
    post unsubscribe_new_items_path(users(:board_owner).generate_token_for(:unsubscribe))

    assert_response :not_found
  end
end
