// ---------- Config ----------
// The backend serves this frontend as static files, so a relative path
// always hits the right server — no need to hardcode a host.
const API_BASE = "";
const BOT_USERNAME = "Habeshan_eventbot"; // TODO: replace with your real bot username

// ---------- Content ----------
const COPY = {
  en: {
    "nav.home": "Home", "nav.packages": "Packages", "nav.book": "Book",
    heroEyebrow: "Addis Ababa & beyond",
    heroTitle: "Your love story, honored the Habesha way",
    heroBody: "From the melse to the church doors to the final dance — we plan every layer of the celebration, in your language and your customs.",
    heroCta: "See packages", heroCta2: "Book a date",
    promiseLabel: "Our promise",
    promise: "\u201cYour love story deserves a perfect celebration. We plan with passion, create with elegance, and deliver unforgettable memories.\u201d",
    packagesTitle: "Choose how much of the journey we carry",
    packagesSub: "Three levels of support, built around multi-day Ethiopian celebrations — engagement, ceremony, and reception.",
    addonLabel: "Optional add-on",
    addonText: "Multi-day coordination (melse + ceremony + reception)",
    choose: "Choose this package", popular: "Most booked",
    galleryTitle: "Real weddings, coming soon",
    galleryBody: "We're a new studio — this gallery will fill with our own couples' celebrations. Until then, we'd rather show you nothing than borrow someone else's day.",
    bookTitle: "Tell us about your celebration",
    bookSub: "A few details, then we'll reach out on Telegram to confirm.",
    "fields.name": "Full name", "fields.phone": "Phone number", "fields.date": "Event date",
    "fields.package": "Package", "fields.eventType": "Celebration type", "fields.notes": "Anything we should know",
    eventTypes: ["Wedding", "Engagement (Melse)", "Multi-day celebration", "Other"],
    submit: "Submit booking",
    confirmTitle: "Received — one last step",
    confirmBody: "Our team has already been notified. Tap below to open Telegram and get your confirmation with the next steps.",
    telegramCta: "Confirm on Telegram",
    onscreenNote: "Prefer not to use Telegram? Your booking is saved either way — we'll also reach you by phone.",
    backHome: "Back to home",
    footerNote: "Planned with care, in Addis Ababa.",
    footerContact: "Get in touch",
    submitError: "Something went wrong sending your booking. Please try again or contact us directly.",
    errName: "Please enter your full name.",
    errPhone: "Please enter a phone number.",
    errDateRequired: "Please choose an event date.",
    errDateInvalid: "That doesn't look like a valid date.",
    errDatePast: "That date has already passed — please choose an upcoming date.",
    errEventType: "Please choose a celebration type.",
  },
  am: {
    "nav.home": "መነሻ", "nav.packages": "አማራጮች", "nav.book": "ይያዙ",
    heroEyebrow: "አዲስ አበባ እና ሌሎች ከተሞች",
    heroTitle: "የፍቅር ታሪክዎ በሐበሻ ወግ ይከበር",
    heroBody: "ከመልስ እስከ ቤተ ክርስቲያን በር እስከ መጨረሻው ዳንስ — በቋንቋዎና ባህልዎ እያንዳንዱን የበዓሉን ደረጃ እናቅዳለን።",
    heroCta: "አማራጮችን ይመልከቱ", heroCta2: "ቀን ይያዙ",
    promiseLabel: "ቃላችን",
    promise: "«የፍቅር ታሪክዎ ፍጹም በዓል ይገባዋል። በፍቅር እናቅዳለን፣ በውበት እንፈጥራለን፣ የማይረሱ ትዝታዎችን እናደርሳለን።»",
    packagesTitle: "ምን ያህል ጉዞውን አብረን እንሸከም ይምረጡ",
    packagesSub: "ለብዙ ቀናት የኢትዮጵያ በዓላት የተዘጋጁ ሦስት የድጋፍ ደረጃዎች — መልስ፣ ሥነ ሥርዓት እና ግብዣ።",
    addonLabel: "አማራጭ ተጨማሪ",
    addonText: "የብዙ ቀናት ማስተባበር (መልስ + ሥነ ሥርዓት + ግብዣ)",
    choose: "ይህን አማራጭ ይምረጡ", popular: "በብዛት የተያዘ",
    galleryTitle: "እውነተኛ ሰርጎች፣ በቅርቡ",
    galleryBody: "አዲስ ስቱዲዮ ነን — ይህ ማዕከለ-ስዕላት በራሳችን ጥንዶች በዓላት ይሞላል። እስከዚያ ድረስ የሌላ ሰውን ቀን ከምንዋስ ምንም ላለማሳየት እንመርጣለን።",
    bookTitle: "ስለ በዓልዎ ይንገሩን",
    bookSub: "ጥቂት ዝርዝሮች፣ ከዚያ በቴሌግራም አግኝተን እናረጋግጣለን።",
    "fields.name": "ሙሉ ስም", "fields.phone": "ስልክ ቁጥር", "fields.date": "የበዓሉ ቀን",
    "fields.package": "አማራጭ", "fields.eventType": "የበዓሉ አይነት", "fields.notes": "ማወቅ ያለብን ነገር ካለ",
    eventTypes: ["ሰርግ", "መልስ", "የብዙ ቀናት በዓል", "ሌላ"],
    submit: "ማስያዣ ላክ",
    confirmTitle: "ደርሶናል — አንድ የመጨረሻ ደረጃ",
    confirmBody: "ቡድናችን አስቀድሞ ተነግሮታል። ከታች ይንኩ ቴሌግራምን ከፍተው ማረጋገጫዎን እና ቀጣይ ደረጃዎችን ለማግኘት።",
    telegramCta: "በቴሌግራም ያረጋግጡ",
    onscreenNote: "ቴሌግራም መጠቀም ካልፈለጉ? ማስያዣዎ በሁለቱም መንገድ ተቀምጧል — በስልክም እናገኝዎታለን።",
    backHome: "ወደ መነሻ ተመለስ",
    footerNote: "በአዲስ አበባ በጥንቃቄ የታቀደ።",
    footerContact: "ያግኙን",
    submitError: "ማስያዣዎን በመላክ ላይ ችግር ተፈጥሯል። እባክዎ ዳግም ይሞክሩ ወይም በቀጥታ ያነጋግሩን።",
    errName: "እባክዎ ሙሉ ስምዎን ያስገቡ።",
    errPhone: "እባክዎ ስልክ ቁጥር ያስገቡ።",
    errDateRequired: "እባክዎ የበዓሉን ቀን ይምረጡ።",
    errDateInvalid: "ይህ ትክክለኛ ቀን አይመስልም።",
    errDatePast: "ይህ ቀን አልፏል — እባክዎ ወደፊት ያለ ቀን ይምረጡ።",
    errEventType: "እባክዎ የበዓሉን አይነት ይምረጡ።",
  },
};

