class Api::Boards::Outboxes::ChangesController < Api::BaseController
  include ManagedBoard
  include OutboxConflicts

  def destroy
    Board::Outbox.new(managed_board).drop!(params[:id], reviewed_status: params[:status])
    render json: { success: true }
  end
end
