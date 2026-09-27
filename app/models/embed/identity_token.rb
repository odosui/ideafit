# The JWT a host site signs to say who its user is. The board's workspace
# picks the secrets to check it against, never the token itself.
module Embed::IdentityToken
  ALGORITHM = "HS256".freeze
  MAX_LIFETIME = 24.hours

  Invalid = Class.new(StandardError)

  def self.verify(token, secrets:)
    secrets.each do |secret|
      return decode(token, secret)
    rescue JWT::VerificationError
      next
    end
    raise Invalid, "signature doesn't match"
  end

  def self.decode(token, secret)
    payload, _header = JWT.decode(token, secret, true, algorithms: [ALGORITHM], required_claims: ["exp"])
    raise Invalid, "exp must be at most 24 hours ahead" unless within_max_lifetime?(payload["exp"])
    payload
  rescue JWT::VerificationError
    raise
  rescue JWT::DecodeError => error
    raise Invalid, error.message
  end

  def self.within_max_lifetime?(exp)
    exp.is_a?(Numeric) && exp <= MAX_LIFETIME.from_now.to_i
  end
end
