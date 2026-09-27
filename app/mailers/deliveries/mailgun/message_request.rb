# One email as Mailgun's messages.mime endpoint takes it: the finished MIME message plus its recipients.
class Deliveries::Mailgun::MessageRequest
  def initialize(mail, api_key:, domain:, api_url:)
    raise Deliveries::MailgunDelivery::Error, "MAILGUN_DOMAIN isn't set" if domain.blank?

    @mail = mail
    @api_key = api_key
    @domain = domain
    @api_url = api_url
  end

  def uri
    URI.join(@api_url, "/v3/#{@domain}/messages.mime")
  end

  def to_http
    Net::HTTP::Post.new(uri).tap do |request|
      request.basic_auth("api", @api_key)
      request.set_form(form, "multipart/form-data")
    end
  end

  private

  def form
    [
      ["to", @mail.destinations.join(",")],
      ["message", StringIO.new(@mail.encoded), { filename: "message.mime", content_type: "message/rfc822" }],
    ]
  end
end
