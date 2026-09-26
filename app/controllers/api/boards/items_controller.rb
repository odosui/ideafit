class Api::Boards::ItemsController < Api::BaseController
  before_action :authenticate_user!

  def index
    board = Board.find_by_pid!(params[:board_pid])
    unless BoardManagementPolicy.allowed?(current_user, board)
      return render_forbidden('Only workspace admins can manage items')
    end

    items = filtered_items(board)
    respond_to do |format|
      format.json { render json: items.map { |item| Db::ItemSerializer.new(item) } }
      format.csv { send_csv(board, items) }
    end
  end

  private

  def filtered_items(board)
    board.items
      .includes(:user)
      .of_kind(params[:kind])
      .with_status(params[:status])
      .matching(params[:q])
      .sorted_by(params[:sort])
  end

  def send_csv(board, items)
    csv = ItemsCsv.new(items, link_to: ->(item) { db_board_item_url(board.pid, item.id) })
    send_data csv.to_csv, type: :csv, filename: "#{board.name.parameterize}-items-#{Date.current}.csv"
  end
end
