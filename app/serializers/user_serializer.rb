class UserSerializer
  def initialize(user)
    @user = user
  end

  def as_json(*)
    {
      email: @user.email,
      name: @user.name,
      admin: @user.admin?,
      email_updates: @user.email_updates,
    }
  end
end
