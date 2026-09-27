require "test_helper"

class Embed::ProfileTest < ActiveSupport::TestCase
  def profile(**data)
    Embed::Profile.new({ "id" => "site-42", **data.stringify_keys })
  end

  test "reads the site's user id, even a number" do
    assert_equal "42", Embed::Profile.new("id" => 42).external_id
  end

  test "requires an id" do
    assert_raises(Embed::Profile::Invalid) { Embed::Profile.new("name" => "Ada") }
    assert_raises(Embed::Profile::Invalid) { Embed::Profile.new("id" => "  ") }
    assert_raises(Embed::Profile::Invalid) { Embed::Profile.new("id" => "x" * 256) }
  end

  test "caps the name" do
    assert_equal "a" * 50, profile(name: "a" * 80).attributes[:name]
    assert_equal "Ada Lovelace", profile(name: "  Ada \n Lovelace ").attributes[:name]
  end

  test "keeps https avatars only" do
    assert_equal "https://cdn.example.com/a.png", profile(avatar: "https://cdn.example.com/a.png").attributes[:avatar_url]
    assert_nil profile(avatar: "http://cdn.example.com/a.png").attributes[:avatar_url]
    assert_nil profile(avatar: "javascript:alert(1)").attributes[:avatar_url]
    assert_nil profile(avatar: "https://#{"a" * 3000}.com").attributes[:avatar_url]
  end

  test "drops an invalid email" do
    assert_equal "ada@example.com", profile(email: " Ada@Example.com").attributes[:email]
    assert_equal "", profile(email: "not an email").attributes[:email]
  end
end
