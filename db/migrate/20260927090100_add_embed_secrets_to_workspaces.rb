class AddEmbedSecretsToWorkspaces < ActiveRecord::Migration[8.1]
  def change
    add_column :workspaces, :embed_secret, :string
    add_column :workspaces, :previous_embed_secret, :string
  end
end
