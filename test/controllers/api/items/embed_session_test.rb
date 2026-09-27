require "test_helper"

class Api::ItemsEmbedSessionTest < ActionDispatch::IntegrationTest
  setup { @visitor = embed_user(name: "Visitor") }

  def headers
    embed_session_headers(@visitor)
  end

  test "a site's user votes with the Bearer token" do
    post upvote_api_item_path(items(:export_csv)), headers:, as: :json

    assert_response :success
    assert json["voted"]
    assert items(:export_csv).voted_by?(@visitor)
  end

  test "a site's user posts, follows and sees their votes" do
    post api_items_path, params: { board_pid: "roadmap0pid", kind: "idea", title: "Webhooks" }, headers:, as: :json
    assert_response :success
    assert_equal @visitor, Item.last.user

    delete api_item_subscription_path(Item.last), headers:, as: :json
    assert_response :success

    get api_items_path, params: { board_pid: "roadmap0pid" }, headers: headers
    assert json.find { |item| item["title"] == "Webhooks" }["voted"]
  end

  test "stays on its workspace's boards" do
    other = boards(:side_project).items.create!(user: users(:stranger), kind: "idea", title: "Elsewhere")

    post upvote_api_item_path(other), headers:, as: :json
    assert_response :not_found

    post api_items_path, params: { board_pid: "side0pid", kind: "idea", title: "Hi" }, headers:, as: :json
    assert_response :not_found
  end

  test "can't triage" do
    patch api_item_path(items(:dark_mode)), params: { status: "planned" }, headers:, as: :json

    assert_response :forbidden
  end

  test "the token doesn't reach admin endpoints" do
    get api_boards_path, headers:, as: :json

    assert_response :unauthorized
  end

  test "an expired token is unauthorized without a redirect" do
    token_headers = headers

    travel 61.minutes do
      post upvote_api_item_path(items(:export_csv)), headers: token_headers, as: :json
    end

    assert_response :unauthorized
    assert_equal "Session expired", json["error"]
  end

  test "a Bearer token wins over the session" do
    sign_in users(:board_owner)

    post upvote_api_item_path(items(:export_csv)), headers:, as: :json

    assert items(:export_csv).voted_by?(@visitor)
    assert_not items(:export_csv).voted_by?(users(:board_owner))
  end

  test "Bearer requests skip CSRF, session requests don't" do
    ActionController::Base.allow_forgery_protection = true

    post upvote_api_item_path(items(:export_csv)), headers:, as: :json
    assert_response :success

    sign_in users(:author)
    post upvote_api_item_path(items(:export_csv)), as: :json
    assert_response :unprocessable_content
  ensure
    ActionController::Base.allow_forgery_protection = false
  end
end
