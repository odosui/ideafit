# Item statuses as the file names them, which is how the board shows them.
module BoardTransfer::Statuses
  BY_FILE_NAME = {
    "new" => "fresh",
    "planned" => "planned",
    "in_progress" => "in_progress",
    "ready" => "ready",
    "shipped" => "done",
    "declined" => "rejected",
  }.freeze

  def self.file_name(status)
    BY_FILE_NAME.key(status)
  end

  def self.from_file_name(name)
    BY_FILE_NAME.fetch(name) { raise BoardTransfer::Invalid, "unknown status #{name.inspect}, expected one of #{BY_FILE_NAME.keys.join(", ")}" }
  end
end
