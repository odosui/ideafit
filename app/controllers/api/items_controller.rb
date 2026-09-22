class Api::ItemsController < Api::BaseController

  before_action :authenticate_user!, only: [:create, :update, :upvote, :downvote, :destroy]

  def index
    board = Board.find_by_pid!(params[:board_pid])
    if params[:filter] == 'rejected' && !board.owned_by?(current_user)
      return render_forbidden('Only the board owner can see rejected items')
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

    item.votes.create!(user: current_user)
    render json: ItemSerializer.new(item.reload, viewer: current_user, voted: true)
  end

  def update
    item = Item.find(params[:id])
    unless item.board.owned_by?(current_user)
      return render_forbidden('Only the board owner can change the status')
    end

    item.change_status!(params[:status], by: current_user)
    render json: ItemSerializer.new(item, viewer: current_user, voted: item.votes.exists?(user: current_user))
  end

  def upvote
    item = Item.find(params[:id])
    item.votes.find_or_create_by!(user: current_user)
    render json: { success: true }
  end

  def downvote
    item = Item.find(params[:id])
    item.votes.find_by(user: current_user)&.destroy!
    render json: { success: true }
  end

  def destroy
    item = Item.find(params[:id])
    unless item.deletable_by?(current_user)
      return render_forbidden('You are not allowed to delete this item')
    end

    item.destroy!
    render json: { success: true }
  end

end
