module User::AdminGrant
  def grant_admin_if_eligible!
    Workspace.primary.add_member(self) if !admin? && admin_eligible?
  end

  private

  def admin_eligible?
    Workspace::Membership.none? || User::AdminEmails.include?(email)
  end
end
