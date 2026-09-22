class Db::ItemSerializer
  def initialize(item)
    @item = item
  end

  def as_json(*)
    {
      id: @item.id,
      kind: @item.kind,
      title: @item.title,
      text: @item.text,
      status: @item.status,
      votes: @item.votes_count,
      author: @item.user.display_name,
      created_at: @item.created_at,
    }
  end
end