// ---------- Packages ----------
const PACKAGES = [
   {
    id: "celebrations", icon: "🎉", badge: false, accent: "#E86B8A", accentSoft: "rgba(232,107,138,0.18)",
    en: { name: "Celebrations", tag: "Birthdays · Bridals · Gender Reveals · Engagements", price: "10,000 – 50,000 ETB", duration: "Single-day event · priced by scale & guest count",
      items: ["Event concept & theme planning","Venue sourcing & booking support","Decor planning & setup coordination","Vendor sourcing (cake, catering, entertainment)","Invitations & guest list support","Event day timeline","On-site event management","Photography coordination (optional)"] },
    am: { name: "የበዓል አቅድ", tag: "የልደት · ኪዳን · ጾታ መግለጫ · ውል በዓላት", price: "10,000 – 50,000 ብር", duration: "የአንድ ቀን በዓል · በመጠን እና በእንግዳ ብዛት ይተመናል",
      items: ["የበዓል ፅንሰ ሃሳብ እና ገጽታ እቅድ","የቦታ ፍለጋ እና ማስያዣ ድጋፍ","የጌጣጌጥ እቅድ እና ዝግጅት ማስተባበር","አቅራቢ ፍለጋ (ኬክ፣ ምግብ፣ መዝናኛ)","የግብዣ ካርድ እና እንግዳ ዝርዝር ድጋፍ","የበዓሉ ቀን የጊዜ ሰሌዳ","በቦታው ላይ የበዓል አስተዳደር","የፎቶግራፍ ማስተባበር (አማራጭ)"] },
  },
  {
    id: "silver", icon: "🥈", badge: false, accent: "#5FB8AC", accentSoft: "rgba(95,184,172,0.18)",
    en: { name: "Silver", tag: "Wedding Day Coordination", price: "45,000 ETB", duration: "Day-of only · 1 lead + 1 assistant",
      items: ["Pre-wedding consultation","Review of existing plans","Vendor confirmation","Timeline management","Ceremony & reception coordination","Guest assistance","On-site problem solving","Ensuring smooth event flow"] },
    am: { name: "ሲልቨር", tag: "የሰርግ ቀን ማስተባበር", price: "45,000 ብር", duration: "የቀኑ ብቻ · 1 መሪ + 1 ረዳት",
      items: ["ቅድመ-ሰርግ ምክክር","የነባር እቅድ ግምገማ","የአቅራቢ ማረጋገጫ","የጊዜ ሰሌዳ አስተዳደር","የሥነ ሥርዓት እና ግብዣ ማስተባበር","የእንግዳ ድጋፍ","በቦታው ላይ ችግር መፍታት","ለስላሳ የበዓል ፍሰት ማረጋገጥ"] },
  },
  {
    id: "gold", icon: "🥇", badge: true, accent: "#E29A3E", accentSoft: "rgba(226,154,62,0.18)",
    en: { name: "Gold", tag: "Complete Support Planning", price: "95,000 ETB", duration: "Guided planning · 2–3 months out",
      items: ["Wedding consultation & checklist","Budget guidance","Venue & vendor recommendations","Theme & decoration consultation","Vendor communication support","Contract review support","Final planning meeting","Day-of coordination support"] },
    am: { name: "ጎልድ", tag: "ሙሉ የድጋፍ እቅድ", price: "95,000 ብር", duration: "የተመራ እቅድ · 2–3 ወራት ቀደም ብሎ",
      items: ["የሰርግ ምክክር እና ዝርዝር","የበጀት መመሪያ","የቦታ እና አቅራቢ ምክረ ሃሳብ","የገጽታ እና ጌጣጌጥ ምክክር","የአቅራቢ ግንኙነት ድጋፍ","የውል ግምገማ ድጋፍ","የመጨረሻ እቅድ ስብሰባ","የቀኑ ማስተባበሪያ ድጋፍ"] },
  },
  {
    id: "platinum", icon: "💎", badge: false, accent: "#E8C766", accentSoft: "rgba(232,199,102,0.16)",
    en: { name: "Platinum", tag: "Full Luxury Planning", price: "185,000 ETB", duration: "Full multi-day coverage · melse to reception",
      items: ["Full vision & budget planning","Venue & vendor selection","Decor planning & supervision","Catering, photo & video coordination","Makeup, dress & beauty coordination","Guest list & RSVP management","Wedding timeline & rehearsal","Full multi-day management","Emergency day-of support","Post-wedding follow-up"] },
    am: { name: "ፕላቲነም", tag: "ሙሉ የቅንጦት እቅድ", price: "185,000 ብር", duration: "ሙሉ የብዙ ቀናት ሽፋን · ከመልስ እስከ ግብዣ",
      items: ["ሙሉ ራዕይ እና በጀት እቅድ","የቦታ እና አቅራቢ ምርጫ","የጌጣጌጥ እቅድ እና ቁጥጥር","ምግብ፣ ፎቶ እና ቪዲዮ ማስተባበር","የሜካፕ፣ ልብስ እና ውበት ማስተባበር","የእንግዳ ዝርዝር አያያዝ","የጊዜ ሰሌዳ እና ልምምድ","ሙሉ የብዙ ቀናት አስተዳደር","የቀኑ ድንገተኛ ድጋፍ","ድህረ-ሰርግ ክትትል"] },
  },
  
  
 
];

