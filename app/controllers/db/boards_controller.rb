class Db::BoardsController < ApplicationController
  layout 'db'

  before_action :authenticate_user!

  def index; end

  def show
    @board = current_user.boards.find_by!(pid: params[:pid])
  end
end
