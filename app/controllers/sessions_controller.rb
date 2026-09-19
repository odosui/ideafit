class SessionsController < ApplicationController
  include ReturnToParam

  def destroy
    sign_out(:user)
    redirect_to return_to_param || new_user_session_path
  end
end
