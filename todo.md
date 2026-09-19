# TODO — missing functionality

Launch chores (CI, README, release) live in `phase1.md`.

## Broken

- [x] Dashboard: clicking a board name goes to `/db/boards/:pid`, which doesn't exist (404)
- [ ] Dashboard: the sidebar "Settings" link goes nowhere

## Board page

- [x] Show the board name
- [x] Tabs to switch between ideas, bugs and questions
- [ ] Labels follow the kind: "Add Idea", "Be the first to add an idea" and "Idea successfully deleted" are shown on every tab
- [x] A link to the board settings for the owner
- [ ] Edit an item's title and text (author or owner)
- [ ] Show each item's author and date

## Dashboard

- [x] Owner page for a board (name, description, color scheme)
- [x] Rename a board
- [ ] Delete a board
- [ ] Copy the public link

## Embedded

- [ ] Embed: the board can't be shown in an iframe on other sites (Rails sends `X-Frame-Options: SAMEORIGIN`)
- [ ] dashboard / Copy the embed snippet

## Accounts

- [ ] Set a display name (`users.name` and `users.username` exist but nothing uses them)

## Later (out of scope for v0.1)

- [ ] Comments
- [ ] Notifications (e.g. when an item you voted on changes status)
- [ ] Merge duplicate items
- [ ] Board settings (which kinds are enabled, welcome text)
- [ ] Private boards
- [ ] Search, pagination
- [ ] SQLite support
- [ ] GitHub OAuth
- [ ] AI / MCP