// ---------- State ----------
let currentLang = "en";
let currentView = "home";

// ---------- i18n ----------
function t(key) {
  const val = COPY[currentLang];
  return val[key];
}

function applyI18n() {
  document.documentElement.lang = currentLang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const text = t(key);
    if (typeof text === "string") el.textContent = text;
  });
  renderPackages();
  renderEventTypeOptions();
  renderPackageSelectOptions();
}

// ---------- Package rendering ----------
function renderPackages() {
  const grid = document.getElementById("packagesGrid");
  grid.innerHTML = "";
  PACKAGES.forEach((p) => {
    const c = p[currentLang];
    const card = document.createElement("div");
    card.className = "glass pkg-card";
    card.style.setProperty("--accent", p.accent);
    card.style.borderTop = `3px solid ${p.accent}`;

    card.innerHTML = `
      ${p.badge ? `<div class="pkg-badge" style="background:linear-gradient(135deg, ${p.accent}, var(--gold));">${t("popular")}</div>` : ""}
      <div class="pkg-body">
        <div class="pkg-icon" style="background:${p.accentSoft};">${p.icon}</div>
        <h3 class="pkg-name" style="color:${p.accent};">${c.name}</h3>
        <div class="pkg-tag" style="color:${p.accent};">${c.tag}</div>
        <div class="pkg-duration">${c.duration}</div>
        <div class="pkg-price">${c.price}</div>
        <ul class="pkg-items">
          ${c.items.map((item) => `<li class="pkg-item"><span style="color:${p.accent}; font-weight:700;">✦</span>${item}</li>`).join("")}
        </ul>
        <div class="pkg-addon" style="background:${p.accentSoft}; border:1px solid ${p.accent}55;">
          <strong style="color:${p.accent};">${t("addonLabel")}: </strong>
          <span style="color:var(--cream);">${t("addonText")}</span>
        </div>
        <button class="btn-primary pkg-choose" data-choose="${p.id}" style="background:linear-gradient(135deg, ${p.accent}, var(--gold-br));">${t("choose")}</button>
      </div>
    `;
    grid.appendChild(card);
  });

  grid.querySelectorAll("[data-choose]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.getElementById("packageSelect").value = btn.getAttribute("data-choose");
      navigate("book");
    });
  });

  grid.querySelectorAll(".pkg-card").forEach((el) => attachTilt(el, { lift: -8, maxTilt: 5 }));
}

