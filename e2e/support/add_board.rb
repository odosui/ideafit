owner = User.find_by!(email: ARGV[0])
board = owner.boards.create!(name: ARGV[1])

puts({ email: owner.email, pid: board.pid }.to_json)
