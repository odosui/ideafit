namespace :boards do
  desc "Print a board as Ideafit JSON: bin/rails 'boards:export[BOARD_ID]' > board.json"
  task :export, [:pid] => :environment do |_task, args|
    board = Board.find_by_pid!(args.fetch(:pid))
    puts JSON.pretty_generate(BoardTransfer::Export.new(board).as_json)
  end

  desc "Import Ideafit JSON into a board: bin/rails 'boards:import[BOARD_ID]' < board.json"
  task :import, [:pid] => :environment do |_task, args|
    board = Board.find_by_pid!(args.fetch(:pid))
    summary = BoardTransfer::Import.from_json(board, $stdin.read).run
    puts "Imported #{summary[:items]} items, #{summary[:votes]} votes and #{summary[:users]} users into #{board.name}."
  rescue BoardTransfer::Invalid => error
    abort "Import failed, nothing was changed: #{error.message}"
  end
end
