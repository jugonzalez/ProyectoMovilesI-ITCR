class TaggsController < ApplicationController
  before_action :set_tagg, only: [:show, :edit, :update, :destroy]

  # GET /taggs
  # GET /taggs.json
  def index
    @taggs = Tagg.all
  end

  # GET /taggs/1
  # GET /taggs/1.json
  def show
  end

  # GET /taggs/new
  def new
    @tagg = Tagg.new
  end

  # GET /taggs/1/edit
  def edit
  end

  # POST /taggs
  # POST /taggs.json
  def create
    @tagg = Tagg.new(tagg_params)

    respond_to do |format|
      if @tagg.save
        format.html { redirect_to @tagg, notice: 'Tagg was successfully created.' }
        format.json { render :show, status: :created, location: @tagg }
      else
        format.html { render :new }
        format.json { render json: @tagg.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /taggs/1
  # PATCH/PUT /taggs/1.json
  def update
    respond_to do |format|
      if @tagg.update(tagg_params)
        format.html { redirect_to @tagg, notice: 'Tagg was successfully updated.' }
        format.json { render :show, status: :ok, location: @tagg }
      else
        format.html { render :edit }
        format.json { render json: @tagg.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /taggs/1
  # DELETE /taggs/1.json
  def destroy
    @tagg.destroy
    respond_to do |format|
      format.html { redirect_to taggs_url, notice: 'Tagg was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_tagg
      @tagg = Tagg.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def tagg_params
      params.require(:tagg).permit(:name, :idarticle, :int)
    end
end
