# Spreadsheets run cells starting with these as formulas. User text must
# never do that, so such values get a leading apostrophe.
module CsvFormulaGuard
  TRIGGERS = ["=", "+", "-", "@", "\t", "\r"].freeze

  def self.call(value)
    return value unless value.is_a?(String) && value.start_with?(*TRIGGERS)

    "'#{value}"
  end
end
