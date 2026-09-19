class CreateItems < ActiveRecord::Migration[6.1]
  def change
    create_table :items do |t|
      t.string :title
      t.references :user, null: false, foreign_key: true
      t.string :text

      t.timestamps
    end
  end
end
