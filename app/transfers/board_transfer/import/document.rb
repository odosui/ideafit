class BoardTransfer::Import::Document
  def initialize(data)
    raise BoardTransfer::Invalid, "expected a JSON object" unless data.is_a?(Hash)
    raise BoardTransfer::Invalid, %(not an Ideafit file: "format" must be "#{BoardTransfer::FORMAT}") unless data["format"] == BoardTransfer::FORMAT
    raise BoardTransfer::Invalid, %(unsupported "version" #{data["version"].inspect}, expected #{BoardTransfer::VERSION}) unless data["version"] == BoardTransfer::VERSION

    @data = data
  end

  def users
    entries("users")
  end

  def items
    entries("items")
  end

  private

  def entries(key)
    list = @data.fetch(key, [])
    raise BoardTransfer::Invalid, %("#{key}" must be a list) unless list.is_a?(Array)

    list.each_with_index do |entry, index|
      raise BoardTransfer::Invalid, "#{key}[#{index}]: expected an object" unless entry.is_a?(Hash)
    end
  end
end
