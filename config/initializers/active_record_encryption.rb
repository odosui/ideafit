# Keys for encrypted columns derive from SECRET_KEY_BASE, so there's nothing extra to configure.
Rails.application.configure do
  derive_key = ->(purpose) { key_generator.generate_key("active_record_encryption/#{purpose}", 32).unpack1("H*") }

  config.active_record.encryption.primary_key = derive_key.("primary_key")
  config.active_record.encryption.deterministic_key = derive_key.("deterministic_key")
  config.active_record.encryption.key_derivation_salt = derive_key.("key_derivation_salt")
end
