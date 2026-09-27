# Who emails come from when MAIL_FROM isn't set: noreply at the Mailgun domain, the SMTP
# login if it's an address, else noreply at this instance's own host. Never someone else's domain.
module DefaultSender
  NAME = "Ideafit".freeze

  def self.address(env = ENV)
    env["MAIL_FROM"].presence || mailgun_sender(env) || smtp_login(env) || "#{NAME} <noreply@#{app_host(env)}>"
  end

  def self.mailgun_sender(env)
    "#{NAME} <noreply@#{env["MAILGUN_DOMAIN"]}>" if env["MAILGUN_API_KEY"].present? && env["MAILGUN_DOMAIN"].present?
  end

  def self.smtp_login(env)
    login = env["SMTP_USERNAME"].to_s.strip
    "#{NAME} <#{login}>" if login.match?(URI::MailTo::EMAIL_REGEXP)
  end

  def self.app_host(env)
    URI(env["APP_URL"].presence || "http://localhost").host
  end
end
