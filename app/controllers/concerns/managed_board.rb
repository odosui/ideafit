# API endpoints only the board's workspace admins may use.
module ManagedBoard
  extend ActiveSupport::Concern

  included do
    before_action :authenticate_user!
    before_action :require_board_management
  end

  private

  def managed_board
    @managed_board ||= Board.find_by_pid!(params[:board_pid])
  end

  def require_board_management
    render_forbidden("Only workspace admins can do this") unless BoardManagementPolicy.allowed?(current_user, managed_board)
  end
end
