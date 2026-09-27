class AddEmbedIdentityToUsers < ActiveRecord::Migration[8.1]
  def change
    add_reference :users, :embed_workspace, foreign_key: { to_table: :workspaces }
    add_column :users, :external_id, :string
    add_column :users, :avatar_url, :string
    add_index :users, [:embed_workspace_id, :external_id], unique: true

    remove_index :users, :email, unique: true
    add_index :users, :email, unique: true, where: "embed_workspace_id IS NULL"
  end
end
