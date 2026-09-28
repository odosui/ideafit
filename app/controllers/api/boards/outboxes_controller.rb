class Api::Boards::OutboxesController < Api::BaseController
  include ManagedBoard

  def show
    render json: Db::OutboxSerializer.new(Board::Outbox.new(managed_board))
  end
end
