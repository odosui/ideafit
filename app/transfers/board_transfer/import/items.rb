# Imported items keep their dates and statuses and notify no one.
class BoardTransfer::Import::Items
  def initialize(board, users_by_id)
    @board = board
    @users_by_id = users_by_id
  end

  def import(entries)
    entries.each_with_index.map do |data, index|
      import_entry(BoardTransfer::Import::ItemEntry.new(data))
    rescue BoardTransfer::Invalid, ActiveRecord::RecordInvalid => error
      raise BoardTransfer::Invalid, "items[#{index}]: #{error.message}"
    end
  end

  private

  def import_entry(entry)
    item = entry.external_id ? @board.items.find_or_initialize_by(external_id: entry.external_id) : @board.items.new
    item.update!(**entry.attributes, user: user(entry.author))
    item.auto_subscribe!(item.user, source: :created)
    entry.voters.each { |voter| item.upvote!(user(voter)) }
    item.reload
  end

  def user(id)
    @users_by_id[id] ||
      @board.workspace.embed_users.find_by(external_id: id) ||
      raise(BoardTransfer::Invalid, "unknown user #{id.inspect}, add them to \"users\"")
  end
end
