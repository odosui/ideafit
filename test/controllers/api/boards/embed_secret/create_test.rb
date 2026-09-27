require "test_helper"

class Api::Boards::EmbedSecretCreateTest < ActionDispatch::IntegrationTest
  test "an admin regenerates the secret and the old one keeps working" do
    workspaces(:main).regenerate_embed_secret!
    old = workspaces(:main).embed_secret
    sign_in users(:board_owner)

    post api_board_embed_secret_path("roadmap0pid"), as: :json

    assert_response :success
    assert_equal [json["secret"], old], workspaces(:main).reload.embed_secrets
  end

  test "other users are forbidden" do
    sign_in users(:author)

    post api_board_embed_secret_path("roadmap0pid"), as: :json

    assert_response :forbidden
    assert_empty workspaces(:main).reload.embed_secrets
  end
end
