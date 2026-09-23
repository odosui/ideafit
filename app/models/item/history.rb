# Everything that happened to an item after it was created, newest first.
class Item::History
  def initialize(item)
    @item = item
  end

  def events
    (@item.status_changes.includes(:user) + @item.edits.includes(:user))
      .sort_by { |event| [event.created_at, event.id] }
      .reverse
  end
end
