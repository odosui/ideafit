class Db::BoardsController < ApplicationController
  include BoardCreatorsOnly

  layout 'db'

  def index; end

  def show
    @board = BoardManagementPolicy.scope(current_user).find_by!(pid: params[:pid])
  end
end
