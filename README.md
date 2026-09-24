<p align="center">
  <img src="media/logo.png" alt="Ideafit logo" width="160">
</p>

# Ideafit

A self-hosted feedback board. Collect ideas, bugs and questions from your users, let them vote, and track what's in progress. Share a public board link or embed it on your site.

## Run it

```sh
docker run -d --name ideafit -p 3000:80 -v ideafit:/rails/storage hiquest/ideafit
```

Open http://localhost:3000. A demo board lives at http://localhost:3000/b/demo.

All data (a SQLite database and uploads) lives in the `ideafit` volume. Back it up and you've backed up everything.

To configure the public URL, email and admins, grab [`.env.example`](.env.example), fill it in and add `--env-file .env` to the command. Prefer Compose? There's a [`docker-compose.yml`](docker-compose.yml) too.

Sign-in is by email link. Without SMTP settings, the link is printed to `docker logs ideafit`.

The first person to sign in becomes the admin. Admins share and manage all boards; everyone else posts and votes on boards shared with them. To add more admins, list their emails in `ADMIN_EMAILS`.

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

## License

[MIT](LICENSE)
