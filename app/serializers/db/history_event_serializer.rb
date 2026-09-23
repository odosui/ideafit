module Db::HistoryEventSerializer
  def self.for(event)
    case event
    when Item::StatusChange then Db::StatusChangeSerializer.new(event)
    when Item::Edit then Db::EditSerializer.new(event)
    end
  end
end
