class Api::TaggingsController < ApplicationController


	def searchtagging
		tags = Tagging.all()
		render json: tags, status: 200
	end



end