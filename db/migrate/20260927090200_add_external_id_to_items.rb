class AddExternalIdToItems < ActiveRecord::Migration[8.1]
  def change
    add_column :items, :external_id, :string
    add_index :items, [:board_id, :external_id], unique: true
  end
end
