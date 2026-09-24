# Mail to someone following an item, with unsubscribe links for the footer.
module SubscriberMail
  extend ActiveSupport::Concern
  include OneClickUnsubscribe

  private

  def mail_to_subscriber(subscription, **options, &)
    @unsubscribe_item_url = unsubscribe_item_url(subscription.generate_token_for(:unsubscribe))
    @unsubscribe_all_url = unsubscribe_all_url(subscription.user.generate_token_for(:unsubscribe))
    one_click_unsubscribe(@unsubscribe_item_url)
    mail(to: subscription.user.email, **options, &)
  end
end
