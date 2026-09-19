class AddAdminToUsers < ActiveRecord::Migration[8.1]
  def up
    add_column :users, :admin, :boolean, default: false, null: false

    execute <<~SQL
      UPDATE users SET admin = TRUE
      WHERE email <> 'demo@example.com'
        AND id IN (SELECT user_id FROM boards)
    SQL
  end

  def down
    remove_column :users, :admin
  end
end
