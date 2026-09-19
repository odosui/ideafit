class AddKindToItems < ActiveRecord::Migration[6.1]
  def change
    add_column :items, :kind, :string
  end
end
