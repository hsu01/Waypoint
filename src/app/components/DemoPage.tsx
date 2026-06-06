import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin, Users, Calendar, MessageSquare, User, ArrowLeft,
  CheckCircle, ChevronRight, Send, X, Bell, Search, LogOut
} from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────

const CLUBS = [
  { id: 1, name: "ACM — Computing Club", members: 120, category: "Technology", emoji: "💻" },
  { id: 2, name: "SHPE — Society of Hispanic Engineers", members: 85, category: "Engineering", emoji: "⚙️" },
  { id: 3, name: "Robotics Club", members: 60, category: "Engineering", emoji: "🤖" },
  { id: 4, name: "Photography Society", members: 45, category: "Arts", emoji: "📷" },
  { id: 5, name: "Hiking & Outdoors Club", members: 200, category: "Recreation", emoji: "🏔️" },
];

const NEARBY = [
  { id: 1, name: "Amy Lin", club: "ACM Club", location: "EEB Building", dist: "2 min away", status: "Studying", initials: "AL", color: "#F4BFDB" },
  { id: 2, name: "Ben Torres", club: "Robotics Club", location: "CSE Building", dist: "5 min away", status: "Working on project", initials: "BT", color: "#B27092" },
  { id: 3, name: "Lila Reyes", club: "SHPE", location: "HUB Lobby", dist: "8 min away", status: "Getting coffee", initials: "LR", color: "#DDF3E3" },
  { id: 4, name: "David Kim", club: "ACM Club", location: "Odegaard Library", dist: "12 min away", status: "Available to chat", initials: "DK", color: "#F4BFDB" },
];

const EVENTS = [
  { id: 1, name: "ACM Tech Talk: AI in Design", date: "Today, 4:00 PM", location: "CSE 305", spots: 12, emoji: "🤖", registered: false },
  { id: 2, name: "SHPE Networking Night", date: "Fri, June 6 · 6:00 PM", location: "HUB Ballroom", spots: 50, emoji: "🌟", registered: false },
  { id: 3, name: "Photography Walk: Campus", date: "Sat, June 7 · 10:00 AM", location: "Red Square", spots: 20, emoji: "📷", registered: false },
  { id: 4, name: "Study Group: CSE 340", date: "Thu, June 5 · 7:00 PM", location: "Allen Library", spots: 8, emoji: "📚", registered: false },
];

// ── Screens ───────────────────────────────────────────────────────────────────

type Screen =
  | "login"
  | "home"
  | "clubs"
  | "checkin"
  | "nearby"
  | "messaging"
  | "events"
  | "profile";

interface AppState {
  loggedIn: boolean;
  checkedIn: boolean;
  checkInLocation: string;
  registeredEvents: number[];
  messageSent: number | null;
  messageText: string;
  myClubs: number[];
}

const initialState: AppState = {
  loggedIn: false,
  checkedIn: false,
  checkInLocation: "",
  registeredEvents: [],
  messageSent: null,
  messageText: "",
  myClubs: [1, 2],
};

// ── Kiosk Shell ───────────────────────────────────────────────────────────────

