# A host site's user says yes or no to status emails, from the embedded board.
class Api::Embed::EmailConsentsController < Api::BaseController
  include EmbedAuthentication

  before_action :authenticate_user!

  def update
    return render_forbidden("There's no email to ask about") if current_user.embed_email_consent == :none

    current_user.answer_email_consent!(ActiveModel::Type::Boolean.new.cast(params.fetch(:granted)))
    render json: UserSerializer.new(current_user)
  end
end
