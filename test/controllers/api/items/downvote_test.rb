require "test_helper"

class Api::ItemsDownvoteTest < ActionDispatch::IntegrationTest
  setup { @item = items(:dark_mode) }

  test "removes the viewer's vote" do
    sign_in users(:author)

    post downvote_api_item_path(@item), as: :json

    assert_response :success
    assert_equal 1, @item.reload.votes_count
  end

  test "does nothing when the viewer has not voted" do
    sign_in users(:stranger)

    post downvote_api_item_path(@item), as: :json

    assert_response :success
    assert_equal 2, @item.reload.votes_count
  end

  test "unknown item returns 404" do
    sign_in users(:author)

    post downvote_api_item_path(id: 0), as: :json
    assert_response :not_found
  end

  test "signed-out visitor cannot downvote" do
    post downvote_api_item_path(@item), as: :json

    assert_response :unauthorized
    assert_equal 2, @item.reload.votes_count
  end
end
