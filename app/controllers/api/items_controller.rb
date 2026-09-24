class Api::ItemsController < Api::BaseController

  before_action :authenticate_user!, only: [:create, :update, :upvote, :downvote, :destroy]

  def index
    board = Board.find_by_pid!(params[:board_pid])
    if params[:filter] == 'rejected' && !BoardManagementPolicy.allowed?(current_user, board)
      return render_forbidden('Only workspace admins can see rejected items')
    end

    items = board.items
      .of_kind(params[:kind])
      .with_progress(params[:filter])
      .most_voted_first

    render json: ItemSerializer.collection(items, viewer: current_user)
  end

  def create
    board = Board.find_by_pid!(params[:board_pid])
    item = board.items.create!(
      user: current_user,
      kind: params[:kind],
      title: params[:title],
      text: params[:text]
    )

    item.auto_subscribe!(current_user, source: :created)
    item.upvote!(current_user)
    render json: ItemSerializer.new(item.reload, viewer: current_user)
  end

  def update
    item = Item.find(params[:id])
    unless BoardManagementPolicy.allowed?(current_user, item.board)
      return render_forbidden('Only workspace admins can change the status')
    end

    item.change_status!(params[:status], by: current_user)
    render json: ItemSerializer.new(item, viewer: current_user)
  end

  def upvote
    item = Item.find(params[:id])
    item.upvote!(current_user)
    render json: ItemSerializer.new(item.reload, viewer: current_user)
  end

  def downvote
    item = Item.find(params[:id])
    item.downvote!(current_user)
    render json: ItemSerializer.new(item.reload, viewer: current_user)
  end

  def destroy
    item = Item.find(params[:id])
    unless ItemDeletionPolicy.allowed?(current_user, item)
      return render_forbidden('You are not allowed to delete this item')
    end

    item.destroy!
    render json: { success: true }
  end

end
