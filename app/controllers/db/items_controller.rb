class Db::ItemsController < ApplicationController
  include BoardCreatorsOnly

  layout 'db'

  def show
    @board = current_user.boards.find_by!(pid: params[:pid])
    @item = @board.items.find(params[:id])
  end
end
