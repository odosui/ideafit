# When a host site's user said yes or no to emails. Until then they get none.
class AddEmailConsentAnsweredAtToUsers < ActiveRecord::Migration[8.1]
  def change
    add_column :users, :email_consent_answered_at, :datetime
  end
end
