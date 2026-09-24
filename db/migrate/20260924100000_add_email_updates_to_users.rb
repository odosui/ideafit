class AddEmailUpdatesToUsers < ActiveRecord::Migration[8.1]
  def change
    add_column :users, :email_updates, :boolean, default: true, null: false
  end
end
