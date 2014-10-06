class ChangeTypeCosto < ActiveRecord::Migration
  def up
    change_table :articles do |t|
      t.change :costo, 'integer USING CAST(costo AS integer)'
    end
  end

  def down
    change_table :articles do |t|
      t.change :costo, :string
    end
  end
end
