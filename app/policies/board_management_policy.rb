# Who may manage a board: edit it, triage its items, see their history.
# Members of the board's workspace do. `allowed?` and `scope` must agree.
class BoardManagementPolicy
  def self.allowed?(user, board)
    board.workspace.member?(user)
  end

  def self.scope(user)
    user ? Board.where(workspace: user.workspaces) : Board.none
  end
end
