board = Board.find_by!(pid: ARGV[0])
item = board.items.find_by!(title: ARGV[1])
follower = board.workspace.embed_users.create!(
  external_id: "site-#{SecureRandom.hex(4)}",
  email: "e2e-site-user-#{SecureRandom.hex(6)}@example.com",
)
follower.answer_email_consent!(true)
item.subscribe!(follower)

puts({ email: follower.email }.to_json)
