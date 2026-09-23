module Embeddable
  extend ActiveSupport::Concern

  included do
    content_security_policy do |policy|
      policy.frame_ancestors(*Embed::AllowedDomains.frame_ancestors)
    end

    after_action { response.headers.delete("X-Frame-Options") }
    helper_method :embedded?
  end

  private

  def embedded?
    params[:embed].present?
  end
end
