class ApplicationMailer < ActionMailer::Base
  default from: DefaultSender.address
  layout "mailer"
end
