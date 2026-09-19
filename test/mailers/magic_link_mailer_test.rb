require "test_helper"

class MagicLinkMailerTest < ActionMailer::TestCase
  test "sends a link that signs the user in" do
    user = users(:author)

    mail = MagicLinkMailer.sign_in_link(user, return_to: "/b/roadmap0pid")

    assert_equal ["author@example.com"], mail.to
    token = mail.text_part.body.decoded[%r{/sign_in/([^?\s]+)}, 1]
    assert_equal user, User.find_by_magic_link(token)
    assert_includes mail.text_part.body.decoded, "return_to=%2Fb%2Froadmap0pid"
  end
end
