# Who may create and manage boards. The hosted edition overrides this to let everyone in.
class BoardCreationPolicy
  def self.allowed?(user)
    user.present? && user.admin?
  end
end
