require "test_helper"

class DefaultSenderTest < ActiveSupport::TestCase
  test "MAIL_FROM wins" do
    env = { "MAIL_FROM" => "Acme <hello@acme.com>", "SMTP_USERNAME" => "me@gmail.com" }

    assert_equal "Acme <hello@acme.com>", DefaultSender.address(env)
  end

  test "falls back to the SMTP login when it's an email address" do
    env = { "SMTP_USERNAME" => "me@gmail.com", "APP_URL" => "https://feedback.acme.com" }

    assert_equal "Ideafit <me@gmail.com>", DefaultSender.address(env)
  end

  test "otherwise sends as noreply at this instance's host" do
    env = { "SMTP_USERNAME" => "apikey", "APP_URL" => "https://feedback.acme.com" }

    assert_equal "Ideafit <noreply@feedback.acme.com>", DefaultSender.address(env)
  end

  test "works with nothing configured" do
    assert_equal "Ideafit <noreply@localhost>", DefaultSender.address({})
  end
end
