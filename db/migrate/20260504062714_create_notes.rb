class CreateNotes < ActiveRecord::Migration[8.1]
  def change
    create_table :notes do |t|
      t.string :title, null: false
      t.string :author
      t.text :memo
      t.integer :rating
      t.references :user, null: false, foreign_key: true

      t.index [ :user_id, :created_at ]

      t.timestamps
    end
  end
end
