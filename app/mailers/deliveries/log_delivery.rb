# Used when no email service is configured: prints the email to the log instead.
class Deliveries::LogDelivery
  def self.active?
    ActionMailer::Base.delivery_method == :log
  end

  def initialize(_settings); end

  def deliver!(mail)
    body = (mail.text_part || mail).body.decoded
    Rails.logger.info("[mail] Not sent, neither SMTP_ADDRESS nor MAILGUN_API_KEY is set. To: #{mail.to.join(', ')}, Subject: #{mail.subject}\n#{body}")
  end
end
