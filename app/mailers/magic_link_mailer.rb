class MagicLinkMailer < ApplicationMailer
  def sign_in_link(user, return_to: nil)
    @url = magic_link_url(user.generate_token_for(:magic_link), return_to:)
    mail(to: user.email, subject: "Your Ideafit sign-in link")
  end
end
