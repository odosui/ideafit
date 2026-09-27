require "test_helper"

class Embed::IdentityTokenTest < ActiveSupport::TestCase
  SECRET = "current-secret"

  def verify(token, secrets: [SECRET])
    Embed::IdentityToken.verify(token, secrets:)
  end

  def hand_signed(payload)
    segments = [{ alg: "HS256", typ: "JWT" }, payload].map { |part| Base64.urlsafe_encode64(part.to_json, padding: false) }
    signature = OpenSSL::HMAC.digest("SHA256", SECRET, segments.join("."))
    [*segments, Base64.urlsafe_encode64(signature, padding: false)].join(".")
  end

  test "returns the claims of a token signed with the secret" do
    assert_equal "site-42", verify(identity_jwt(SECRET))["id"]
  end

  test "accepts the previous secret" do
    assert_equal "site-42", verify(identity_jwt("old-secret"), secrets: [SECRET, "old-secret"])["id"]
  end

  test "rejects another secret" do
    assert_raises(Embed::IdentityToken::Invalid) { verify(identity_jwt("someone-elses")) }
  end

  test "rejects any token when there's no secret yet" do
    assert_raises(Embed::IdentityToken::Invalid) { verify(identity_jwt(SECRET), secrets: []) }
  end

  test "rejects algorithms other than HS256" do
    assert_raises(Embed::IdentityToken::Invalid) { verify(identity_jwt(SECRET, algorithm: "HS512")) }
    assert_raises(Embed::IdentityToken::Invalid) { verify(JWT.encode({ id: "site-42", exp: 1.hour.from_now.to_i }, nil, "none")) }
  end

  test "requires exp" do
    token = JWT.encode({ id: "site-42" }, SECRET, "HS256")

    assert_raises(Embed::IdentityToken::Invalid) { verify(token) }
  end

  test "rejects expired tokens" do
    assert_raises(Embed::IdentityToken::Invalid) { verify(identity_jwt(SECRET, exp: 1.minute.ago)) }
  end

  test "rejects exp more than 24 hours ahead" do
    assert verify(identity_jwt(SECRET, exp: 23.hours.from_now))
    assert_raises(Embed::IdentityToken::Invalid) { verify(identity_jwt(SECRET, exp: 25.hours.from_now)) }
  end

  test "rejects a non-numeric exp" do
    assert_raises(Embed::IdentityToken::Invalid) { verify(hand_signed(id: "site-42", exp: "9999999999")) }
  end

  test "rejects garbage" do
    assert_raises(Embed::IdentityToken::Invalid) { verify("not.a.jwt") }
  end
end
