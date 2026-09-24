require "test_helper"

class Api::ItemsCreateTest < ActionDispatch::IntegrationTest
  def create_item(kind: "idea", title: "Keyboard shortcuts", board_pid: "roadmap0pid")
    post api_items_path, params: { board_pid:, kind:, title:, text: "Please" }, as: :json
  end

  test "creates an item with the author's vote" do
    sign_in users(:stranger)

    assert_difference -> { Item.count } => 1, -> { Vote.count } => 1 do
      create_item
    end
    assert_response :success
    assert_equal({ "title" => "Keyboard shortcuts", "votes" => 1, "voted" => true }, json.slice("title", "votes", "voted"))
  end

  test "subscribes the author" do
    sign_in users(:stranger)

    create_item

    assert json["subscribed"]
    assert Item.last.subscriptions.find_by(user: users(:stranger)).source_created?
  end

  test "invalid kind returns 422" do
    sign_in users(:stranger)

    assert_no_difference -> { Item.count } do
      create_item(kind: "feature")
    end
    assert_response :unprocessable_content
  end

  test "missing title returns 422" do
    sign_in users(:stranger)

    create_item(title: "")
    assert_response :unprocessable_content
  end

  test "unknown board returns 404" do
    sign_in users(:stranger)

    create_item(board_pid: "nope")
    assert_response :not_found
  end

  test "signed-out visitor cannot create" do
    assert_no_difference -> { Item.count } do
      create_item
    end
    assert_response :unauthorized
  end
end
