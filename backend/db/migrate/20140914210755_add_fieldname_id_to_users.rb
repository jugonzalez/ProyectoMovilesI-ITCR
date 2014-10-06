class AddFieldnameIdToUsers < ActiveRecord::Migration
  def change
    add_column :users, :score, :integer
    add_column :articles, :score, :integer
    add_column :articles, :totalscore, :integer
  end
end