function KioskShell({ screen, onNav, children }: {
  screen: Screen;
  onNav: (s: Screen) => void;
  children: React.ReactNode;
}) {
  const navItems: { id: Screen; icon: React.ReactNode; label: string }[] = [
    { id: "home", icon: <MapPin size={24} />, label: "Home" },
    { id: "clubs", icon: <Users size={24} />, label: "Clubs" },
    { id: "nearby", icon: <Search size={24} />, label: "Nearby" },
    { id: "events", icon: <Calendar size={24} />, label: "Events" },
    { id: "profile", icon: <User size={24} />, label: "Profile" },
  ];

  return (
    <div className="flex h-full" style={{ background: "#1a0d12" }}>
      {/* Left Sidebar Navigation */}
      {screen !== "login" && (
        <div
          className="flex flex-col w-72 flex-shrink-0"
          style={{ background: "#512D38", borderRight: "2px solid rgba(244,191,219,0.2)" }}
        >
          {/* Logo */}
          <div className="px-6 py-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "#F4BFDB" }}>
                <MapPin size={24} style={{ color: "#512D38" }} />
              </div>
              <div>
                <div style={{ fontFamily: "Poppins, sans-serif", color: "white", fontWeight: 700, fontSize: 20 }}>WayPoint</div>
                <div style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.5)", fontSize: 12 }}>
                  UW Campus
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 px-4 py-6 flex flex-col gap-2">
            {navItems.map((n) => (
              <button
                key={n.id}
                onClick={() => onNav(n.id)}
                className="flex items-center gap-4 px-5 py-4 rounded-xl transition-all"
                style={{
                  background: screen === n.id ? "rgba(244,191,219,0.25)" : "transparent",
                  color: screen === n.id ? "#F4BFDB" : "rgba(255,255,255,0.6)",
                  border: screen === n.id ? "1px solid rgba(244,191,219,0.4)" : "1px solid transparent",
                }}
              >
                {n.icon}
                <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 16, fontWeight: screen === n.id ? 600 : 500 }}>
                  {n.label}
                </span>
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-white/10">
            <div className="flex items-center gap-2">
              <Bell size={18} style={{ color: "rgba(255,255,255,0.5)" }} />
              <span style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.5)", fontSize: 13 }}>
                Notifications
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col" style={{ background: "#FFF9FC" }}>
        {/* Top Header Bar */}
        {screen !== "login" && (
          <div
            className="flex items-center justify-between px-8 py-5 flex-shrink-0"
            style={{ background: "white", borderBottom: "1px solid rgba(81,45,56,0.08)" }}
          >
            <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: "#512D38", fontSize: 24 }}>
              {screen === "home" && "Dashboard"}
              {screen === "clubs" && "My Clubs"}
              {screen === "checkin" && "Check In"}
              {screen === "nearby" && "Nearby Friends"}
              {screen === "messaging" && "Messages"}
              {screen === "events" && "Events"}
              {screen === "profile" && "Profile"}
            </h2>
            <div className="flex items-center gap-3">
              <span style={{ fontFamily: "Inter, sans-serif", color: "#717182", fontSize: 14 }}>
                University of Washington
              </span>
            </div>
          </div>
        )}

        {/* Screen Content */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={screen}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ── Login Screen ──────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [netid, setNetid] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!netid) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 1000);
  };

  return (
    <div className="flex items-center justify-center h-full p-8" style={{ background: "linear-gradient(135deg, #FFF9FC 0%, #F8F4F6 100%)" }}>
      <div className="w-full max-w-md">
        <div
          className="w-24 h-24 rounded-3xl flex items-center justify-center mb-8 mx-auto"
          style={{ background: "#512D38" }}
        >
          <MapPin size={48} style={{ color: "#F4BFDB" }} />
        </div>
        <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: "#2B2B2B", fontSize: 42, marginBottom: 12, textAlign: "center" }}>
          Welcome to WayPoint
        </h1>
        <p style={{ fontFamily: "Inter, sans-serif", color: "#717182", fontSize: 17, marginBottom: 48, textAlign: "center", lineHeight: 1.5 }}>
          Sign in with your UW NetID to connect with your campus community
        </p>

        <div className="w-full flex flex-col gap-4">
          <input
            value={netid}
            onChange={(e) => setNetid(e.target.value)}
            placeholder="UW NetID (e.g. jsmith23)"
            className="w-full px-6 py-4 rounded-2xl border outline-none"
            style={{
              fontFamily: "Inter, sans-serif", fontSize: 16,
              borderColor: "rgba(81,45,56,0.2)", color: "#2B2B2B",
              background: "white",
            }}
          />
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Password"
            className="w-full px-6 py-4 rounded-2xl border outline-none"
            style={{
              fontFamily: "Inter, sans-serif", fontSize: 16,
              borderColor: "rgba(81,45,56,0.2)", color: "#2B2B2B",
              background: "white",
            }}
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogin}
            className="w-full py-5 rounded-2xl font-semibold flex items-center justify-center gap-3"
            style={{ background: "#512D38", color: "white", fontFamily: "Poppins, sans-serif", fontSize: 18 }}
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full"
              />
            ) : (
              <>Sign In <ChevronRight size={20} /></>
            )}
          </motion.button>
        </div>

        <p style={{ fontFamily: "Inter, sans-serif", color: "rgba(113,113,130,0.6)", fontSize: 14, marginTop: 32, textAlign: "center" }}>
          Use your UW credentials · Privacy protected
        </p>
      </div>
    </div>
  );
}

// ── Home Screen ───────────────────────────────────────────────────────────────

