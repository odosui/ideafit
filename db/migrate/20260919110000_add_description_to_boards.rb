class AddDescriptionToBoards < ActiveRecord::Migration[8.1]
  def change
    add_column :boards, :description, :text
  end
end
