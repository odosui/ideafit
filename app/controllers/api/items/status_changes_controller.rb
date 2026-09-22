class Api::Items::StatusChangesController < Api::BaseController
  before_action :authenticate_user!

  def index
    item = Item.find(params[:item_id])
    unless BoardManagementPolicy.allowed?(current_user, item.board)
      return render_forbidden('Only workspace admins can see the status history')
    end

    changes = item.status_changes.reorder(created_at: :desc, id: :desc).includes(:user)
    render json: changes.map { |change| Db::StatusChangeSerializer.new(change) }
  end
end
