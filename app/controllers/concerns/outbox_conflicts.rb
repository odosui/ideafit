# The outbox changed under an admin's review: they should look again, not act blindly.
module OutboxConflicts
  extend ActiveSupport::Concern

  included do
    rescue_from Board::Outbox::Stale do |error|
      render json: { success: false, error: error.message }, status: :conflict
    end
  end
end