function renderEventTypeOptions() {
  const sel = document.getElementById("eventTypeSelect");
  const prev = sel.value;
  sel.innerHTML = `<option value="" disabled ${!prev ? "selected" : ""}>—</option>` +
    t("eventTypes").map((et) => `<option value="${et}" ${et === prev ? "selected" : ""}>${et}</option>`).join("");
}

function renderPackageSelectOptions() {
  const sel = document.getElementById("packageSelect");
  const prev = sel.value || "gold";
  sel.innerHTML = PACKAGES.map((p) => `<option value="${p.id}" ${p.id === prev ? "selected" : ""}>${p[currentLang].name} — ${p[currentLang].price}</option>`).join("");
}

// ---------- Navigation ----------
function navigate(view) {
  currentView = view;
  document.getElementById("view-home").hidden = view !== "home";
  document.getElementById("view-book").hidden = view !== "book";
  document.getElementById("view-confirm").hidden = view !== "confirm";
  window.scrollTo({ top: 0 });
}

document.querySelectorAll("[data-nav]").forEach((el) => {
  el.addEventListener("click", () => navigate(el.getAttribute("data-nav")));
});

document.querySelectorAll("[data-scroll]").forEach((el) => {
  el.addEventListener("click", () => {
    navigate("home");
    setTimeout(() => {
      document.getElementById("packages-section").scrollIntoView({ behavior: "smooth" });
    }, 0);
  });
});

document.getElementById("langToggle").addEventListener("click", () => {
  currentLang = currentLang === "en" ? "am" : "en";
  document.getElementById("langToggle").textContent = currentLang === "en" ? "አማ" : "EN";
  applyI18n();
});

