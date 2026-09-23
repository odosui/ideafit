module Embed::AllowedDomains
  # A CSP host source, e.g. acme.com, *.acme.com, https://app.acme.com:8443
  HOST_SOURCE = %r{\A(https?://)?[a-z0-9*][a-z0-9.*-]*(:\d+)?\z}i

  def self.frame_ancestors
    configured? ? [:self, *list] : ["*"]
  end

  def self.list
    ENV.fetch("EMBED_ALLOWED_DOMAINS", "").split(/[\s,]+/).grep(HOST_SOURCE)
  end

  def self.configured?
    ENV["EMBED_ALLOWED_DOMAINS"].present?
  end
end
