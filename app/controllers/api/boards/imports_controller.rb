class Api::Boards::ImportsController < Api::BaseController
  before_action :authenticate_user!

  def create
    board = Board.find_by_pid!(params[:board_pid])
    unless BoardManagementPolicy.allowed?(current_user, board)
      return render_forbidden('Only workspace admins can import into the board')
    end

    render json: BoardTransfer::Import.from_json(board, params[:document].to_s).run
  rescue BoardTransfer::Invalid => error
    render json: { success: false, error: error.message }, status: :unprocessable_content
  end
end
