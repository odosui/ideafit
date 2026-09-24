# Mail to someone following an item: unsubscribe links for the footer
# and the one-click headers Gmail and Yahoo expect.
module SubscriberMail
  extend ActiveSupport::Concern

  private

  def mail_to_subscriber(subscription, **options, &)
    @unsubscribe_item_url = unsubscribe_item_url(subscription.generate_token_for(:unsubscribe))
    @unsubscribe_all_url = unsubscribe_all_url(subscription.user.generate_token_for(:unsubscribe))
    headers["List-Unsubscribe"] = "<#{@unsubscribe_item_url}>"
    headers["List-Unsubscribe-Post"] = "List-Unsubscribe=One-Click"
    mail(to: subscription.user.email, **options, &)
  end
end
