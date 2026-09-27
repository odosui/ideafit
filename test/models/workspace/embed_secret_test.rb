require "test_helper"

class Workspace::EmbedSecretTest < ActiveSupport::TestCase
  test "has no secret until one is generated" do
    assert_empty workspaces(:main).embed_secrets
  end

  test "is encrypted at rest" do
    workspace = workspaces(:main)
    workspace.regenerate_embed_secret!

    stored = Workspace.connection.select_value("SELECT embed_secret FROM workspaces WHERE id = #{workspace.id}")
    assert_not_includes stored, workspace.embed_secret
  end

  test "regenerating keeps the previous secret valid" do
    workspace = workspaces(:main)
    workspace.regenerate_embed_secret!
    first = workspace.embed_secret

    workspace.regenerate_embed_secret!

    assert_not_equal first, workspace.embed_secret
    assert_equal [workspace.embed_secret, first], workspace.reload.embed_secrets
  end
end
