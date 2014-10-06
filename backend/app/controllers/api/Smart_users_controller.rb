class SmartUsersController < ApplicationController
def show
	@person = SmartUser.find(params[:id])
	respond_to do |format|
	format.html
	format.xml(render :xml => @person, :status => :ok)
end
end
end