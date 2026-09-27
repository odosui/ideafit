class BoardTransfer::Import::Users
  def initialize(workspace)
    @workspace = workspace
  end

  # The imported users by their id in the file.
  def import(entries)
    entries.each_with_index.to_h do |entry, index|
      profile = Embed::Profile.new(entry)
      [profile.external_id, @workspace.identify_embed_user!(profile)]
    rescue Embed::Profile::Invalid, ActiveRecord::RecordInvalid => error
      raise BoardTransfer::Invalid, "users[#{index}]: #{error.message}"
    end
  end
end
