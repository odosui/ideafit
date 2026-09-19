class Api::BoardsController < Api::BaseController

  before_action :authenticate_user!

  def index
    boards = current_user.boards
      .left_joins(:items)
      .select('boards.*, COUNT(items.id) AS items_count')
      .group('boards.id')
      .order('boards.created_at DESC')

    render json: boards.map { |b| BoardSerializer.new(b) }
  end

  def create
    board = current_user.boards.create!(board_params)
    render json: BoardSerializer.new(board)
  end

  def update
    board = Board.find_by_pid!(params[:pid])
    unless board.owned_by?(current_user)
      return render_forbidden('Only the board owner can edit the board')
    end

    board.update!(board_params)
    render json: BoardSerializer.new(board)
  end

  private

  def board_params
    params.permit(:name, :description, :color_scheme)
  end

end
