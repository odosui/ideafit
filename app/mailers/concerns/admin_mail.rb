# Mail to a workspace admin about new items, with a way to stop them.
module AdminMail
  extend ActiveSupport::Concern
  include OneClickUnsubscribe

  private

  def mail_to_admin(admin, **options, &)
    @stop_new_item_emails_url = unsubscribe_new_items_url(admin.generate_token_for(:stop_new_item_emails))
    @settings_url = db_settings_url
    one_click_unsubscribe(@stop_new_item_emails_url)
    mail(to: admin.email, **options, &)
  end
end
