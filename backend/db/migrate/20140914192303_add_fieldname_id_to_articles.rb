class AddFieldnameIdToArticles < ActiveRecord::Migration
  def change
    add_column :articles, :userid, :integer
    add_column :articles, :username, :string
  end
end
