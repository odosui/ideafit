require "test_helper"

class Api::Boards::ItemsExportTest < ActionDispatch::IntegrationTest
  def export(params = {})
    get api_board_items_path("roadmap0pid", format: :csv), params:
  end

  def rows
    CSV.parse(response.body.delete_prefix(ItemsCsv::EXCEL_UTF8_MARK))
  end

  test "the owner downloads the items as CSV" do
    sign_in users(:board_owner)

    export

    assert_response :success
    assert_equal "text/csv", response.media_type
    assert_match(/attachment; filename="roadmap-items-\d{4}-\d{2}-\d{2}\.csv"/, response.headers["Content-Disposition"])
    assert_equal 5, rows.size
    assert_match %r{/db/boards/roadmap0pid/items/\d+\z}, rows.last.last
  end

  test "applies the same filters as the items list" do
    sign_in users(:board_owner)

    export(kind: "bug")

    assert_equal [["Crash on login"]], rows.drop(1).map { |row| [row[1]] }
  end

  test "another user is forbidden" do
    sign_in users(:author)

    export

    assert_response :forbidden
  end

  test "signed-out visitor is unauthorized" do
    export

    assert_response :unauthorized
  end
end
