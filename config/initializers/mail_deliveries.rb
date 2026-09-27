Rails.application.config.to_prepare do
  ActionMailer::Base.add_delivery_method :log, Deliveries::LogDelivery
  ActionMailer::Base.add_delivery_method :mailgun, Deliveries::MailgunDelivery, **Deliveries::MailgunDelivery.settings
end
