class Db::EditSerializer
  def initialize(edit)
    @edit = edit
  end

  def as_json(*)
    {
      type: 'edit',
      id: @edit.id,
      previous_title: @edit.previous_title,
      previous_text: @edit.previous_text,
      by: @edit.user.display_name,
      created_at: @edit.created_at,
    }
  end
end
