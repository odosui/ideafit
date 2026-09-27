require "test_helper"

class Api::Boards::ImportCreateTest < ActionDispatch::IntegrationTest
  DOCUMENT = {
    format: "ideafit",
    version: 1,
    users: [{ id: "u1", name: "Ada" }],
    items: [{ kind: "idea", title: "Offline mode", author: "u1", voters: ["u1"] }],
  }.to_json

  def import(document = DOCUMENT)
    post api_board_import_path("roadmap0pid"), params: { document: }, as: :json
  end

  test "an admin imports a file" do
    sign_in users(:board_owner)

    import

    assert_response :success
    assert_equal({ "users" => 1, "items" => 1, "votes" => 1 }, json)
  end

  test "reports what's wrong" do
    sign_in users(:board_owner)

    import({ format: "ideafit", version: 3 }.to_json)

    assert_response :unprocessable_content
    assert_equal 'unsupported "version" 3, expected 1', json["error"]
  end

  test "other users are forbidden" do
    sign_in users(:author)

    assert_no_difference -> { Item.count } do
      import
    end
    assert_response :forbidden
  end
end
