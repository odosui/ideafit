class User < ApplicationRecord
  include Workspaces
  include AdminGrant

  devise :rememberable

  has_many :boards, inverse_of: :user, dependent: :destroy
  has_many :items
  has_many :votes, dependent: :destroy

  normalizes :email, with: ->(email) { email.strip.downcase }
  normalizes :name, with: ->(name) { name.strip.presence }
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :name, length: { maximum: 50 }

  generates_token_for :magic_link, expires_in: 15.minutes do
    magic_link_used_at
  end

  def self.find_by_magic_link(token)
    find_by_token_for(:magic_link, token)
  end

  def display_name
    name || email
  end

  def consume_magic_link!
    update!(magic_link_used_at: Time.current)
  end
end
