class Api::AccountsController < Api::BaseController
  before_action :authenticate_user!

  def update
    current_user.update!(params.permit(:name))
    render json: UserSerializer.new(current_user)
  end
end
