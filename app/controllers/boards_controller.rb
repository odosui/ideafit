class BoardsController < ApplicationController
  layout 'board'

  def show
    @board = Board.find_by_pid! params[:pid]
  end
end
