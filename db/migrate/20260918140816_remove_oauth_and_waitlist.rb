class RemoveOauthAndWaitlist < ActiveRecord::Migration[8.1]
  def change
    remove_column :users, :provider, :string
    remove_column :users, :uid, :string

    drop_table :deletion_requests do |t|
      t.string :provider
      t.string :uid
      t.string :pid
      t.timestamps
    end

    drop_table :waiting_users do |t|
      t.string :email
      t.timestamps
    end
  end
end
