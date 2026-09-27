# What a host site tells us about one of its users, in a JWT or an import file.
# Only `id` is required; the rest is display data we don't trust.
class Embed::Profile
  NAME_LIMIT = 50
  AVATAR_LIMIT = 2048

  Invalid = Class.new(StandardError)

  def initialize(data)
    @data = data.to_h.stringify_keys
    raise Invalid, "user id is missing" if external_id.blank?
    raise Invalid, "user id is too long" if external_id.length > 255
  end

  def external_id
    @data["id"].to_s.strip
  end

  def attributes
    { name:, email:, avatar_url: }
  end

  private

  def name
    @data["name"].to_s.squish.first(NAME_LIMIT).presence
  end

  def email
    email = @data["email"].to_s.strip.downcase
    email.match?(URI::MailTo::EMAIL_REGEXP) ? email : ""
  end

  def avatar_url
    url = @data["avatar"].to_s.strip
    url if url.length <= AVATAR_LIMIT && URI.parse(url).is_a?(URI::HTTPS)
  rescue URI::InvalidURIError
    nil
  end
end
