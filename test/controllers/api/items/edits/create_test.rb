require "test_helper"

class Api::Items::EditsCreateTest < ActionDispatch::IntegrationTest
  setup { @item = items(:dark_mode) }

  def edit(item = @item, title: "Night mode", text: "For late owls")
    post api_item_edits_path(item), params: { title:, text: }, as: :json
  end

  test "the author edits a fresh item" do
    sign_in users(:author)

    edit

    assert_response :success
    assert_equal ["Night mode", "For late owls"], json.values_at("title", "text")
    assert_equal "Night mode", @item.reload.title
    assert_equal "Dark mode", @item.edits.last.previous_title
  end

  test "a blank title is rejected" do
    sign_in users(:author)

    edit(title: "")

    assert_response :unprocessable_content
    assert_equal "Dark mode", @item.reload.title
  end

  test "the author cannot edit once the status changed" do
    @item.change_status!("planned", by: users(:board_owner))
    sign_in users(:author)

    edit

    assert_response :forbidden
    assert_equal "Dark mode", @item.reload.title
  end

  test "the board owner cannot edit someone else's item" do
    sign_in users(:board_owner)

    edit

    assert_response :forbidden
  end

  test "a signed-out visitor cannot edit" do
    edit

    assert_response :unauthorized
  end

  test "unknown item returns 404" do
    sign_in users(:author)

    post api_item_edits_path(item_id: 0), params: { title: "x" }, as: :json

    assert_response :not_found
  end
end
