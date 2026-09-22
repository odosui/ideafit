module BoardCreatorsOnly
  extend ActiveSupport::Concern

  included do
    before_action :authenticate_user!
    before_action :send_participants_home
  end

  private

  def send_participants_home
    redirect_to participant_home_path unless BoardCreationPolicy.allowed?(current_user)
  end
end
