class Api::Boards::EmbedSecretsController < Api::BaseController
  before_action :authenticate_user!

  def show
    with_managed_board { |board| render json: { secret: board.workspace.embed_secret } }
  end

  def create
    with_managed_board do |board|
      board.workspace.regenerate_embed_secret!
      render json: { secret: board.workspace.embed_secret }
    end
  end

  private

  def with_managed_board
    board = Board.find_by_pid!(params[:board_pid])
    return render_forbidden('Only workspace admins can see the signing secret') unless BoardManagementPolicy.allowed?(current_user, board)

    yield board
  end
end
