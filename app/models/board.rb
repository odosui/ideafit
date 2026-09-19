class Board < ApplicationRecord
  COLOR_SCHEMES = %w[teal indigo terracotta ink plum].freeze

  belongs_to :user
  has_many :items, inverse_of: :board, dependent: :destroy

  normalizes :description, with: ->(description) { description.strip.presence }

  validates_uniqueness_of :pid
  validates_presence_of :pid
  validates_presence_of :name
  validates :color_scheme, inclusion: { in: COLOR_SCHEMES }

  before_validation :set_pid

  def owned_by?(someone)
    someone.present? && user_id == someone.id
  end

  private

  # TODO: Add index on pid
  def set_pid
    if self.pid.blank?
      self.pid = random_pid
    end
  end

  def random_pid
    SecureRandom.hex(8)
  end
  
end
