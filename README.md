# Ideafit

A self-hosted feedback board. Collect ideas, bugs and questions from your users, let them vote, and track what's in progress. Share a public board link or embed it on your site.

## Run it

```sh
curl -O https://raw.githubusercontent.com/odosui/ideafit/main/docker-compose.yml
curl -o .env https://raw.githubusercontent.com/odosui/ideafit/main/.env.example
docker compose up -d
```

Open http://localhost:3000. A demo board lives at http://localhost:3000/b/demo.

Sign-in is by email link. Without SMTP settings in `.env`, the link is printed to `docker compose logs app`.

The first person to sign in becomes the admin. Only admins create boards; everyone else posts and votes on boards shared with them. To add more admins, list their emails in `ADMIN_EMAILS`.

## Embed

```html
<script id="ideafit" src="https://your-ideafit-host/embed.js" data-board="BOARD_ID"></script>
<button onclick="IdeaFit.show()">Feedback</button>
```

## Develop

```sh
bundle install && npm install
bin/rails db:prepare
bin/dev
```
