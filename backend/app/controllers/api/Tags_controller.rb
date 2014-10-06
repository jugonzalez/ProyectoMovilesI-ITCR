class Api::TagsController < ApplicationController

	def searchtag
		@tag = Tag.all
		render json: @tag, status: 200
	end

end