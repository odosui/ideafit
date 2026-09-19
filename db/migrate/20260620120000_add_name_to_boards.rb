class AddNameToBoards < ActiveRecord::Migration[8.1]
  def change
    add_column :boards, :name, :string
  end
end
