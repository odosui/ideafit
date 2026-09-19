module User::AdminEmails
  def self.include?(email)
    list.include?(email.to_s.strip.downcase)
  end

  def self.list
    ENV.fetch("ADMIN_EMAILS", "").split(",").map { |email| email.strip.downcase }.reject(&:blank?)
  end
end
