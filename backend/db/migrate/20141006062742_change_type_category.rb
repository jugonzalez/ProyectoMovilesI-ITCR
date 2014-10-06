class ChangeTypeCategory < ActiveRecord::Migration
  def up
    change_table :articles do |t|
      t.change :costo, :string
    end
  end

  def down
    change_table :articles do |t|
      t.change :costo, :integer
    end
  end
end
