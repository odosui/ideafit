# Who may post, vote and follow on a board. Users a host site signed in stay on its workspace's boards.
class BoardParticipationPolicy
  def self.allowed?(user, board)
    return true unless user&.embedded?

    user.embed_workspace_id == board.workspace_id
  end
end