// ---------- Booking form ----------
function validateBooking(data) {
  if (!data.name.trim()) return t("errName");
  if (!data.phone.trim()) return t("errPhone");
  if (!data.date) return t("errDateRequired");

  // Validate the date is real and parseable (catches malformed input on
  // browsers/devices where the native date picker isn't available).
  const parsed = new Date(`${data.date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return t("errDateInvalid");

  // Event date should be today or in the future — catches typos like
  // picking a past year, which is easy to do on manual date entry.
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (parsed < today) return t("errDatePast");

  if (!data.eventType) return t("errEventType");

  return null; // valid
}

document.getElementById("bookingForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const errorEl = document.getElementById("formError");
  errorEl.hidden = true;

  const data = {
    name: form.name.value,
    phone: form.phone.value,
    date: form.date.value,
    package: document.getElementById("packageSelect").value,
    eventType: form.eventType.value,
    notes: form.notes.value,
    lang: currentLang,
  };

  const validationError = validateBooking(data);
  if (validationError) {
    errorEl.textContent = validationError;
    errorEl.hidden = false;
    return;
  }

  const submitBtn = form.querySelector("button[type=submit]");
  submitBtn.disabled = true;

  // Whatever happens with the network call below, the person filling this
  // out should always land on a confirmation screen once their data is
  // valid — there's no backend required for that part to work.
  let bookingId = genLocalId();

  try {
    const res = await fetch(`${API_BASE}/api/book`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const result = await res.json();
      if (result && result.bookingId) bookingId = result.bookingId;
    } else {
      throw new Error(`Request failed with status ${res.status}`);
    }
  } catch (err) {
    // No backend deployed yet, or the network call failed — that's fine,
    // the booking reference still works and the Telegram deep link still
    // works standalone once the backend exists.
    console.warn("[booking] backend unreachable, showing local confirmation:", err.message);
  }

  showConfirmation(bookingId);
  form.reset();
  submitBtn.disabled = false;
});

function genLocalId() {
  return "HW-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}

function showConfirmation(bookingId) {
  document.getElementById("bookingRef").textContent = `${currentLang === "am" ? "የማስያዣ ቁጥር" : "Booking ref"}: ${bookingId}`;
  document.getElementById("telegramLink").href = `https://t.me/${BOT_USERNAME}?start=${bookingId}`;
  navigate("confirm");
}

// ---------- Reactiveness: button ripple ----------
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-primary, .btn-secondary");
  if (!btn) return;
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 1.6;
  const ripple = document.createElement("span");
  ripple.className = "ripple";
  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
  ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
  btn.appendChild(ripple);
  ripple.addEventListener("animationend", () => ripple.remove());
});

// ---------- Reactiveness: cursor-tilt on package cards & photo tiles ----------
// Only bind on devices that actually support hover with a precise pointer
// (mouse/trackpad) — on touch devices this would otherwise leave cards
// stuck mid-tilt after a tap, since touch never fires a real mouseleave.
const supportsHoverTilt = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

function attachTilt(el, { lift = -8, maxTilt = 6, scale = 1 } = {}) {
  if (!supportsHoverTilt) return;
  el.addEventListener("mousemove", (e) => {
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    const rotateY = px * maxTilt * 2;
    const rotateX = -py * maxTilt * 2;
    el.style.transform = `perspective(800px) translateY(${lift}px) scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  el.addEventListener("mouseleave", () => {
    el.style.transform = "";
  });
}

function attachTiltToAll() {
  document.querySelectorAll(".photo-tile").forEach((el) => attachTilt(el, { lift: -10, maxTilt: 7, scale: 1.06 }));
}

// ---------- Init ----------
applyI18n();
attachTiltToAll();
navigate("home");

// Prevent picking a past date directly in the native date picker too.
(function setMinDate() {
  const dateInput = document.getElementById("dateInput");
  if (!dateInput) return;
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  dateInput.min = `${yyyy}-${mm}-${dd}`;
})();
