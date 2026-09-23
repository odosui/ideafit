require "test_helper"

class Embed::AllowedDomainsTest < ActiveSupport::TestCase
  test "allows any site when unset" do
    with_domains(nil) { assert_equal ["*"], Embed::AllowedDomains.frame_ancestors }
  end

  test "allows only self and the listed domains when set" do
    with_domains("acme.com, *.acme.com https://app.beta.io:8443") do
      assert_equal [:self, "acme.com", "*.acme.com", "https://app.beta.io:8443"], Embed::AllowedDomains.frame_ancestors
    end
  end

  test "drops entries that are not host sources" do
    with_domains("acme.com;script-src,'unsafe-inline' beta.io") do
      assert_equal [:self, "beta.io"], Embed::AllowedDomains.frame_ancestors
    end
  end

  test "allows only self when every entry is invalid" do
    with_domains("acme.com;script-src") do
      assert_equal [:self], Embed::AllowedDomains.frame_ancestors
    end
  end

  private

  def with_domains(value)
    original = ENV["EMBED_ALLOWED_DOMAINS"]
    ENV["EMBED_ALLOWED_DOMAINS"] = value
    yield
  ensure
    ENV["EMBED_ALLOWED_DOMAINS"] = original
  end
end
