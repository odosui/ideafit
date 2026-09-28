class Api::Boards::Outboxes::DeliveriesController < Api::BaseController
  include ManagedBoard
  include OutboxConflicts

  def create
    emails = Board::Outbox.new(managed_board).deliver!(reviewed: params[:fingerprint])
    render json: { success: true, emails: }
  end
end
