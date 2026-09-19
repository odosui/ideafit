class ApplicationMailer < ActionMailer::Base
  default from: ENV["MAIL_FROM"].presence || "Ideafit <auto@ideafit.io>"
  layout "mailer"
end
