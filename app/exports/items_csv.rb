require "csv"

class ItemsCsv
  HEADERS = ["ID", "Title", "Description", "Kind", "Status", "Votes", "Author", "Created", "Link"].freeze
  EXCEL_UTF8_MARK = "﻿".freeze

  def initialize(items, link_to:)
    @items = items
    @link_to = link_to
  end

  def to_csv
    EXCEL_UTF8_MARK + CSV.generate do |csv|
      csv << HEADERS
      @items.each { |item| csv << row(item).map { |value| CsvFormulaGuard.call(value) } }
    end
  end

  private

  def row(item)
    [
      item.id,
      item.title,
      item.text,
      I18n.t("items.kinds.#{item.kind}"),
      I18n.t("items.statuses.#{item.status}"),
      item.votes_count,
      item.user.display_name,
      item.created_at.iso8601,
      @link_to.call(item),
    ]
  end
end
