# Mail to someone following items, with a way to stop all such emails.
module SubscriberMail
  extend ActiveSupport::Concern
  include OneClickUnsubscribe

  private

  def mail_to_subscriber(user, **options, &)
    @unsubscribe_all_url = unsubscribe_all_url(user.generate_token_for(:unsubscribe))
    one_click_unsubscribe(@unsubscribe_all_url)
    mail(to: user.email, **options, &)
  end
end
