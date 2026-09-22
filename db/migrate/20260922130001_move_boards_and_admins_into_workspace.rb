class MoveBoardsAndAdminsIntoWorkspace < ActiveRecord::Migration[8.1]
  def up
    execute <<~SQL
      INSERT INTO workspaces (name, created_at, updated_at)
      SELECT 'Ideafit', NOW(), NOW()
      WHERE EXISTS (SELECT 1 FROM boards) OR EXISTS (SELECT 1 FROM users WHERE admin);

      UPDATE boards SET workspace_id = (SELECT MIN(id) FROM workspaces);

      INSERT INTO workspace_memberships (workspace_id, user_id, created_at, updated_at)
      SELECT (SELECT MIN(id) FROM workspaces), id, NOW(), NOW() FROM users WHERE admin;
    SQL

    change_column_null :boards, :workspace_id, false
    remove_column :users, :admin
  end

  def down
    add_column :users, :admin, :boolean, default: false, null: false
    execute "UPDATE users SET admin = TRUE WHERE id IN (SELECT user_id FROM workspace_memberships)"

    change_column_null :boards, :workspace_id, true
    execute "UPDATE boards SET workspace_id = NULL"
    execute "DELETE FROM workspace_memberships"
    execute "DELETE FROM workspaces"
  end
end
