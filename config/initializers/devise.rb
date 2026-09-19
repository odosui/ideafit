# Devise only keeps the session; sign-in happens through MagicLinksController.
Devise.setup do |config|
  require 'devise/orm/active_record'

  config.skip_session_storage = [:http_auth]
  config.expire_all_remember_me_on_sign_out = true
end
