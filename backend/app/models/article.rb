class Article < ActiveRecord::Base
 
belongs_to :user

acts_as_taggable

has_attached_file :pic, :styles => 
          { :medium => "300x300>", :thumb => "100x100>" }

validates_attachment_content_type :pic, :content_type => ["image/jpg", "image/jpeg", "image/png", "image/gif"]






  def self.search(query)
    # where(:title, query) 
    if(query.to_s != query.to_i.to_s)
    	where("title like ?", "%#{query}%") 
    else
    	where("username like ?", "%#{query}%") 
    end

  end

  def self.byauthor(query)
     where(:userid, query) 
  end

end
