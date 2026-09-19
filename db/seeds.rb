# A demo board at /b/demo with a few items, so a fresh install has something to look at.
owner = User.find_or_create_by!(email: "demo@example.com")
board = Board.find_or_create_by!(pid: "demo") do |new_board|
  new_board.name = "Demo board"
  new_board.user = owner
end

if board.items.none?
  [
    { kind: :idea, title: "Dark mode", text: "Easier on the eyes at night.", status: :in_progress },
    { kind: :idea, title: "Export items to CSV", text: "For planning in a spreadsheet." },
    { kind: :bug, title: "Long titles overflow the card", status: :done },
    { kind: :question, title: "Can I embed the board on my site?", text: "Yes, see the embed snippet in the README." },
  ].each { |attributes| board.items.create!(attributes.merge(user: owner)) }
end
