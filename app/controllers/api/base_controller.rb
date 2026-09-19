class Api::BaseController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable

  private

  def render_not_found
    render json: { success: false, error: 'Not found' }, status: :not_found
  end

  def render_forbidden(message)
    render json: { success: false, error: message }, status: :forbidden
  end

  def render_unprocessable(error)
    render json: { success: false, errors: error.record.errors.full_messages }, status: :unprocessable_content
  end
end
