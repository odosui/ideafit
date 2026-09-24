require "test_helper"

class SubscriberMailTest < ActionMailer::TestCase
  class ExampleMailer < ApplicationMailer
    include SubscriberMail

    def update(subscription)
      mail_to_subscriber(subscription, subject: "An update") do |format|
        format.text { render partial: "mailers/unsubscribe_footer" }
        format.html { render partial: "mailers/unsubscribe_footer" }
      end
    end
  end

  setup do
    items(:dark_mode).upvote!(users(:stranger))
    @subscription = items(:dark_mode).subscriptions.find_by(user: users(:stranger))
    @mail = ExampleMailer.update(@subscription)
  end

  test "goes to the subscriber" do
    assert_equal ["stranger@example.com"], @mail.to
  end

  test "sets the one-click unsubscribe headers" do
    token = @mail["List-Unsubscribe"].value[%r{/unsubscribe/item/([^>]+)>}, 1]

    assert_equal @subscription, Item::Subscription.find_by_token_for(:unsubscribe, token)
    assert_equal "List-Unsubscribe=One-Click", @mail["List-Unsubscribe-Post"].value
  end

  test "links to both unsubscribes in the footer" do
    body = @mail.text_part.body.decoded

    assert_match %r{/unsubscribe/item/\S+}, body
    token = body[%r{/unsubscribe/all/(\S+)}, 1]
    assert_equal users(:stranger), User.find_by_token_for(:unsubscribe, token)
  end
end
