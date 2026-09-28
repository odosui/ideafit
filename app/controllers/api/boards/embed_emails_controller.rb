# Whether to email the users a host site signs in, and where those emails link.
class Api::Boards::EmbedEmailsController < Api::BaseController
  include ManagedBoard

  def show
    render json: Db::EmbedEmailsSerializer.new(managed_board)
  end

  def update
    Board.transaction do
      managed_board.workspace.update!(trust_embed_emails: params.fetch(:trust_emails))
      managed_board.update!(embed_page_url: params[:page_url].to_s)
    end
    render json: Db::EmbedEmailsSerializer.new(managed_board)
  end
end
