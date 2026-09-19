class Db::BoardsController < ApplicationController
  layout 'db'

  before_action :authenticate_user!
  before_action :send_participants_home

  def index; end

  def show
    @board = current_user.boards.find_by!(pid: params[:pid])
  end

  private

  def send_participants_home
    redirect_to participant_home_path unless BoardCreationPolicy.allowed?(current_user)
  end
end
