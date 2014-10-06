class Api::ArticlesController < ApplicationController


	skip_before_filter :verify_authenticity_token
	respond_to :json
	PER_PAGE_RECORDS=9

	def index
		#articles_paginated = Article.order('id').page(params[:page]).per(PER_PAGE_RECORDS)
		#json_response = {
		#	models: articles_paginated,
		#	currrent_page: params[:page].to_i,
		#	perPage: PER_PAGE_RECORDS,
		#	total_pages:articles_paginated.num_pages
		#}
		#respond_with json_response, callback: params[:callback]
		#articles = Article.paginate(:page => (params[:page] || 1), :per_page => (params[:per_page] || 100)).all
		articles= Article.all.order("created_at DESC") 
		render json: articles, status: 200
		#render :json => articles.to_json
		#respond_with @article
	end

	def show
		article = Article.find(params[:id])
		#article= Article.find(params[:id])
		render json: article, status: 200
	end



  def saveimage
    Article.picture_from_url(params[:url])
  end

	def getMyAdds
		articulos = Article.where("email = ?",params[:email]).order("created_at DESC") 
		render json: articulos, status: 200
	end

	def searchArticle
	      @articles = Article.search(params[:search]).order("created_at DESC") 
	      render json: @articles, status: 200
  	end

  	def searchTags
	      @articles = Article.tagged_with(params[:tag]).order("created_at DESC") 
	      render json: @articles, status: 200
  	end

  	 def specialSearch
	      @articles = Article.all.order("score DESC").take(10)
	      render json: @articles, status: 200
  	end

  	def searchtagsarticle
  		@articles = Tagging.joins('join tags on taggings.tag_id = tags.id').select('tags.name').where('taggable_id = ?',params[:idarticle])
  		#@articles = Tagging.joins(:tags).select('name')
		#@articles=Tag.select('name').joins(:taggings).where("taggable_id = ?",params[:idarticle])
		render json: @articles, status: 200
  	end

  	def getarticlesrange
  		num1 = params[:idarticle1]
  		num1=num1.to_i
    	num2 = params[:idarticle2]
  		num2=num2.to_i
  		@articles = Article.where('costo <= ? AND costo >= ?',num2,num1)
  		#@articles = Tagging.joins(:tags).select('name')
		#@articles=Tag.select('name').joins(:taggings).where("taggable_id = ?",params[:idarticle])
		render json: @articles, status: 200
  	end  	

  	def score
  		 index = params[:id]
  		 index=index.to_i
		 item = Article.find(index)
		 points = params[:points]
		 num=item.score
		 if (num==nil)
		 		num=0
		 end
  		 num = (points.to_i + num)
		 item.update_attribute(:score, num)
		 render json: item, status: 200
	end


def createMyAdds
  costo = params[:costo]
  costo=costo.to_i
  article = Article.new(title: params[:title],text: params[:text],costo: costo,email: params[:email],direccion: params[:direccion],pic: params[:pic],tag_list: params[:tag_list],score:params[:score])
  article.save
  render json: article, status: 200
end
 
end