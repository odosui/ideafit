class Db::ItemsController < ApplicationController
  include BoardCreatorsOnly

  layout 'db'

  def show
    @board = BoardManagementPolicy.scope(current_user).find_by!(pid: params[:pid])
    @item = @board.items.find(params[:id])
  end
end
