class BoardTransfer::Import::ItemEntry
  def initialize(data)
    @data = data
  end

  def external_id
    @data["id"].to_s.strip.presence
  end

  def author
    @data["author"].to_s
  end

  def voters
    voters = @data.fetch("voters", [])
    raise BoardTransfer::Invalid, %("voters" must be a list of user ids) unless voters.is_a?(Array)

    voters.map(&:to_s).uniq
  end

  def attributes
    status = BoardTransfer::Statuses.from_file_name(@data.fetch("status", "new"))
    {
      kind: @data["kind"],
      title: @data["title"],
      text: @data["text"],
      status:,
      notified_status: status,
      created_at:,
    }.compact
  end

  private

  def created_at
    Time.iso8601(@data["created_at"]) if @data["created_at"].present?
  rescue ArgumentError, TypeError
    raise BoardTransfer::Invalid, %("created_at" must be an ISO 8601 time, like 2025-03-01T12:00:00Z)
  end
end
