class Db::ParticipantSerializer
  def initialize(participant)
    @participant = participant
  end

  def as_json(*)
    {
      id: @participant.user.id,
      name: @participant.user.name,
      email: @participant.user.email,
      items: @participant.items_count,
      votes: @participant.votes_count,
      last_active_at: @participant.last_active_at,
    }
  end
end
