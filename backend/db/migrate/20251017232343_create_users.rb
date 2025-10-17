class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.string :password_digest, null: false
      t.text :skills # Will store JSON array

      t.timestamps
    end

    add_index :users, :email, unique: true
  end
end
