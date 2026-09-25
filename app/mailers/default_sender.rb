# Who emails come from when MAIL_FROM isn't set: the SMTP login if it's an
# address, else noreply at this instance's own host. Never someone else's domain.
module DefaultSender
  NAME = "Ideafit".freeze

  def self.address(env = ENV)
    env["MAIL_FROM"].presence || smtp_login(env) || "#{NAME} <noreply@#{app_host(env)}>"
  end

  def self.smtp_login(env)
    login = env["SMTP_USERNAME"].to_s.strip
    "#{NAME} <#{login}>" if login.match?(URI::MailTo::EMAIL_REGEXP)
  end

  def self.app_host(env)
    URI(env["APP_URL"].presence || "http://localhost").host
  end
end
