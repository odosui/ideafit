class AddStatusToIdeas < ActiveRecord::Migration[7.1]
  def change
    add_column :items, :status, :string, default: 'fresh'
  end
end
