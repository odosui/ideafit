class Api::Boards::CountsController < Api::BaseController
  include ManagedBoard

  def show
    render json: Board::Counts.new(managed_board)
  end
end
