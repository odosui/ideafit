class ItemSerializer
  def self.collection(items, viewer:)
    voted_ids = viewer_item_ids(viewer&.votes, items)
    subscribed_ids = viewer_item_ids(viewer&.item_subscriptions&.active, items)

    items.map do |item|
      new(item, viewer:, voted: voted_ids.include?(item.id), subscribed: subscribed_ids.include?(item.id))
    end
  end

  def self.viewer_item_ids(scope, items)
    return Set.new unless scope

    scope.where(item_id: items.map(&:id)).pluck(:item_id).to_set
  end

  def initialize(item, viewer:, voted: item.voted_by?(viewer), subscribed: item.subscribed?(viewer))
    @item = item
    @viewer = viewer
    @voted = voted
    @subscribed = subscribed
  end

  def as_json(*)
    {
      id: @item.id,
      kind: @item.kind,
      title: @item.title,
      text: @item.text,
      voted: @voted,
      subscribed: @subscribed,
      votes: @item.votes_count,
      status: @item.status,
      can_edit: ItemEditingPolicy.allowed?(@viewer, @item),
      can_delete: ItemDeletionPolicy.allowed?(@viewer, @item),
    }
  end
end
