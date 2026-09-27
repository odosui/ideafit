require "test_helper"

class Deliveries::MailgunDeliveryTest < ActiveSupport::TestCase
  def mail
    Mail.new(from: "Candl <noreply@mg.example.com>", to: "ada@example.com", bcc: "grace@example.com", subject: "Your sign-in link", body: "Hi")
  end

  def deliver(server, domain: "mg.example.com")
    Deliveries::MailgunDelivery.new(api_key: "key-123", domain:, api_url: server.url).deliver!(mail)
  end

  test "posts the finished message to the domain's messages.mime endpoint" do
    server = FakeHttpServer.new
    deliver(server)
    request = server.request

    assert_match %r{\APOST /v3/mg.example.com/messages.mime HTTP/1.1}, request
    assert_match "Authorization: Basic #{Base64.strict_encode64("api:key-123")}", request
    assert_match %r{name="to"\r\n\r\nada@example.com,grace@example.com\r\n}, request
    assert_match 'name="message"; filename="message.mime"', request
    assert_match "Subject: Your sign-in link", request
    assert_no_match(/^Bcc:/i, request)
  ensure
    server.close
  end

  test "fails the delivery when Mailgun refuses it" do
    server = FakeHttpServer.new(status: 401, body: "Forbidden")

    error = assert_raises(Deliveries::MailgunDelivery::Error) { deliver(server) }

    assert_equal "Mailgun answered 401: Forbidden", error.message
  ensure
    server.close
  end

  test "needs a domain" do
    server = FakeHttpServer.new

    assert_raises(Deliveries::MailgunDelivery::Error) { deliver(server, domain: "") }
  ensure
    server.close
  end

  test "reads its settings from the environment, defaulting to the US region" do
    env = { "MAILGUN_API_KEY" => "key-123", "MAILGUN_DOMAIN" => "mg.example.com" }

    assert_equal({ api_key: "key-123", domain: "mg.example.com", api_url: "https://api.mailgun.net" }, Deliveries::MailgunDelivery.settings(env))
    assert_equal "https://api.eu.mailgun.net", Deliveries::MailgunDelivery.settings(env.merge("MAILGUN_API_URL" => "https://api.eu.mailgun.net"))[:api_url]
  end

  test "sends app emails when chosen as the delivery method" do
    server = FakeHttpServer.new
    ActionMailer::Base.delivery_method = :mailgun
    ActionMailer::Base.mailgun_settings = { api_key: "key-123", domain: "mg.example.com", api_url: server.url }

    MagicLinkMailer.sign_in_link(users(:author)).deliver_now

    assert_match "author@example.com", server.request
  ensure
    ActionMailer::Base.delivery_method = :test
    server.close
  end
end
