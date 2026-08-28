// Habesha Events — booking backend
// Handles: POST /api/book  -> notifies the team on Telegram instantly
//          Telegram webhook/polling -> sends the client their confirmation
//          when they tap the "Confirm on Telegram" deep link (/start <bookingId>)
//
// Setup:
//   1. Create a bot via @BotFather on Telegram, get BOT_TOKEN
//   2. Add your bot to your team's group/channel, get TEAM_CHAT_ID
//      (easiest: message the bot/group once, then GET
//       https://api.telegram.org/bot<TOKEN>/getUpdates to read the chat id)
//   3. Copy .env.example to .env and fill in the values
//   4. npm install && npm start

const express = require("express");
const path = require("path");
require("dotenv").config();

const { connectDB } = require("./db");
const ADMIN_KEY = process.env.ADMIN_KEY;

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TEAM_CHAT_ID = process.env.TELEGRAM_TEAM_CHAT_ID;
const PORT = process.env.PORT || 3000;
const TG_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

if (!BOT_TOKEN || !TEAM_CHAT_ID) {
  console.warn(
    "[warn] TELEGRAM_BOT_TOKEN or TELEGRAM_TEAM_CHAT_ID is missing. " +
      "Team notifications will fail until .env is configured."
  );
}

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "frontend")));

function requireAdmin(req, res, next) {
  if (!ADMIN_KEY) {
    return res.status(503).json({ error: "Admin access is not configured on the server." });
  }
  const key = req.header("x-admin-key");
  if (key !== ADMIN_KEY) {
    return res.status(401).json({ error: "Invalid or missing admin key." });
  }
  next();
}


function genBookingId() {
  return "HW-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}

async function sendTelegramMessage(chatId, text) {
  const res = await fetch(`${TG_API}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "Markdown" }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Telegram sendMessage failed: ${res.status} ${body}`);
  }
  return res.json();
}

function formatTeamMessage(b) {
  return [
    "🎉 *New booking received*",
    `*Ref:* ${b.bookingId}`,
    `*Name:* ${b.name}`,
    `*Phone:* ${b.phone}`,
    `*Date:* ${b.date}`,
    `*Package:* ${b.package}`,
    `*Type:* ${b.eventType}`,
    b.notes ? `*Notes:* ${b.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

function formatClientMessage(b, lang) {
  if (lang === "am") {
    return [
      `✅ ማስያዣዎ ደርሶናል!`,
      `*ማጣቀሻ:* ${b.bookingId}`,
      `*ቀን:* ${b.date}`,
      `*አማራጭ:* ${b.package}`,
      ``,
      `ቡድናችን በቅርቡ በስልክ ወይም በዚህ ቻት ያገኝዎታል።`,
    ].join("\n");
  }
  return [
    `✅ Your booking is confirmed!`,
    `*Reference:* ${b.bookingId}`,
    `*Date:* ${b.date}`,
    `*Package:* ${b.package}`,
    ``,
    `Our team will reach out by phone or here on Telegram shortly.`,
  ].join("\n");
}

// ---------- POST /api/book ----------
// Client submits the booking form. We save it, notify the team immediately,
// and hand back a bookingId the frontend uses to build the /start deep link.
app.post("/api/book", async (req, res) => {
  const { name, phone, date, package: pkg, eventType, notes, lang } = req.body || {};

  if (!name || !phone || !date || !eventType) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  const bookingId = genBookingId();
  const booking = { bookingId, name, phone, date, package: pkg, eventType, notes, lang: lang || "en" };
  const db = await connectDB();
await db.collection("bookings").insertOne(booking);

  try {
    if (BOT_TOKEN && TEAM_CHAT_ID) {
      await sendTelegramMessage(TEAM_CHAT_ID, formatTeamMessage(booking));
    }
  } catch (err) {
    // Don't fail the whole request just because Telegram is unreachable —
    // the booking is still saved and the client still gets a reference.
    console.error("[error] failed to notify team:", err.message);
  }

  res.json({ bookingId });
});

app.get("/api/bookings", requireAdmin, async (req, res) => {
  try {
    const db = await connectDB();
    const bookings = await db.collection("bookings").find({}).sort({ createdAt: -1 }).toArray();
    res.json({ bookings });
  } catch (err) {
    res.status(500).json({ error: "Could not load bookings." });
  }
});

app.delete("/api/bookings/:bookingId", requireAdmin, async (req, res) => {
  try {
    const db = await connectDB();
    const result = await db.collection("bookings").deleteOne({ bookingId: req.params.bookingId });
    if (result.deletedCount === 0) return res.status(404).json({ error: "Booking not found." });
    res.json({ deleted: true });
  } catch (err) {
    res.status(500).json({ error: "Could not delete booking." });
  }
});
// ---------- Telegram polling: client confirmation ----------
// When the client taps "Confirm on Telegram" (t.me/YourBot?start=<bookingId>),
// Telegram sends us a message with text "/start <bookingId>". We look up the
// booking and reply with their confirmation.
let lastUpdateId = 0;

async function pollTelegram() {
  if (!BOT_TOKEN) return;
  try {
    const res = await fetch(`${TG_API}/getUpdates?offset=${lastUpdateId + 1}&timeout=25`);
    const data = await res.json();
    if (!data.ok) return;

    for (const update of data.result) {
      lastUpdateId = update.update_id;
      const msg = update.message;
      if (!msg || !msg.text) continue;

      const match = msg.text.match(/^\/start\s+(\S+)/);
      if (match) {
        const bookingId = match[1];
        const booking = bookings.get(bookingId);
        const chatId = msg.chat.id;
        if (booking) {
          await sendTelegramMessage(chatId, formatClientMessage(booking, booking.lang));
        } else {
          await sendTelegramMessage(
            chatId,
            "We couldn't find that booking reference. If you just submitted the form, please try again in a moment."
          );
        }
      }
    }
  } catch (err) {
    console.error("[error] Telegram polling failed:", err.message);
  } finally {
    setTimeout(pollTelegram, 1000);
  }
}

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    pollTelegram(); // if you have this
  });
}
start();
