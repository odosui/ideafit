class CreateItemStatusChanges < ActiveRecord::Migration[8.1]
  def change
    create_table :item_status_changes do |t|
      t.references :item, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.string :status, null: false
      t.datetime :created_at, null: false
    end
  end
end
