board = Board.find_by!(pid: ARGV[0])
item = board.items.find_by!(title: ARGV[1])
follower = User.create!(email: "e2e-follower-#{SecureRandom.hex(6)}@example.com")
item.subscribe!(follower)

puts({ email: follower.email }.to_json)
