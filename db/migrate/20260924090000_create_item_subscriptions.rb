class CreateItemSubscriptions < ActiveRecord::Migration[8.1]
  def change
    create_table :item_subscriptions do |t|
      t.references :item, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.string :source, null: false
      t.datetime :unsubscribed_at
      t.timestamps
    end
    add_index :item_subscriptions, [:item_id, :user_id], unique: true
  end
end
