class AddNewItemEmailsToUsers < ActiveRecord::Migration[8.1]
  def change
    add_column :users, :new_item_emails, :string, default: "instant", null: false
    add_column :users, :new_items_digested_at, :datetime
  end
end
