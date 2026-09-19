owner = User.create!(email: "e2e-owner-#{SecureRandom.hex(6)}@example.com")
board = owner.boards.create!(name: "E2E board")
board.items.create!(user: owner, kind: "idea", title: "Dark mode")

puts({ email: owner.email, pid: board.pid }.to_json)
