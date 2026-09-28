class Db::Outbox::ChangeSerializer
  def initialize(change)
    @change = change
  end

  def as_json(*)
    {
      item_id: @change.item.id,
      title: @change.item.title,
      kind: @change.item.kind,
      status: @change.status,
      recipients: @change.recipients.map { recipient_json(it) },
    }
  end

  private

  def recipient_json(user)
    { id: user.id, name: user.name, email: user.email }
  end
end
