class Api::Boards::AnalyticsController < Api::BaseController
  before_action :authenticate_user!

  def show
    board = Board.find_by_pid!(params[:board_pid])
    unless BoardManagementPolicy.allowed?(current_user, board)
      return render_forbidden('Only workspace admins can see analytics')
    end

    render json: Board::Analytics.new(board)
  end
end
