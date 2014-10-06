class CreateTagarticles < ActiveRecord::Migration
  def change
    create_table :tagarticles do |t|
      t.string :name
      t.integer :idarticle

      t.timestamps
    end
  end
end
