# How a user is referred to in the file: the host site's id, or an Ideafit one for people who signed in by email.
module BoardTransfer::UserId
  def self.for(user)
    user.external_id || "ideafit:#{user.id}"
  end
end
