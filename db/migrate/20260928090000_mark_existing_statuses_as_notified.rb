# Statuses set before the outbox existed were announced, or predate announcing.
# Without this they would all show up as unsent.
class MarkExistingStatusesAsNotified < ActiveRecord::Migration[8.1]
  def up
    execute "UPDATE items SET notified_status = status WHERE notified_status IS NULL"
  end

  def down; end
end
