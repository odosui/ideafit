# Sends email through Mailgun's HTTP API: for hosts that block outgoing SMTP, like Railway below Pro.
class Deliveries::MailgunDelivery
  DEFAULT_API_URL = "https://api.mailgun.net".freeze

  Error = Class.new(StandardError)

  def self.settings(env = ENV)
    { api_key: env["MAILGUN_API_KEY"], domain: env["MAILGUN_DOMAIN"], api_url: env["MAILGUN_API_URL"].presence || DEFAULT_API_URL }
  end

  def initialize(settings)
    @settings = settings
  end

  def deliver!(mail)
    request = Deliveries::Mailgun::MessageRequest.new(mail, **@settings)
    response = Net::HTTP.start(request.uri.host, request.uri.port, use_ssl: request.uri.scheme == "https", open_timeout: 5, read_timeout: 15) do |http|
      http.request(request.to_http)
    end
    raise Error, "Mailgun answered #{response.code}: #{response.body.to_s.truncate(200)}" unless response.is_a?(Net::HTTPSuccess)
  end
end
