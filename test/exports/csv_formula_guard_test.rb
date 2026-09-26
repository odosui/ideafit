require "test_helper"

class CsvFormulaGuardTest < ActiveSupport::TestCase
  test "neutralizes values a spreadsheet would run as formulas" do
    assert_equal "'=HYPERLINK(\"http://evil\")", CsvFormulaGuard.call('=HYPERLINK("http://evil")')
    assert_equal "'+1", CsvFormulaGuard.call("+1")
    assert_equal "'-1", CsvFormulaGuard.call("-1")
    assert_equal "'@SUM(A1)", CsvFormulaGuard.call("@SUM(A1)")
    assert_equal "'\t=1", CsvFormulaGuard.call("\t=1")
  end

  test "keeps ordinary values as they are" do
    assert_equal "Dark mode", CsvFormulaGuard.call("Dark mode")
    assert_equal 42, CsvFormulaGuard.call(42)
    assert_nil CsvFormulaGuard.call(nil)
  end
end
