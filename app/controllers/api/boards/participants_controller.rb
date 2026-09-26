class Api::Boards::ParticipantsController < Api::BaseController
  before_action :authenticate_user!

  def index
    board = Board.find_by_pid!(params[:board_pid])
    unless BoardManagementPolicy.allowed?(current_user, board)
      return render_forbidden('Only workspace admins can see participants')
    end

    participants = Board::Participants.new(board, query: params[:q], sort: params[:sort]).to_a
    render json: participants.map { |participant| Db::ParticipantSerializer.new(participant) }
  end
end