function HomeScreen({ state, onNav }: { state: AppState; onNav: (s: Screen) => void }) {
  const quickActions = [
    { screen: "checkin" as Screen, icon: <MapPin size={28} />, label: "Check In", color: "#512D38" },
    { screen: "nearby" as Screen, icon: <Users size={28} />, label: "Nearby", color: "#B27092" },
    { screen: "events" as Screen, icon: <Calendar size={28} />, label: "Events", color: "#F4BFDB" },
    { screen: "messaging" as Screen, icon: <MessageSquare size={28} />, label: "Message", color: "#DDF3E3" },
  ];

  return (
    <div className="p-8">
      {/* Welcome Banner */}
      <div
        className="rounded-3xl p-8 mb-8"
        style={{ background: "linear-gradient(135deg, #512D38, #7a3f52)" }}
      >
        <p style={{ fontFamily: "Inter, sans-serif", color: "#F4BFDB", fontSize: 15, marginBottom: 8 }}>Good afternoon 👋</p>
        <h2 style={{ fontFamily: "Poppins, sans-serif", color: "white", fontWeight: 700, fontSize: 32 }}>Welcome, Finder!</h2>
        {state.checkedIn && (
          <div
            className="mt-4 flex items-center gap-2 px-4 py-2 rounded-full w-fit"
            style={{ background: "rgba(221,243,227,0.25)" }}
          >
            <CheckCircle size={16} style={{ color: "#DDF3E3" }} />
            <span style={{ fontFamily: "Inter, sans-serif", color: "#DDF3E3", fontSize: 14 }}>
              Checked in · {state.checkInLocation}
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Left Column */}
        <div>
          {/* Quick actions */}
          <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: "#2B2B2B", fontSize: 20, marginBottom: 16 }}>Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {quickActions.map((a) => (
              <button
                key={a.label}
                onClick={() => onNav(a.screen)}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl"
                style={{ background: "#F8F4F6" }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: a.color, color: a.color === "#F4BFDB" || a.color === "#DDF3E3" ? "#512D38" : "white" }}
                >
                  {a.icon}
                </div>
                <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 15, color: "#2B2B2B", fontWeight: 600 }}>{a.label}</span>
              </button>
            ))}
          </div>

          {/* Events preview */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: "#2B2B2B", fontSize: 20 }}>Upcoming Events</h3>
              <button onClick={() => onNav("events")} style={{ fontFamily: "Inter, sans-serif", color: "#512D38", fontSize: 14, fontWeight: 500 }}>See all →</button>
            </div>
            <div className="flex flex-col gap-3">
              {EVENTS.slice(0, 2).map((ev) => (
                <div
                  key={ev.id}
                  className="p-4 rounded-2xl flex items-center gap-4"
                  style={{ background: "white", border: "1px solid rgba(81,45,56,0.08)" }}
                >
                  <span className="text-3xl">{ev.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: "#2B2B2B", fontSize: 15 }}>{ev.name}</p>
                    <p style={{ fontFamily: "Inter, sans-serif", color: "#717182", fontSize: 13, marginTop: 2 }}>{ev.date} · {ev.location}</p>
                  </div>
                  <div
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ background: "#DDF3E3", color: "#2B2B2B", fontFamily: "Inter, sans-serif" }}
                  >
                    Today
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Nearby friends */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: "#2B2B2B", fontSize: 20 }}>Nearby Friends</h3>
            <button onClick={() => onNav("nearby")} style={{ fontFamily: "Inter, sans-serif", color: "#512D38", fontSize: 14, fontWeight: 500 }}>See all →</button>
          </div>
          {NEARBY.map((f) => (
            <div
              key={f.id}
              className="flex items-center gap-4 p-5 rounded-2xl mb-3"
              style={{ background: "white", border: "1px solid rgba(81,45,56,0.08)" }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center font-bold flex-shrink-0"
                style={{ background: f.color, color: "#512D38", fontFamily: "Poppins, sans-serif", fontSize: 18 }}
              >
                {f.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: "#2B2B2B", fontSize: 16 }}>{f.name}</p>
                <p style={{ fontFamily: "Inter, sans-serif", color: "#717182", fontSize: 13 }}>{f.club}</p>
                <p style={{ fontFamily: "Inter, sans-serif", color: "#B27092", fontSize: 13, marginTop: 2 }}>
                  📍 {f.location} · {f.dist}
                </p>
              </div>
              <button
                onClick={() => onNav("messaging")}
                className="px-4 py-2 rounded-xl text-sm font-semibold"
                style={{ background: "#F8F4F6", color: "#512D38", fontFamily: "Poppins, sans-serif" }}
              >
                Say Hi
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Clubs Screen ──────────────────────────────────────────────────────────────

function ClubsScreen({ state, setState }: { state: AppState; setState: (s: AppState) => void }) {
  return (
    <div className="p-8">
      <p style={{ fontFamily: "Inter, sans-serif", color: "#717182", fontSize: 15, marginBottom: 32 }}>
        Your registered student organizations
      </p>

      <div className="grid grid-cols-2 gap-8">
        {/* My Clubs */}
        <div>
          <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: "#2B2B2B", fontSize: 20, marginBottom: 16 }}>
            My Clubs
          </h3>
          <div className="flex flex-col gap-4">
            {CLUBS.filter((c) => state.myClubs.includes(c.id)).map((club) => (
              <div
                key={club.id}
                className="p-5 rounded-2xl flex items-center gap-4"
                style={{ background: "white", border: "2px solid rgba(81,45,56,0.15)" }}
              >
                <span className="text-3xl">{club.emoji}</span>
                <div className="flex-1">
                  <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: "#2B2B2B", fontSize: 17 }}>{club.name}</p>
                  <p style={{ fontFamily: "Inter, sans-serif", color: "#717182", fontSize: 14 }}>{club.members} members · {club.category}</p>
                </div>
                <CheckCircle size={24} style={{ color: "#512D38" }} />
              </div>
            ))}
          </div>
        </div>

        {/* Suggested Clubs */}
        <div>
          <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: "#2B2B2B", fontSize: 20, marginBottom: 16 }}>
            Suggested Clubs
          </h3>
          <div className="flex flex-col gap-4">
            {CLUBS.filter((c) => !state.myClubs.includes(c.id)).map((club) => (
              <div
                key={club.id}
                className="p-5 rounded-2xl flex items-center gap-4"
                style={{ background: "#F8F4F6", border: "1px solid rgba(81,45,56,0.08)" }}
              >
                <span className="text-3xl">{club.emoji}</span>
                <div className="flex-1">
                  <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: "#2B2B2B", fontSize: 17 }}>{club.name}</p>
                  <p style={{ fontFamily: "Inter, sans-serif", color: "#717182", fontSize: 14 }}>{club.members} members · {club.category}</p>
                </div>
                <button
                  onClick={() => setState({ ...state, myClubs: [...state.myClubs, club.id] })}
                  className="px-5 py-2 rounded-xl font-semibold"
                  style={{ background: "#512D38", color: "white", fontFamily: "Poppins, sans-serif", fontSize: 14 }}
                >
                  Join
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Check In Screen ───────────────────────────────────────────────────────────

function CheckInScreen({ state, setState, onNav }: { state: AppState; setState: (s: AppState) => void; onNav: (s: Screen) => void }) {
  const locations = [
    { name: "CSE Building", emoji: "💻" },
    { name: "Odegaard Library", emoji: "📚" },
    { name: "HUB Lobby", emoji: "🏛️" },
    { name: "EEB Building", emoji: "⚡" },
    { name: "Red Square", emoji: "🏔️" },
    { name: "Allen Library", emoji: "📖" },
  ];

  const [done, setDone] = useState(false);

  const checkIn = (loc: string) => {
    setState({ ...state, checkedIn: true, checkInLocation: loc });
    setDone(true);
    setTimeout(() => onNav("nearby"), 1800);
  };

  const checkOut = () => {
    setState({ ...state, checkedIn: false, checkInLocation: "" });
    setDone(false);
  };

  if (done || state.checkedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
        >
          <CheckCircle size={96} style={{ color: "#512D38", marginBottom: 24 }} />
        </motion.div>
        <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: "#2B2B2B", fontSize: 32, marginBottom: 12 }}>
          You're Checked In!
        </h2>
        <p style={{ fontFamily: "Inter, sans-serif", color: "#717182", fontSize: 17, textAlign: "center", marginBottom: 12 }}>
          Your club members can now see you're nearby.
        </p>
        <p style={{ fontFamily: "Poppins, sans-serif", color: "#512D38", fontWeight: 600, fontSize: 24, marginBottom: 32 }}>
          📍 {state.checkInLocation}
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => onNav("nearby")}
            className="px-8 py-4 rounded-2xl font-semibold"
            style={{ background: "#512D38", color: "white", fontFamily: "Poppins, sans-serif", fontSize: 16 }}
          >
            See Nearby Friends
          </button>
          <button
            onClick={checkOut}
            className="px-8 py-4 rounded-2xl"
            style={{ background: "#F8F4F6", color: "#717182", fontFamily: "Poppins, sans-serif", fontSize: 16 }}
          >
            Check Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <p style={{ fontFamily: "Inter, sans-serif", color: "#717182", fontSize: 15, marginBottom: 24 }}>
        Where are you right now? Let your club friends find you.
      </p>

      <div className="grid grid-cols-3 gap-5">
        {locations.map((loc) => (
          <motion.button
            key={loc.name}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => checkIn(loc.name)}
            className="p-8 rounded-2xl text-center flex flex-col gap-4 items-center"
            style={{ background: "#F8F4F6", border: "1px solid rgba(81,45,56,0.1)" }}
          >
            <span className="text-5xl">{loc.emoji}</span>
            <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: "#2B2B2B", fontSize: 17 }}>
              {loc.name}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ── Nearby Screen ─────────────────────────────────────────────────────────────

