# Habesha Events — Wedding & Event Planner

Plain HTML/CSS/JS frontend + a small Node/Express backend that sends
booking notifications through a Telegram bot (team notification +
client confirmation).

## Images

The site expects a local `frontend/images/` folder containing your own
photos, referenced exactly as:

- `images/heading.jpg` — full-bleed hero background
- `images/wedding 4.jpg`, `images/wedding 2.jpg` — hero photo collage (2 images)
- `images/event 2.jpg`, `images/event 3.jpg`, `images/event 4.jpg` — middle strip (3 images)
- `images/icon-telegram.png`, `images/icon-instagram.png`, `images/icon-email.png`, `images/icon-phone.png` — footer contact icons (small square PNGs, ~40x40px or larger works fine, they're scaled down to 18px)

Just drop your image files into `frontend/images/` with those exact names
and they'll show up — no code changes needed.

Note: because the footer icons are PNGs (not the site's inline SVGs), they
won't recolor on hover the way the rest of the UI does — only the text
label next to each icon shifts to gold on hover. If you want the icons
themselves to recolor too, they'd need to be SVGs instead.

## Structure

```
habesha-events/
  frontend/
    index.html      the whole site (home, packages, booking form, confirmation)
    styles.css       glass + gold theme, animations, responsive layout
    script.js        i18n (EN/AM), package rendering, view routing, form submit
  backend/
    server.js         Express server + Telegram bot logic
    package.json
    .env.example       copy to .env and fill in your bot token + chat id
```

## 1. Create your Telegram bot

1. Open Telegram, message **@BotFather**, send `/newbot`, follow the prompts.
2. BotFather gives you a **bot token** — looks like `123456789:AAExample...`.
3. Note your bot's **username** (e.g. `HabeshaEventsBot`) — you'll need it
   in `frontend/script.js`.

## 2. Get your team chat ID

1. Add your new bot to your team's Telegram group (or just message it
   directly if it's only for you).
2. Send any message in that chat.
3. Visit this URL in your browser (with your real token):
   `https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates`
4. Find `"chat":{"id": ...}` in the response — that number is your
   `TELEGRAM_TEAM_CHAT_ID`.

## 3. Configure the backend

```bash
cd backend
cp .env.example .env
# edit .env and fill in TELEGRAM_BOT_TOKEN and TELEGRAM_TEAM_CHAT_ID
npm install
npm start
```

The server starts on `http://localhost:3000` and serves the frontend
directly — open that URL in your browser, no separate frontend server
needed.

## 4. Point the frontend at your real bot

In `frontend/script.js`, update:

```js
const BOT_USERNAME = "HabeshaEventsBot"; // <- your real bot username
```

## How the booking flow works

1. Client fills out the booking form and submits.
2. Frontend sends the data to `POST /api/book`.
3. Backend saves the booking (in-memory for now — see note below) and
   immediately sends a formatted message to your **team's Telegram chat**.
4. Backend returns a `bookingId` to the frontend.
5. Frontend shows a confirmation screen with a
   `t.me/<bot>?start=<bookingId>` button.
6. When the client taps it and hits **Start**, Telegram sends your bot a
   `/start <bookingId>` message. The backend's polling loop picks this up,
   looks up the booking, and replies to the **client** with their own
   confirmation.

Both notifications (team + client) go through Telegram, as requested —
the team one is instant on submit, the client one fires the moment they
tap through from the confirmation screen.

## Before going to production

- **Storage:** bookings are currently kept in memory and are lost on
  server restart. Swap the `Map()` in `server.js` for a real database
  (Postgres via Supabase is a good low-effort option) before relying on
  this for real bookings.
- **Hosting:** deploy `backend/` to Railway, Render, or similar (needs to
  run continuously for the Telegram polling loop to keep working).
  Alternatively, switch `pollTelegram()` to a **webhook** instead of
  polling if your host supports HTTPS endpoints — more efficient at scale.
- **Validation:** the current form/API validation is minimal (just
  checks required fields exist). Add stricter validation before
  launch (phone format, date not in the past, etc.).
- **Images:** the site currently uses hand-built SVG illustrations
  instead of photography (this preview environment can't reliably load
  hotlinked external images). Once deployed for real, you can swap
  these out for actual photos from your own weddings, or licensed stock
  photography — real `<img>` tags work fine on an actual live website.

## Admin key
Admin-Password-123