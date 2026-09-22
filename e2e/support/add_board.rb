owner = User.find_by!(email: ARGV[0])
board = owner.home_workspace.boards.create!(user: owner, name: ARGV[1])

puts({ email: owner.email, pid: board.pid }.to_json)
