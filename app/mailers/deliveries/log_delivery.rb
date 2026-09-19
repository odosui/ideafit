# Used when no SMTP server is configured: prints the email to the log instead.
class Deliveries::LogDelivery
  def initialize(_settings); end

  def deliver!(mail)
    body = (mail.text_part || mail).body.decoded
    Rails.logger.info("[mail] To: #{mail.to.join(', ')}, Subject: #{mail.subject}\n#{body}")
  end
end
