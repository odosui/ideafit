class ItemDeletionPolicy
  def self.allowed?(user, item)
    item.authored_by?(user) || BoardManagementPolicy.allowed?(user, item.board)
  end
end
