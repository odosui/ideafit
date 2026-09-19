class CreateBoards < ActiveRecord::Migration[6.1]
  def change
    create_table :boards do |t|
      t.references :user, null: false, foreign_key: true
      t.string :pid, null: false
      t.timestamps
    end

    add_index :boards, :pid, unique: true
  end
end
