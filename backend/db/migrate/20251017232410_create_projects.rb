class CreateProjects < ActiveRecord::Migration[8.0]
  def change
    create_table :projects do |t|
      t.string :name, null: false
      t.text :description, null: false
      t.string :contact_email, null: false
      t.string :slug, null: false
      t.string :status, null: false

      t.timestamps
    end
    add_index :projects, :slug, unique: true
  end
end
