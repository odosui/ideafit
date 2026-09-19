module User::AdminGrant
  def grant_admin_if_eligible!
    update!(admin: true) if !admin? && admin_eligible?
  end

  private

  def admin_eligible?
    User.where(admin: true).none? || User::AdminEmails.include?(email)
  end
end
