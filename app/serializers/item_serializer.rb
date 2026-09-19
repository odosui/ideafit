class ItemSerializer
  def self.collection(items, viewer:)
    voted_ids = viewer ? viewer.votes.where(item_id: items.map(&:id)).pluck(:item_id).to_set : Set.new
    items.map { |item| new(item, viewer:, voted: voted_ids.include?(item.id)) }
  end

  def initialize(item, viewer:, voted:)
    @item = item
    @viewer = viewer
    @voted = voted
  end

  def as_json(*)
    {
      id: @item.id,
      kind: @item.kind,
      title: @item.title,
      text: @item.text,
      voted: @voted,
      votes: @item.votes_count,
      status: @item.status,
      can_edit: @item.deletable_by?(@viewer),
    }
  end
end
