class AddColorSchemeToBoards < ActiveRecord::Migration[8.1]
  def change
    add_column :boards, :color_scheme, :string, null: false, default: "teal"
  end
end
