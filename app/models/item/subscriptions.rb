# Who hears about an item's updates. Creating or voting subscribes you;
# an explicit unsubscribe sticks until you follow the item again.
module Item::Subscriptions
  extend ActiveSupport::Concern

  included do
    has_many :subscriptions, dependent: :delete_all
  end

  def subscribers
    User.where(id: subscriptions.active.select(:user_id))
  end

  def subscribed?(user)
    user.present? && subscriptions.active.exists?(user:)
  end

  def subscribe!(user)
    subscription_for(user).update!(source: :manual, unsubscribed_at: nil)
  end

  def auto_subscribe!(user, source:)
    subscription = subscription_for(user)
    subscription.update!(source:) if subscription.new_record?
  end

  def unsubscribe!(user)
    subscription = subscription_for(user)
    subscription.source ||= :manual
    subscription.update!(unsubscribed_at: Time.current)
  end

  def forget_vote_subscription!(user)
    subscriptions.active.source_voted.where(user:).delete_all
  end

  private

  def subscription_for(user)
    subscriptions.find_or_initialize_by(user:)
  end
end
