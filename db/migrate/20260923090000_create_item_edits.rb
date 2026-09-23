class CreateItemEdits < ActiveRecord::Migration[8.1]
  def change
    create_table :item_edits do |t|
      t.references :item, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.string :previous_title, null: false
      t.string :previous_text
      t.datetime :created_at, null: false
    end
  end
end
