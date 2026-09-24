require "test_helper"

class Api::ItemsUpvoteTest < ActionDispatch::IntegrationTest
  setup { @item = items(:export_csv) }

  test "adds a vote" do
    sign_in users(:stranger)

    post upvote_api_item_path(@item), as: :json

    assert_response :success
    assert_equal 1, @item.reload.votes_count
  end

  test "subscribes the voter and returns the item" do
    sign_in users(:stranger)

    post upvote_api_item_path(@item), as: :json

    assert_equal({ "votes" => 1, "voted" => true, "subscribed" => true }, json.slice("votes", "voted", "subscribed"))
  end

  test "voting twice counts once" do
    sign_in users(:stranger)

    2.times { post upvote_api_item_path(@item), as: :json }

    assert_equal 1, @item.reload.votes_count
  end

  test "unknown item returns 404" do
    sign_in users(:stranger)

    post upvote_api_item_path(id: 0), as: :json
    assert_response :not_found
  end

  test "signed-out visitor cannot vote" do
    post upvote_api_item_path(@item), as: :json

    assert_response :unauthorized
    assert_equal 0, @item.reload.votes_count
  end
end
