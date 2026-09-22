class Db::StatusChangeSerializer
  def initialize(change)
    @change = change
  end

  def as_json(*)
    {
      id: @change.id,
      status: @change.status,
      changed_by: @change.user.display_name,
      created_at: @change.created_at,
    }
  end
end
