class Db::StatusChangeSerializer
  def initialize(change)
    @change = change
  end

  def as_json(*)
    {
      type: 'status_change',
      id: @change.id,
      status: @change.status,
      by: @change.user.display_name,
      created_at: @change.created_at,
    }
  end
end
