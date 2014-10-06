class Api::UsersController < ApplicationController
	respond_to :json
	PER_PAGE_RECORDS=9
	def index
		users_paginated = User.order('id').page(params[:page]).per(PER_PAGE_RECORDS)
		json_response = {
			models: users_paginated,
			currrent_page: params[:page].to_i,
			perPage: PER_PAGE_RECORDS,
			total_pages:users_paginated.num_pages
		}
		respond_with json_response, callback: params[:callback]
	end
end