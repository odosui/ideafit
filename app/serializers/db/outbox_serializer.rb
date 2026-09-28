class Db::OutboxSerializer
  def initialize(outbox)
    @outbox = outbox
  end

  def as_json(*)
    {
      fingerprint: @outbox.fingerprint,
      emails: @outbox.letters.size,
      changes: @outbox.changes.map { Db::Outbox::ChangeSerializer.new(it) },
    }
  end
end
