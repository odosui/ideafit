# People in the file become identities of the board's workspace: the same ones the
# host site's JWTs sign in, so they find their votes when they open the widget.
# All or nothing. Items with an `id` are updated on a second run, not duplicated.
class BoardTransfer::Import
  def self.from_json(board, json)
    new(board, JSON.parse(json))
  rescue JSON::ParserError => error
    raise BoardTransfer::Invalid, "not valid JSON: #{error.message.truncate(100)}"
  end

  def initialize(board, document)
    @board = board
    @document = BoardTransfer::Import::Document.new(document)
  end

  def run
    ActiveRecord::Base.transaction do
      users = BoardTransfer::Import::Users.new(@board.workspace).import(@document.users)
      items = BoardTransfer::Import::Items.new(@board, users).import(@document.items)
      { users: users.size, items: items.size, votes: items.sum(&:votes_count) }
    end
  end
end
