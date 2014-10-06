class CreateTaggs < ActiveRecord::Migration
  def change
    create_table :taggs do |t|
      t.string :name
      t.string :idarticle
      t.string :int

      t.timestamps
    end
  end
end
