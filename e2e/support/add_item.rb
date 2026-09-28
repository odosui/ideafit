board = Board.find_by!(pid: ARGV[0])
board.items.create!(user: board.user, kind: ARGV[1], title: ARGV[2], status: ARGV[3])
