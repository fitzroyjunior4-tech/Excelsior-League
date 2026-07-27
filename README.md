# Excelsior Club Sunday League

A dark, FotMob-style hub for the league: 6 teams, player stats leaderboards,
live match center (events, lineups, live table), news, and an admin dashboard —
installable as an app (PWA), free to host on GitHub Pages with Firebase as the backend.

## 1. Create your Firebase project (free)

1. [console.firebase.google.com](https://console.firebase.google.com) → **Add project**.
2. **Build → Firestore Database → Create database** → production mode → any region.
3. **Build → Authentication → Get started** → enable **Email/Password**.
4. **Authentication → Users → Add user** — this is your admin login.
5. **Project settings → General → Your apps → Web (`</>`)** → register an app → copy the `firebaseConfig` object.

## 2. Paste your config in

Open `js/firebase-config.js` and replace the placeholders with your real `firebaseConfig`.
Safe to make public — access control is Authentication + the rules below, not this file.

## 3. Apply security rules

Firebase console → **Firestore Database → Rules** → paste in `firestore.rules` → **Publish**.
This makes everything publicly readable but writable only when signed in as admin.

## 4. Run locally to test

```bash
python3 -m http.server 8000
```
Open `http://localhost:8000`, go to **Admin**, log in, and:
1. Click **"+ Add All 6 League Teams"** in the Teams tab (adds Astros, Archers, Panthers, Cardinals, Rangers, Off Dorm Allstars in one click) — then upload each team's logo.
2. Add a few players per team in the Players tab (with stats).
3. Add a fixture, pick the two teams, tick the Starting 8/Bench, save.

## 5. Deploy to GitHub Pages

Push this folder to a GitHub repo → **Settings → Pages → Deploy from a branch** → `main` / `/ (root)` → Save.
Live at `https://<you>.github.io/<repo>/` within a minute or two.

## Running a live match

On the fixture's edit form in Admin:
- Set **Status** to "1st Half" when kickoff happens, update **Current Minute** as the match goes (e.g. 12, 20, 34) — this is manual, not an auto clock, so it stays accurate to what's actually happening.
- At the 35-minute mark, set status to "Half-Time"; at second-half kickoff, set to "2nd Half" and keep updating the minute; at the end, set to "Full-Time" and enter the final score.
- Add events (goals/assists/cards) as they happen, with the minute and which team — they appear instantly in the match's event timeline for anyone watching.
- The moment status is 1st Half / Half-Time / 2nd Half, the site-wide **live banner** appears automatically on every page, and a **live table** appears on that match's page.

## About the Excelsior logo + PWA icon

Uploading a logo in **Admin → Site Settings** updates the logo shown in the nav bar and homepage everywhere in the browser — that part is dynamic.

The icon used when someone **installs the app to their home screen** is different: it's read directly from static files (`icons/icon-192.png`, `icons/icon-512.png`, `icons/icon-512-maskable.png`) listed in `manifest.json`, which can't be swapped through the admin panel at runtime. To make the real Excelsior logo the install icon:
1. Replace those three PNG files with your own logo (keep the same filenames and sizes: 192×192 and 512×512).
2. Commit and push — GitHub Pages picks it up on the next deploy.

## Files

```
index.html      Home — hero, upcoming fixtures, table preview, news
fixtures.html   All fixtures, filterable by status
match.html      Match detail — score, events timeline, lineups, live table
teams.html      Team grid
team.html       Team roster + player stats
table.html      Full league table
stats.html      Player stat leaderboards (goals/assists/cards/rating)
news.html       News list
article.html    Full article
admin.html      Login + dashboard (settings, teams, players, fixtures, news)
css/style.css   All styling
js/             Page logic + shared Firebase/PWA/standings modules
firestore.rules Paste into the Firebase console
manifest.json   PWA metadata
sw.js           Service worker (offline app-shell caching)
icons/          App icons (placeholder — swap for your real logo, see above)
```
