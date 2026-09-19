class UserSerializer
  def initialize(user)
    @user = user
  end

  def as_json(*)
    {
      email: @user.email,
      name: @user.name,
    }
  end
end
