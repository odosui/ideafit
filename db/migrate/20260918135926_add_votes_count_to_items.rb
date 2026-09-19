class AddVotesCountToItems < ActiveRecord::Migration[8.1]
  def up
    add_column :items, :votes_count, :integer, default: 0, null: false

    execute <<~SQL
      UPDATE items
      SET votes_count = (SELECT COUNT(*) FROM votes WHERE votes.item_id = items.id)
    SQL
  end

  def down
    remove_column :items, :votes_count
  end
end
