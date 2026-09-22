require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "strips the name and treats blank as no name" do
    user = users(:author)

    user.update!(name: "  Ada  ")
    assert_equal "Ada", user.name

    user.update!(name: "   ")
    assert_nil user.name
  end

  test "limits the name to 50 characters" do
    assert_not users(:author).update(name: "a" * 51)
  end

  test "display name falls back to the email" do
    user = users(:author)
    assert_equal "author@example.com", user.display_name

    user.name = "Ann"
    assert_equal "Ann", user.display_name
  end
end
