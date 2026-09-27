require "test_helper"

class Api::Boards::EmbedSecretShowTest < ActionDispatch::IntegrationTest
  test "an admin reveals the workspace's secret" do
    workspaces(:main).regenerate_embed_secret!
    sign_in users(:board_owner)

    get api_board_embed_secret_path("roadmap0pid"), as: :json

    assert_response :success
    assert_equal workspaces(:main).reload.embed_secret, json["secret"]
  end

  test "is empty until generated" do
    sign_in users(:board_owner)

    get api_board_embed_secret_path("roadmap0pid"), as: :json

    assert_nil json["secret"]
  end

  test "other users are forbidden" do
    sign_in users(:author)

    get api_board_embed_secret_path("roadmap0pid"), as: :json

    assert_response :forbidden
  end
end
