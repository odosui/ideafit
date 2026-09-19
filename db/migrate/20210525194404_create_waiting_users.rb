class CreateWaitingUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :waiting_users do |t|
      t.string :email

      t.timestamps
    end
  end
end
