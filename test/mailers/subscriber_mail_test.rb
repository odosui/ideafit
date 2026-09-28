require "test_helper"

class SubscriberMailTest < ActionMailer::TestCase
  class ExampleMailer < ApplicationMailer
    include SubscriberMail

    def update(user)
      mail_to_subscriber(user, subject: "An update") do |format|
        format.text { render partial: "mailers/unsubscribe_footer" }
        format.html { render partial: "mailers/unsubscribe_footer" }
      end
    end
  end

  setup do
    @mail = ExampleMailer.update(users(:stranger))
  end

  test "goes to the subscriber" do
    assert_equal ["stranger@example.com"], @mail.to
  end

  test "sets the one-click unsubscribe headers to stop all updates" do
    token = @mail["List-Unsubscribe"].value[%r{/unsubscribe/all/([^>]+)>}, 1]

    assert_equal users(:stranger), User.find_by_token_for(:unsubscribe, token)
    assert_equal "List-Unsubscribe=One-Click", @mail["List-Unsubscribe-Post"].value
  end

  test "links to stopping all emails in the footer" do
    token = @mail.text_part.body.decoded[%r{/unsubscribe/all/(\S+)}, 1]

    assert_equal users(:stranger), User.find_by_token_for(:unsubscribe, token)
  end
end
