class ArticlesController < ApplicationController
  def new
    @article = Article.new
  end


 def show
    @article = Article.find(params[:id])
  end

  def index
    if params[:tag]
      @articles = Article.tagged_with(params[:tag])
    elsif params[:byauthor]
      @articles = Article.search(params[:byauthor]).order("created_at DESC") 
    elsif params[:search]
      @articles = Article.search(params[:search]).order("created_at DESC")
    else
      @articles = Article.order("created_at DESC")
    end
  end


def create
  @article = Article.new(article_params)
  @article.save
  redirect_to @article
end
 
private
  def article_params
    params.require(:article).permit(:title, :text, :costo, :email, :direccion, :pic, :tag_list, :userid, :username)
  end
end


