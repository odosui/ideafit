require "test_helper"

class ItemsCsvTest < ActiveSupport::TestCase
  def rows(items = [items(:dark_mode)])
    csv = ItemsCsv.new(items, link_to: ->(item) { "https://example.com/items/#{item.id}" }).to_csv
    CSV.parse(csv.delete_prefix(ItemsCsv::EXCEL_UTF8_MARK))
  end

  test "writes a header and one row per item with readable labels" do
    items(:dark_mode).update!(text: "Easier on the eyes", status: "ready")
    header, row = rows

    assert_equal ItemsCsv::HEADERS, header
    assert_equal ["Dark mode", "Easier on the eyes", "Idea", "Ready to ship", "2", "author@example.com"], row[1..6]
    assert_equal "https://example.com/items/#{items(:dark_mode).id}", row.last
  end

  test "starts with a UTF-8 mark so Excel reads accents" do
    csv = ItemsCsv.new([], link_to: ->(_) {}).to_csv

    assert csv.start_with?(ItemsCsv::EXCEL_UTF8_MARK)
  end

  test "guards user text against formulas" do
    items(:dark_mode).update!(title: "=cmd|' /C calc'!A0")

    assert_equal "'=cmd|' /C calc'!A0", rows.last[1]
  end
end
