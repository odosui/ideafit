class Api::Embed::SessionsController < Api::BaseController
  # Called from the board's iframe, where the session cookie (and so the CSRF token) is missing.
  # Only a JWT signed with the workspace's secret gets anything back.
  skip_forgery_protection

  rate_limit to: 30, within: 1.minute, name: "ip"

  def create
    board = Board.find_by_pid!(params[:board_pid])
    render json: Embed::Session.start(workspace: board.workspace, jwt: params[:token].to_s)
  rescue Embed::Session::Invalid => error
    render json: { success: false, error: "Invalid token: #{error.message}" }, status: :unauthorized
  end
end
