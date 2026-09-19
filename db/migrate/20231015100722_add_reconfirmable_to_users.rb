class AddReconfirmableToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :unconfirmed_email, :string # Only if using reconfirmable
  end
end
