class CreateTagArticles < ActiveRecord::Migration
  def change
    create_table :tag_articles do |t|
      t.string :name
      t.integer :idArticle

      t.timestamps
    end
  end
end
