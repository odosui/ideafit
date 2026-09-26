module Board::Participants::Sorting
  KEYS = {
    "recent" => :last_active_at,
    "most_items" => :items_count,
    "most_votes" => :votes_count,
  }.freeze

  def self.sort(participants, sort)
    key = KEYS.fetch(sort.to_s, KEYS["recent"])
    participants.sort_by { |participant| [participant.public_send(key), participant.last_active_at] }.reverse
  end
end
