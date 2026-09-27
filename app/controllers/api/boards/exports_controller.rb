class Api::Boards::ExportsController < Api::BaseController
  before_action :authenticate_user!

  def show
    board = Board.find_by_pid!(params[:board_pid])
    unless BoardManagementPolicy.allowed?(current_user, board)
      return render_forbidden('Only workspace admins can export the board')
    end

    export = BoardTransfer::Export.new(board)
    send_data JSON.pretty_generate(export.as_json), type: :json, filename: export.filename
  end
end
