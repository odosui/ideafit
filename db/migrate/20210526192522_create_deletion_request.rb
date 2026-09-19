class CreateDeletionRequest < ActiveRecord::Migration[6.1]
  def change
    create_table :deletion_requests do |t|
      t.string :provider
      t.string :uid
      t.string :pid

      t.timestamps
    end
  end
end
