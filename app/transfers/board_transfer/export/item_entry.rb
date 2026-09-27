class BoardTransfer::Export::ItemEntry
  def initialize(item)
    @item = item
  end

  def to_h
    {
      id: @item.external_id || "ideafit:#{@item.id}",
      kind: @item.kind,
      title: @item.title,
      text: @item.text,
      status: BoardTransfer::Statuses.file_name(@item.status),
      author: BoardTransfer::UserId.for(@item.user),
      created_at: @item.created_at,
      voters: @item.votes.sort_by(&:created_at).map { |vote| BoardTransfer::UserId.for(vote.user) },
    }.compact
  end
end
