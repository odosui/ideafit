class Api::Boards::ItemsController < Api::BaseController
  before_action :authenticate_user!

  def index
    board = Board.find_by_pid!(params[:board_pid])
    unless BoardManagementPolicy.allowed?(current_user, board)
      return render_forbidden('Only workspace admins can manage items')
    end

    items = board.items
      .includes(:user)
      .of_kind(params[:kind])
      .with_status(params[:status])
      .matching(params[:q])
      .sorted_by(params[:sort])

    render json: items.map { |item| Db::ItemSerializer.new(item) }
  end
end
