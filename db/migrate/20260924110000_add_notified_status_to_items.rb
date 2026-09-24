class AddNotifiedStatusToItems < ActiveRecord::Migration[8.1]
  def change
    add_column :items, :notified_status, :string
  end
end
