require "test_helper"

class Db::ItemsShowTest < ActionDispatch::IntegrationTest
  setup do
    @board = boards(:roadmap)
    @item = items(:dark_mode)
  end

  test "the owner opens an item" do
    sign_in users(:board_owner)

    get db_board_item_path(@board.pid, @item)

    assert_response :success
    assert_includes response.body, "Dark mode"
  end

  test "the owner opens the history tab" do
    sign_in users(:board_owner)

    get db_board_item_path(@board.pid, @item, tab: "history")

    assert_response :success
  end

  test "an unknown tab is not routed" do
    sign_in users(:board_owner)

    get "/db/boards/#{@board.pid}/items/#{@item.id}/bogus"

    assert_response :not_found
  end

  test "an item from another board gets 404" do
    other = users(:board_owner).boards.create!(name: "Other")
    sign_in users(:board_owner)

    get db_board_item_path(other.pid, @item)

    assert_response :not_found
  end

  test "another admin gets 404" do
    users(:stranger).update!(admin: true)
    sign_in users(:stranger)

    get db_board_item_path(@board.pid, @item)

    assert_response :not_found
  end

  test "a participant is sent to their home" do
    sign_in users(:author)

    get db_board_item_path(@board.pid, @item)

    assert_redirected_to participant_home_path
  end

  test "signed-out visitor is sent to sign-in" do
    get db_board_item_path(@board.pid, @item)

    assert_redirected_to new_user_session_path
  end
end
