# Used when no SMTP server is configured: prints the email to the log instead.
class Deliveries::LogDelivery
  def self.active?
    ActionMailer::Base.delivery_method == :log
  end

  def initialize(_settings); end

  def deliver!(mail)
    body = (mail.text_part || mail).body.decoded
    Rails.logger.info("[mail] Not sent, SMTP_ADDRESS isn't set. To: #{mail.to.join(', ')}, Subject: #{mail.subject}\n#{body}")
  end
end
