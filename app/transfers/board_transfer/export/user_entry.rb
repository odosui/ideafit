class BoardTransfer::Export::UserEntry
  def initialize(user)
    @user = user
  end

  def to_h
    {
      id: BoardTransfer::UserId.for(@user),
      name: @user.name,
      email: @user.email.presence,
      avatar: @user.avatar_url,
    }.compact
  end
end
