# Moves a board's items, votes and the people behind them in and out as Ideafit JSON.
# The format is described in the README under "Import and export".
module BoardTransfer
  FORMAT = "ideafit".freeze
  VERSION = 1

  Invalid = Class.new(StandardError)
end
