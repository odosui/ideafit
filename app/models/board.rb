class Board < ApplicationRecord
  COLOR_SCHEMES = %w[teal indigo terracotta ink plum].freeze

  belongs_to :workspace
  belongs_to :user # creator
  has_many :items, inverse_of: :board, dependent: :destroy

  normalizes :description, with: ->(description) { description.strip.presence }

  validates_uniqueness_of :pid
  validates_presence_of :pid
  validates_presence_of :name
  validates :color_scheme, inclusion: { in: COLOR_SCHEMES }

  before_validation :set_pid

  scope :participated_by, ->(user) {
    where(id: user.items.select(:board_id))
      .or(where(id: Item.joins(:votes).where(votes: { user_id: user.id }).select(:board_id)))
  }

  private

  def set_pid
    if self.pid.blank?
      self.pid = random_pid
    end
  end

  def random_pid
    SecureRandom.hex(8)
  end
  
end