function NearbyScreen({ state, onNav, onMessage }: { state: AppState; onNav: (s: Screen) => void; onMessage: (id: number) => void }) {
  return (
    <div className="p-8">
      <p style={{ fontFamily: "Inter, sans-serif", color: "#717182", fontSize: 15, marginBottom: 24 }}>
        Club peers checked in nearby right now
      </p>

      {!state.checkedIn && (
        <div
          className="mb-6 p-5 rounded-2xl flex items-center gap-4"
          style={{ background: "#F8F4F6", border: "1px solid rgba(81,45,56,0.15)" }}
        >
          <MapPin size={24} style={{ color: "#512D38" }} />
          <div className="flex-1">
            <span style={{ fontFamily: "Poppins, sans-serif", color: "#2B2B2B", fontSize: 16, fontWeight: 600 }}>
              Check in to let others see you too
            </span>
          </div>
          <button
            onClick={() => onNav("checkin")}
            className="px-6 py-3 rounded-xl font-semibold"
            style={{ background: "#512D38", color: "white", fontFamily: "Poppins, sans-serif", fontSize: 14 }}
          >
            Check In Now
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-5">
        {NEARBY.map((f) => (
          <motion.div
            key={f.id}
            whileHover={{ y: -4 }}
            className="p-6 rounded-2xl flex flex-col gap-4"
            style={{ background: "white", border: "1px solid rgba(81,45,56,0.08)", boxShadow: "0 4px 12px rgba(81,45,56,0.06)" }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center font-bold flex-shrink-0"
                style={{ background: f.color, color: "#512D38", fontFamily: "Poppins, sans-serif", fontSize: 20 }}
              >
                {f.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: "#2B2B2B", fontSize: 18 }}>{f.name}</p>
                <p style={{ fontFamily: "Inter, sans-serif", color: "#717182", fontSize: 14 }}>{f.club}</p>
              </div>
            </div>
            <div>
              <p style={{ fontFamily: "Inter, sans-serif", color: "#B27092", fontSize: 14, marginBottom: 4 }}>
                📍 {f.location} · {f.dist}
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", color: "#717182", fontSize: 13, fontStyle: "italic" }}>
                "{f.status}"
              </p>
            </div>
            <button
              onClick={() => onMessage(f.id)}
              className="w-full px-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
              style={{ background: "#F8F4F6", color: "#512D38", fontFamily: "Poppins, sans-serif", fontSize: 14 }}
            >
              <MessageSquare size={16} /> Send Message
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Messaging Screen ──────────────────────────────────────────────────────────

function MessagingScreen({ state, setState, targetId }: { state: AppState; setState: (s: AppState) => void; targetId: number | null }) {
  const [text, setText] = useState(state.messageText);
  const [sent, setSent] = useState(state.messageSent !== null);
  const target = NEARBY.find((f) => f.id === targetId) ?? NEARBY[0];

  const send = () => {
    if (!text.trim()) return;
    setState({ ...state, messageSent: target.id, messageText: text });
    setSent(true);
  };

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-200">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center font-bold"
            style={{ background: target.color, color: "#512D38", fontFamily: "Poppins, sans-serif", fontSize: 20 }}
          >
            {target.initials}
          </div>
          <div>
            <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: "#2B2B2B", fontSize: 22 }}>{target.name}</h3>
            <p style={{ fontFamily: "Inter, sans-serif", color: "#717182", fontSize: 15 }}>{target.club} · {target.dist}</p>
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 mb-6 overflow-y-auto">
          {sent ? (
            <div className="flex flex-col gap-5">
              <div className="flex justify-end">
                <div
                  className="px-6 py-4 rounded-3xl rounded-tr-sm max-w-lg"
                  style={{ background: "#512D38", color: "white", fontFamily: "Inter, sans-serif", fontSize: 16 }}
                >
                  {text}
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex justify-start"
              >
                <div
                  className="px-6 py-4 rounded-3xl rounded-tl-sm max-w-lg"
                  style={{ background: "#F8F4F6", color: "#2B2B2B", fontFamily: "Inter, sans-serif", fontSize: 16 }}
                >
                  Hey! That sounds great, see you in a bit 😊
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-center mt-4"
              >
                <div
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full"
                  style={{ background: "#DDF3E3", color: "#2B2B2B", fontFamily: "Inter, sans-serif", fontSize: 14 }}
                >
                  <CheckCircle size={16} /> Message delivered · Check your UW email
                </div>
              </motion.div>
            </div>
          ) : (
            <div
              className="flex flex-col items-center justify-center h-full"
              style={{ minHeight: 240 }}
            >
              <MessageSquare size={64} style={{ color: "#E8D5DC", marginBottom: 16 }} />
              <p style={{ fontFamily: "Inter, sans-serif", color: "#B27092", fontSize: 17, textAlign: "center" }}>
                Send a low-pressure message to reconnect
              </p>
            </div>
          )}
        </div>

        {/* Quick messages */}
        {!sent && (
          <div className="flex flex-wrap gap-3 mb-5">
            {["Hey! Want to study together?", "Are you free right now?", "Heading to the HUB!"].map((q) => (
              <button
                key={q}
                onClick={() => setText(q)}
                className="px-5 py-3 rounded-2xl"
                style={{ background: "#F8F4F6", color: "#512D38", fontFamily: "Inter, sans-serif", border: "1px solid rgba(81,45,56,0.1)", fontSize: 14 }}
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        {!sent && (
          <div className="flex gap-3">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write a message..."
              className="flex-1 px-6 py-4 rounded-2xl outline-none"
              style={{
                fontFamily: "Inter, sans-serif", fontSize: 16,
                border: "1px solid rgba(81,45,56,0.2)", background: "white", color: "#2B2B2B",
              }}
              onKeyDown={(e) => e.key === "Enter" && send()}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={send}
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: "#512D38", color: "white" }}
            >
              <Send size={20} />
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Events Screen ─────────────────────────────────────────────────────────────

function EventsScreen({ state, setState }: { state: AppState; setState: (s: AppState) => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState<number | null>(null);

  const register = (id: number) => {
    setState({ ...state, registeredEvents: [...state.registeredEvents, id] });
    setConfirmed(id);
    setTimeout(() => { setConfirmed(null); setSelected(null); }, 1800);
  };

  const unregister = (id: number) => {
    setState({ ...state, registeredEvents: state.registeredEvents.filter((e) => e !== id) });
  };

  return (
    <div className="p-8">
      <p style={{ fontFamily: "Inter, sans-serif", color: "#717182", fontSize: 15, marginBottom: 24 }}>
        Upcoming events from your clubs and campus
      </p>

      <div className="grid grid-cols-2 gap-5">
        {EVENTS.map((ev) => {
          const isRegistered = state.registeredEvents.includes(ev.id);
          const isConfirmed = confirmed === ev.id;

          return (
            <motion.div
              key={ev.id}
              layout
              className="rounded-2xl overflow-hidden"
              style={{ background: "white", border: "1px solid rgba(81,45,56,0.1)", boxShadow: "0 4px 16px rgba(81,45,56,0.06)" }}
            >
              <div
                className="p-6 flex flex-col gap-3 cursor-pointer"
                onClick={() => setSelected(selected === ev.id ? null : ev.id)}
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{ev.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: "#2B2B2B", fontSize: 18 }}>
                      {ev.name}
                    </p>
                    <p style={{ fontFamily: "Inter, sans-serif", color: "#717182", fontSize: 14, marginTop: 4 }}>
                      {ev.date}
                    </p>
                    <p style={{ fontFamily: "Inter, sans-serif", color: "#717182", fontSize: 14, marginTop: 2 }}>
                      📍 {ev.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  {isRegistered ? (
                    <div
                      className="px-3 py-1.5 rounded-full font-semibold"
                      style={{ background: "#DDF3E3", color: "#2B2B2B", fontFamily: "Poppins, sans-serif", fontSize: 13 }}
                    >
                      ✓ RSVP'd
                    </div>
                  ) : (
                    <div
                      className="px-3 py-1.5 rounded-full"
                      style={{ background: "#F8F4F6", color: "#717182", fontFamily: "Inter, sans-serif", fontSize: 13 }}
                    >
                      {ev.spots} spots available
                    </div>
                  )}
                </div>
              </div>

              <AnimatePresence>
                {selected === ev.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div
                      className="px-6 pb-6"
                      style={{ borderTop: "1px solid rgba(81,45,56,0.08)" }}
                    >
                      <div style={{ paddingTop: 16 }}>
                        {isConfirmed ? (
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex items-center gap-2"
                            style={{ color: "#512D38", fontFamily: "Poppins, sans-serif", fontSize: 16, fontWeight: 600 }}
                          >
                            <CheckCircle size={20} /> You're registered!
                          </motion.div>
                        ) : isRegistered ? (
                          <button
                            onClick={() => unregister(ev.id)}
                            className="px-5 py-2.5 rounded-xl"
                            style={{ background: "#F8F4F6", color: "#717182", fontFamily: "Inter, sans-serif", fontSize: 14 }}
                          >
                            Cancel Registration
                          </button>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => register(ev.id)}
                            className="w-full px-6 py-3 rounded-xl font-semibold"
                            style={{ background: "#512D38", color: "white", fontFamily: "Poppins, sans-serif", fontSize: 15 }}
                          >
                            Register Now
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ── Profile Screen ────────────────────────────────────────────────────────────

function ProfileScreen({ state, onLogout }: { state: AppState; onLogout: () => void }) {
  return (
    <div className="p-8">
      <div className="grid grid-cols-3 gap-8">
        {/* Profile column */}
        <div>
          {/* Profile header */}
          <div
            className="rounded-3xl p-8 mb-6 flex flex-col items-center"
            style={{ background: "linear-gradient(135deg, #512D38, #7a3f52)" }}
          >
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center font-bold mb-4"
              style={{ background: "#F4BFDB", color: "#512D38", fontFamily: "Poppins, sans-serif", fontSize: 32 }}
            >
              JS
            </div>
            <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: "white", fontSize: 24 }}>Jordan Smith</h3>
            <p style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.7)", fontSize: 15, marginTop: 4 }}>jsmith23@uw.edu</p>
            <p style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.6)", fontSize: 14, marginTop: 4 }}>
              Computer Science · Junior
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-col gap-3">
            {[
              { val: state.myClubs.length, label: "Clubs Joined" },
              { val: state.registeredEvents.length, label: "Events Registered" },
              { val: state.checkedIn ? "Active" : "Offline", label: "Current Status" },
            ].map((s) => (
              <div
                key={s.label}
                className="p-5 rounded-2xl flex items-center justify-between"
                style={{ background: "#F8F4F6" }}
              >
                <div style={{ fontFamily: "Inter, sans-serif", color: "#717182", fontSize: 14 }}>{s.label}</div>
                <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: "#512D38", fontSize: 24 }}>{s.val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings columns */}
        <div className="col-span-2">
          <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: "#2B2B2B", fontSize: 20, marginBottom: 16 }}>
            Settings & Preferences
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "My Clubs", sub: `${state.myClubs.length} clubs joined`, emoji: "👥" },
              { label: "Privacy Settings", sub: "Who can see your location", emoji: "🔒" },
              { label: "Notification Preferences", sub: "Manage alerts", emoji: "🔔" },
              { label: "Help & Support", sub: "FAQ and contact", emoji: "💬" },
            ].map((item) => (
              <div
                key={item.label}
                className="p-5 rounded-2xl flex items-start gap-4"
                style={{ background: "white", border: "1px solid rgba(81,45,56,0.08)" }}
              >
                <span className="text-2xl">{item.emoji}</span>
                <div className="flex-1">
                  <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: "#2B2B2B", fontSize: 16 }}>{item.label}</p>
                  <p style={{ fontFamily: "Inter, sans-serif", color: "#717182", fontSize: 14, marginTop: 4 }}>{item.sub}</p>
                </div>
                <ChevronRight size={18} style={{ color: "#717182" }} />
              </div>
            ))}
          </div>

          <button
            onClick={onLogout}
            className="p-5 rounded-2xl flex items-center gap-4 w-full mt-6"
            style={{ background: "#FFF9FC", border: "2px solid rgba(178,112,146,0.3)" }}
          >
            <LogOut size={20} style={{ color: "#B27092" }} />
            <span style={{ fontFamily: "Poppins, sans-serif", color: "#B27092", fontSize: 16, fontWeight: 600 }}>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Demo Page ─────────────────────────────────────────────────────────────────

export function DemoPage() {
  const [screen, setScreen] = useState<Screen>("login");
  const [appState, setAppState] = useState<AppState>(initialState);
  const [messageTarget, setMessageTarget] = useState<number | null>(1);

  const handleLogin = () => setScreen("home");
  const handleLogout = () => {
    setScreen("login");
    setAppState(initialState);
  };

  const handleMessage = (id: number) => {
    setMessageTarget(id);
    setScreen("messaging");
  };

  const renderScreen = () => {
    switch (screen) {
      case "login":
        return <LoginScreen onLogin={handleLogin} />;
      case "home":
        return <HomeScreen state={appState} onNav={setScreen} />;
      case "clubs":
        return <ClubsScreen state={appState} setState={setAppState} />;
      case "checkin":
        return <CheckInScreen state={appState} setState={setAppState} onNav={setScreen} />;
      case "nearby":
        return <NearbyScreen state={appState} onNav={setScreen} onMessage={handleMessage} />;
      case "messaging":
        return <MessagingScreen state={appState} setState={setAppState} targetId={messageTarget} />;
      case "events":
        return <EventsScreen state={appState} setState={setAppState} />;
      case "profile":
        return <ProfileScreen state={appState} onLogout={handleLogout} />;
      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-8"
      style={{ background: "linear-gradient(135deg, #2a1219 0%, #512D38 60%, #7a3f52 100%)" }}
    >
      {/* Back link */}
      <div className="w-full max-w-6xl mb-4">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm"
          style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Inter, sans-serif", textDecoration: "none" }}
        >
          <ArrowLeft size={14} /> Back to WayPoint
        </a>
      </div>

      <div className="text-center mb-8">
        <h1
          style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: "white", fontSize: 32, marginBottom: 8 }}
        >
          WayPoint Interactive Kiosk
        </h1>
        <p style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.7)", fontSize: 16 }}>
          Digital Prototype Demo · CSE 440 · Team Mango
        </p>
      </div>

      {/* Landscape Kiosk frame */}
      <div
        className="relative rounded-3xl overflow-hidden"
        style={{
          width: "100%",
          maxWidth: 1280,
          height: 720,
          boxShadow: "0 40px 120px rgba(0,0,0,0.6), 0 0 0 3px rgba(244,191,219,0.25), inset 0 0 60px rgba(81,45,56,0.2)",
          background: "#FFF9FC",
        }}
      >
        <KioskShell screen={screen} onNav={setScreen}>
          {renderScreen()}
        </KioskShell>
      </div>

      {/* Screen selector */}
      {screen !== "login" && (
        <div className="mt-8 flex flex-wrap justify-center gap-3 max-w-4xl">
          {(["home", "clubs", "checkin", "nearby", "messaging", "events", "profile"] as Screen[]).map((s) => (
            <button
              key={s}
              onClick={() => setScreen(s)}
              className="px-5 py-2.5 rounded-full text-sm capitalize transition-all"
              style={{
                background: screen === s ? "#F4BFDB" : "rgba(255,255,255,0.1)",
                color: screen === s ? "#512D38" : "rgba(255,255,255,0.7)",
                fontFamily: "Poppins, sans-serif",
                fontWeight: screen === s ? 600 : 500,
                border: screen === s ? "2px solid #F4BFDB" : "1px solid rgba(255,255,255,0.15)",
              }}
            >
              {s === "checkin" ? "Check In" : s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
