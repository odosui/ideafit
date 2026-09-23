# Authors may reword their item until an admin acts on it.
class ItemEditingPolicy
  def self.allowed?(user, item)
    item.authored_by?(user) && !item.triaged?
  end
end
