class SwitchUsersToMagicLinks < ActiveRecord::Migration[8.1]
  def change
    add_column :users, :magic_link_used_at, :datetime
    add_column :users, :remember_token, :string

    remove_index :users, :confirmation_token, unique: true
    remove_index :users, :reset_password_token, unique: true

    remove_column :users, :encrypted_password, :string, default: "", null: false
    remove_column :users, :confirmation_token, :string
    remove_column :users, :confirmed_at, :datetime, precision: nil
    remove_column :users, :confirmation_sent_at, :datetime, precision: nil
    remove_column :users, :unconfirmed_email, :string
    remove_column :users, :reset_password_token, :string
    remove_column :users, :reset_password_sent_at, :datetime, precision: nil
  end
end
