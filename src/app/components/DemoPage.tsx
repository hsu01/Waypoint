import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin, Users, Calendar, MessageSquare, User, ArrowLeft,
  CheckCircle, ChevronRight, Send, LogOut,
  Home, Heart, BookOpen
} from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────

const UW_IMAGES = {
  redSquare: "https://commons.wikimedia.org/wiki/Special:Redirect/file/UW_Red_Square.jpg?width=500",
  suzzallo: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Entrance%20of%20Suzzallo%20Library.jpg?width=500",
  cherryBlossoms: "https://commons.wikimedia.org/wiki/Special:Redirect/file/University%20of%20Washington%20Cherry%20Blossoms%20%2833670653331%29.jpg?width=500",
  kaneHall: "https://commons.wikimedia.org/wiki/Special:Redirect/file/UW_kanehall.jpg?width=500",
  hub: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Students%20bowling%20in%20Husky%20Union%20Building%20%28HUB%29%2C%20University%20of%20Washington%20%284476181533%29.jpg?width=500",
};

const CLUBS = [
  { id: 1, name: "ACM — Computing Club", members: 120, category: "Technology", emoji: "💻", image: UW_IMAGES.kaneHall },
  { id: 2, name: "SHPE — Society of Hispanic Engineers", members: 85, category: "Engineering", emoji: "⚙️", image: UW_IMAGES.redSquare },
  { id: 3, name: "Robotics Club", members: 60, category: "Engineering", emoji: "🤖", image: UW_IMAGES.suzzallo },
  { id: 4, name: "Photography Society", members: 45, category: "Arts", emoji: "📷", image: UW_IMAGES.cherryBlossoms },
  { id: 5, name: "Hiking & Outdoors Club", members: 200, category: "Recreation", emoji: "🏔️", image: UW_IMAGES.redSquare },
];

const NEARBY = [
  { id: 1, name: "Emily", club: "Women in Computing", location: "HUB Cafe", dist: "Same building", status: "Taking a break", initials: "E", color: "#C8C2C4", until: "3:00pm", image: UW_IMAGES.hub },
  { id: 2, name: "Noah", club: "DubHacks", location: "HUB 2nd floor", dist: "Same building", status: "Working on CS homework!", initials: "N", color: "#C8C2C4", until: "5:00pm", image: UW_IMAGES.kaneHall },
  { id: 3, name: "Lily", club: "Women in Computing", location: "Suzzallo library 1st floor", dist: "8 min away", status: "Reading for class", initials: "L", color: "#C8C2C4", until: "4:30pm", image: UW_IMAGES.suzzallo },
];

const EVENTS = [
  { id: 1, name: "Women in STEM Social", date: "Today, 1:00pm - 4:30pm", location: "HUB 2nd floor", people: "Emily, Iris,...", description: "A low-pressure mixer for STEM students to swap class tips, find project partners, and meet mentors between study sessions.", image: UW_IMAGES.hub },
  { id: 2, name: "Stand-Up Comedy Class Graduatio..", date: "Today, 5:00pm - 6:30pm", location: "HUB", people: "Josh, Alex,...", description: "Student performers share short comedy sets from their final showcase, followed by a casual reception in the HUB.", image: UW_IMAGES.hub },
  { id: 3, name: "Outdoor Movie Night", date: "Today, 8:00pm - 10:30pm", location: "Red Square", people: "Jack, Evelyn,...", description: "Bring a blanket and meet friends in Red Square for an outdoor screening, snacks, and a relaxed end-of-day hangout.", image: UW_IMAGES.redSquare },
  { id: 4, name: "DubHacks Project Meetup", date: "Today, 3:30pm - 5:00pm", location: "CSE Atrium", people: "Noah, Lily,...", description: "Hackathon teams compare prototypes, get quick feedback, and find collaborators for campus tech projects.", image: UW_IMAGES.kaneHall },
  { id: 5, name: "Coffee Chat: Women in Computing", date: "Today, 11:30am - 12:30pm", location: "Suzzallo Cafe", people: "Mina, Priya,...", description: "A small-group coffee chat for students to talk internships, classes, and building community in computing.", image: UW_IMAGES.suzzallo },
  { id: 6, name: "Design Portfolio Review", date: "Today, 2:00pm - 3:00pm", location: "Art Building", people: "Taylor, Sam,...", description: "Bring a few portfolio pieces for quick critique from peers working across design, HCI, and visual communication.", image: UW_IMAGES.cherryBlossoms },
  { id: 7, name: "Campus Trail Walk", date: "Today, 4:00pm - 5:30pm", location: "Rainier Vista", people: "Chris, Morgan,...", description: "A short guided walk from central campus with time to meet outdoor club members and plan weekend hikes.", image: UW_IMAGES.redSquare },
  { id: 8, name: "Late Night Study Group", date: "Today, 9:00pm - 11:00pm", location: "Odegaard Library", people: "Amber, Noah,...", description: "Focused work blocks for CSE and design classes with optional check-ins for anyone who wants accountability.", image: UW_IMAGES.suzzallo },
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
  checkInUntil: string;
  checkInNote: string;
  registeredEvents: number[];
  messageSent: number | null;
  messageText: string;
  myClubs: number[];
}

const initialState: AppState = {
  loggedIn: false,
  checkedIn: false,
  checkInLocation: "",
  checkInUntil: "",
  checkInNote: "",
  registeredEvents: [1],
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
    { id: "profile", icon: <User size={34} />, label: "Profile" },
    { id: "home", icon: <Home size={34} />, label: "Home" },
    { id: "clubs", icon: <Users size={34} />, label: "Clubs" },
    { id: "nearby", icon: <MapPin size={34} />, label: "Nearby" },
    { id: "events", icon: <Calendar size={34} />, label: "Events" },
  ];

  return (
    <div className="flex h-full" style={{ background: "#1F1F1F" }}>
      {/* Left Sidebar Navigation */}
      {screen !== "login" && (
        <div
          className="flex flex-col w-24 flex-shrink-0"
          style={{ background: "#5A2E3C" }}
        >
          {/* Navigation */}
          <div className="flex-1 pt-8 flex flex-col">
            {navItems.map((n) => (
              <button
                key={n.id}
                onClick={() => onNav(n.id)}
                aria-label={n.label}
                className="h-20 flex items-center justify-center transition-all"
                style={{
                  background: screen === n.id ? "rgba(255,255,255,0.18)" : "transparent",
                  color: "rgba(255,255,255,0.84)",
                }}
              >
                {n.icon}
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="h-20 flex items-center justify-center">
            <LogOut size={38} style={{ color: "#FFD439" }} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col" style={{ background: "#FFFFFF" }}>
        {/* Top Header Bar */}
        {screen !== "login" && (
          <div
            className="flex items-center justify-between px-8 py-5 flex-shrink-0"
            style={{ background: "#5A2E3C", borderBottom: "1px solid rgba(0,0,0,0.2)" }}
          >
            <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: "white", fontSize: 22 }}>
              University of Washington
            </h2>
            <span style={{ fontFamily: "Inter, sans-serif", color: "white", fontSize: 18 }}>
              Monday, Jun 1 | 10 : 00 AM
            </span>
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

function HomeScreen({ onNav }: { onNav: (s: Screen) => void }) {
  const homeCards = [
    {
      screen: "clubs" as Screen,
      icon: <Users size={34} />,
      title: "Clubs",
      body: "Review list of academic and social clubs you belong to, see member directory, browse campus recommendations, and register.",
    },
    {
      screen: "nearby" as Screen,
      icon: <MapPin size={36} />,
      title: "Nearby Friends",
      body: "Check-in at your current location, discover all the club peers in the same building, and email them instantly",
    },
    {
      screen: "events" as Screen,
      icon: <Calendar size={34} />,
      title: "Events",
      body: "View live campus events happening today, explore the full schedule across campus community",
    },
    {
      screen: "profile" as Screen,
      icon: <User size={34} />,
      title: "Profile",
      body: "Manage your personal information",
    },
  ];

  return (
    <div className="px-16 py-14">
      <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: "#111", fontSize: 28, marginBottom: 46 }}>
        Welcome, Amber!
      </h2>

      <div className="grid grid-cols-2 gap-x-28 gap-y-14 max-w-4xl">
        {homeCards.map((card) => (
          <button
            key={card.title}
            onClick={() => onNav(card.screen)}
            className="text-left rounded-2xl px-8 py-7 min-h-[132px]"
            style={{
              background: "#EFE5E7",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              color: "#111",
            }}
          >
            <div className="flex items-center gap-4 mb-4" style={{ color: "#5A2E3C" }}>
              {card.icon}
              <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: "#111", fontSize: 24 }}>
                {card.title}
              </h3>
            </div>
            <p style={{ fontFamily: "Inter, sans-serif", color: "#111", fontSize: 12, lineHeight: 1.2, maxWidth: 300 }}>
              {card.body}
            </p>
          </button>
        ))}
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
                <div
                  className="w-16 h-16 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden text-2xl"
                  style={{
                    backgroundImage: `linear-gradient(rgba(81,45,56,0.18), rgba(81,45,56,0.18)), url(${club.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    color: "white",
                    textShadow: "0 1px 4px rgba(0,0,0,0.45)",
                  }}
                >
                  {club.emoji}
                </div>
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
                <div
                  className="w-16 h-16 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden text-2xl"
                  style={{
                    backgroundImage: `linear-gradient(rgba(81,45,56,0.16), rgba(81,45,56,0.16)), url(${club.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    color: "white",
                    textShadow: "0 1px 4px rgba(0,0,0,0.45)",
                  }}
                >
                  {club.emoji}
                </div>
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
    setState({
      ...state,
      checkedIn: true,
      checkInLocation: loc,
      checkInUntil: "4:30pm",
      checkInNote: "Working on CSE440 Homework",
    });
    setDone(true);
    setTimeout(() => onNav("nearby"), 1800);
  };

  const checkOut = () => {
    setState({ ...state, checkedIn: false, checkInLocation: "", checkInUntil: "", checkInNote: "" });
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

function NearbyScreen({ state, setState, onMessage }: { state: AppState; setState: (s: AppState) => void; onMessage: (id: number) => void }) {
  const [location, setLocation] = useState(state.checkInLocation || "HUB");
  const [until, setUntil] = useState(state.checkInUntil || "");
  const [note, setNote] = useState(state.checkInNote || "");
  const checkedIn = state.checkedIn;

  const checkIn = () => {
    setState({
      ...state,
      checkedIn: true,
      checkInLocation: location || "HUB",
      checkInUntil: until || "4:30pm",
      checkInNote: note || "Working on CSE440 Homework",
    });
  };

  const checkOut = () => {
    setState({
      ...state,
      checkedIn: false,
      checkInLocation: "",
      checkInUntil: "",
      checkInNote: "",
    });
    setLocation("HUB");
    setUntil("");
    setNote("");
  };

  const sameBuilding = NEARBY.filter((f) => f.dist === "Same building");

  return (
    <div className="p-8">
      <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: "#111", fontSize: 28, marginBottom: 28 }}>
        Club Peers Check-In Nearby
      </h3>

      {!checkedIn ? (
        <div className="grid grid-cols-[0.9fr_1.4fr] gap-8">
          <div
            className="rounded-2xl p-7"
            style={{ background: "#EFE5E7", boxShadow: "0 2px 8px rgba(0,0,0,0.18)" }}
          >
            <h4 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: "#111", fontSize: 17, textAlign: "center", marginBottom: 26 }}>
              Check-in to connect with your clubs peers
            </h4>

            <label style={{ fontFamily: "Inter, sans-serif", color: "#111", fontSize: 14, fontWeight: 600 }}>
              Your location:
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full mt-2 mb-6 px-4 py-2 rounded-full outline-none"
              style={{ background: "white", border: "1px solid #B9B0B2", fontFamily: "Inter, sans-serif", color: "#512D38" }}
            >
              <option>HUB</option>
              <option>CSE Building</option>
              <option>Odegaard Library</option>
              <option>Suzzallo Library</option>
              <option>Red Square</option>
            </select>

            <label style={{ fontFamily: "Inter, sans-serif", color: "#111", fontSize: 14, fontWeight: 600 }}>
              How long will you stay?
            </label>
            <input
              value={until}
              onChange={(e) => setUntil(e.target.value)}
              placeholder="e.g. Until 4:30 pm"
              className="w-full mt-2 mb-6 px-4 py-2 rounded-full outline-none"
              style={{ background: "white", border: "1px solid #B9B0B2", fontFamily: "Inter, sans-serif", color: "#512D38" }}
            />

            <label style={{ fontFamily: "Inter, sans-serif", color: "#111", fontSize: 14, fontWeight: 600 }}>
              Check-In Activity Note:
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Working on CSE440 Homework"
              className="w-full mt-2 mb-6 px-4 py-3 rounded-2xl outline-none resize-none"
              style={{ background: "white", border: "1px solid #B9B0B2", fontFamily: "Inter, sans-serif", color: "#512D38", minHeight: 84 }}
            />

            <button
              onClick={checkIn}
              className="block mx-auto px-10 py-3 rounded-full font-semibold"
              style={{ background: "#5A2E3C", color: "white", fontFamily: "Poppins, sans-serif", fontSize: 14 }}
            >
              Check-In
            </button>
          </div>

          <div
            className="rounded-2xl flex flex-col items-center justify-center text-center p-10"
            style={{ background: "#EFE5E7", boxShadow: "0 2px 8px rgba(0,0,0,0.18)", minHeight: 380 }}
          >
            <MapPin size={58} style={{ color: "#5A2E3C", marginBottom: 28 }} />
            <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: "#111", fontSize: 22, lineHeight: 1.25, maxWidth: 360 }}>
              Please check-in to view club members nearby
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-[0.9fr_1.4fr] gap-8 items-start">
          <div
            className="rounded-2xl p-8"
            style={{ background: "#EFE5E7", boxShadow: "0 2px 8px rgba(0,0,0,0.18)" }}
          >
            <div
              className="mx-auto mb-10 px-5 py-2 rounded-md text-center"
              style={{ background: "#A8F0B0", color: "#111", fontFamily: "Poppins, sans-serif", fontWeight: 700, width: "fit-content" }}
            >
              Check-in Successful!
            </div>
            <div style={{ fontFamily: "Inter, sans-serif", color: "#111", fontSize: 15, lineHeight: 1.9 }}>
              <p>Your location: {state.checkInLocation}</p>
              <p>You Will Stay: Until {state.checkInUntil}</p>
              <p>Check-In Activity Note:</p>
              <p style={{ color: "#8B8587", fontStyle: "italic", fontSize: 13 }}>
                "{state.checkInNote}"
              </p>
            </div>
            <button
              onClick={checkOut}
              className="block mx-auto mt-8 px-10 py-3 rounded-full font-semibold"
              style={{ background: "#5A2E3C", color: "white", fontFamily: "Poppins, sans-serif", fontSize: 14 }}
            >
              Check-Out
            </button>
          </div>

          <div>
            <div className="flex justify-center gap-4 mb-5">
              <button
                className="px-16 py-3 rounded-xl font-semibold"
                style={{ background: "#5A2E3C", color: "white", fontFamily: "Poppins, sans-serif", boxShadow: "0 2px 6px rgba(0,0,0,0.18)" }}
              >
                All ({NEARBY.length})
              </button>
              <button
                className="px-10 py-3 rounded-xl font-semibold"
                style={{ background: "#EFE5E7", color: "#111", fontFamily: "Poppins, sans-serif", boxShadow: "0 2px 6px rgba(0,0,0,0.14)" }}
              >
                Same Building ({sameBuilding.length})
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {NEARBY.map((f) => (
                <motion.div
                  key={f.id}
                  whileHover={{ y: -3 }}
                  className="rounded-2xl p-5 flex items-center gap-5"
                  style={{ background: "#EFE5E7", boxShadow: "0 2px 8px rgba(0,0,0,0.18)" }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center font-bold flex-shrink-0 overflow-hidden"
                    style={{
                      backgroundImage: `linear-gradient(rgba(90,46,60,0.2), rgba(90,46,60,0.2)), url(${f.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      color: "white",
                      fontFamily: "Poppins, sans-serif",
                      fontSize: 18,
                      textShadow: "0 1px 5px rgba(0,0,0,0.7)",
                    }}
                  >
                    {f.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: "#111", fontSize: 15 }}>{f.name}</p>
                    <p style={{ fontFamily: "Inter, sans-serif", color: "#111", fontSize: 12 }}>👥 {f.club}</p>
                    <p style={{ fontFamily: "Inter, sans-serif", color: "#111", fontSize: 12 }}>📍 {f.location}</p>
                    <p style={{ fontFamily: "Inter, sans-serif", color: "#111", fontSize: 12 }}>🕒 Here until {f.until}</p>
                    <p style={{ fontFamily: "Inter, sans-serif", color: "#5A2E3C", fontSize: 12, fontStyle: "italic", marginTop: 4 }}>
                      "{f.status}"
                    </p>
                  </div>
                  <button
                    onClick={() => onMessage(f.id)}
                    className="px-8 py-3 rounded-full font-semibold"
                    style={{ background: "#5A2E3C", color: "white", fontFamily: "Poppins, sans-serif", fontSize: 12 }}
                  >
                    Message
                  </button>
                </motion.div>
              ))}
            </div>

            <button
              className="block mx-auto mt-5 underline"
              style={{ color: "#5A2E3C", fontFamily: "Inter, sans-serif", fontSize: 15 }}
            >
              View All Friends ...
            </button>
          </div>
        </div>
      )}
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
        <div
          className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-200"
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center font-bold"
            style={{
              backgroundImage: `linear-gradient(rgba(81,45,56,0.22), rgba(81,45,56,0.22)), url(${target.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: "white",
              fontFamily: "Poppins, sans-serif",
              fontSize: 20,
              textShadow: "0 1px 5px rgba(0,0,0,0.7)",
            }}
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
  const [cancelTarget, setCancelTarget] = useState<number | null>(null);
  const [view, setView] = useState<"all" | "today" | "active">("today");

  const register = (id: number) => {
    if (state.registeredEvents.includes(id)) return;
    setState({ ...state, registeredEvents: [...state.registeredEvents, id] });
  };

  const confirmCancel = () => {
    if (cancelTarget === null) return;
    setState({ ...state, registeredEvents: state.registeredEvents.filter((e) => e !== cancelTarget) });
    setCancelTarget(null);
  };

  const visibleEvents = view === "active"
    ? EVENTS.filter((ev) => state.registeredEvents.includes(ev.id))
    : EVENTS;

  return (
    <div className="relative h-full">
      <div
        className="h-full px-7 py-7 overflow-y-auto"
        style={{ filter: cancelTarget !== null ? "blur(10px)" : "none", transition: "filter 180ms ease" }}
      >
        <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: "#111", fontSize: 28, marginBottom: 22 }}>
          Campus Events
        </h2>

        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-3">
            <button
              onClick={() => setView("all")}
              className="px-12 py-3 rounded-xl font-semibold"
              style={{
                background: view === "all" ? "#5A2E3C" : "#EFE5E7",
                color: view === "all" ? "white" : "#111",
                fontFamily: "Poppins, sans-serif",
                boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
              }}
            >
              All Events ({EVENTS.length})
            </button>
            <button
              onClick={() => setView("today")}
              className="px-10 py-3 rounded-xl font-semibold"
              style={{
                background: view === "today" ? "#5A2E3C" : "#EFE5E7",
                color: view === "today" ? "white" : "#111",
                fontFamily: "Poppins, sans-serif",
                boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
              }}
            >
              Today's Events (3)
            </button>
          </div>
          <button
            onClick={() => setView("active")}
            className="px-9 py-3 rounded-xl font-semibold"
            style={{
              background: view === "active" ? "#5A2E3C" : "#EFE5E7",
              color: view === "active" ? "white" : "#111",
              fontFamily: "Poppins, sans-serif",
              boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
            }}
          >
            My Active RSVPs
          </button>
        </div>

        <p style={{ fontFamily: "Inter, sans-serif", color: "#111", fontSize: 15, fontWeight: 700, marginBottom: 12 }}>
          Today&nbsp; | &nbsp;Monday, June 1
        </p>

        <div className="flex flex-col gap-3">
          {visibleEvents.map((ev) => {
            const isRegistered = state.registeredEvents.includes(ev.id);

            return (
              <motion.div
                key={ev.id}
                layout
                className="rounded-2xl px-4 py-4 flex items-center gap-7"
                style={{ background: "#EFE5E7", boxShadow: "0 2px 7px rgba(0,0,0,0.18)" }}
              >
                <div
                  className="w-36 h-24 rounded-xl flex-shrink-0 overflow-hidden"
                  style={{
                    backgroundImage: `linear-gradient(rgba(90,46,60,0.08), rgba(90,46,60,0.08)), url(${ev.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.35)",
                  }}
                />
                <div className="flex-1 min-w-0">
                  <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: "#111", fontSize: 23, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {ev.name}
                  </h3>
                  <p style={{ fontFamily: "Inter, sans-serif", color: "#111", fontSize: 12, marginTop: 3 }}>📍 {ev.location}</p>
                  <p style={{ fontFamily: "Inter, sans-serif", color: "#111", fontSize: 12 }}>◷ {ev.date.replace("Today, ", "")}</p>
                  <p style={{ fontFamily: "Inter, sans-serif", color: "#111", fontSize: 12 }}>👥 People coming: {ev.people}</p>
                  <p style={{ fontFamily: "Inter, sans-serif", color: "#5A2E3C", fontSize: 12, fontStyle: "italic", marginTop: 10 }}>
                    "{ev.description}"
                  </p>
                </div>
                {isRegistered ? (
                  <button
                    onClick={() => setCancelTarget(ev.id)}
                    className="px-8 py-3 rounded-2xl font-semibold"
                    style={{ background: "#FCE7F0", color: "#111", border: "1px solid #8D4A64", fontFamily: "Poppins, sans-serif", fontSize: 14 }}
                  >
                    Cancel RSVP
                  </button>
                ) : (
                  <button
                    onClick={() => register(ev.id)}
                    className="px-8 py-3 rounded-2xl font-semibold"
                    style={{ background: "#5A2E3C", color: "white", fontFamily: "Poppins, sans-serif", fontSize: 14 }}
                  >
                    Add to My RSVPs
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {cancelTarget !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.16)" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              className="rounded-md px-16 py-14"
              style={{ background: "white", boxShadow: "0 3px 12px rgba(0,0,0,0.35)", width: 440 }}
            >
              <p style={{ fontFamily: "Poppins, sans-serif", color: "#111", fontSize: 22, fontWeight: 700, textAlign: "center", marginBottom: 38 }}>
                Do you want to cancel this event?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setCancelTarget(null)}
                  className="px-12 py-2 rounded-md font-semibold"
                  style={{ background: "#5A2E3C", color: "white", fontFamily: "Poppins, sans-serif", minWidth: 122 }}
                >
                  No
                </button>
                <button
                  onClick={confirmCancel}
                  className="px-12 py-2 rounded-md font-semibold"
                  style={{ background: "#EFE5E7", color: "#111", border: "1px solid #A78B95", fontFamily: "Poppins, sans-serif", minWidth: 122 }}
                >
                  Yes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Profile Screen ────────────────────────────────────────────────────────────

function ProfileScreen({ onLogout }: { onLogout: () => void }) {
  const [hobbies, setHobbies] = useState(["Reading", "Hiking", "Photography", "Coffee"]);
  const [editingHobbies, setEditingHobbies] = useState(false);
  const [newHobby, setNewHobby] = useState("");
  const classes = [
    "CSE 440 - Introduction to HCI",
    "CSE 333 - Systems Programming",
    "CSE 457 - Computer Graphics",
    "EDSPE 422 - (dis) Ability, Education, and the Arts",
  ];
  const registeredClubs = [
    "Women in Computing",
    "DubHacks",
  ];

  const addHobby = () => {
    const hobby = newHobby.trim();
    if (!hobby || hobbies.some((item) => item.toLowerCase() === hobby.toLowerCase())) return;
    setHobbies([...hobbies, hobby]);
    setNewHobby("");
  };

  const removeHobby = (hobby: string) => {
    setHobbies(hobbies.filter((item) => item !== hobby));
  };

  return (
    <div className="px-7 py-7">
      <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: "#111", fontSize: 28, marginBottom: 24 }}>
        My Profile
      </h2>

      <div className="grid grid-cols-[1.4fr_1fr] gap-5">
        <div
          className="rounded-2xl p-8 flex gap-8"
          style={{ background: "#EFE5E7" }}
        >
          <div
            className="w-24 h-24 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(rgba(90,46,60,0.18), rgba(90,46,60,0.18)), url(${UW_IMAGES.cherryBlossoms})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: "white",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              fontSize: 24,
              textShadow: "0 1px 6px rgba(0,0,0,0.7)",
            }}
          >
            AJ
          </div>
          <div className="flex-1">
            <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: "#111", fontSize: 26 }}>
              Amber J
            </h3>
            <p style={{ fontFamily: "Inter, sans-serif", color: "#111", fontSize: 13, marginBottom: 14 }}>
              amber002@uw.edu
            </p>
            <div style={{ borderTop: "1px solid #A78B95", paddingTop: 14 }}>
              <p style={{ fontFamily: "Inter, sans-serif", color: "#111", fontSize: 13, marginBottom: 12 }}>
                Major: Computer Engineering
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", color: "#111", fontSize: 13 }}>
                Class year: Junior
              </p>
            </div>
            <div style={{ borderTop: "1px solid #A78B95", marginTop: 14, paddingTop: 14 }}>
              <p style={{ fontFamily: "Inter, sans-serif", color: "#5A2E3C", fontSize: 13, fontStyle: "italic" }}>
                "About me...."
              </p>
            </div>
          </div>
        </div>

        <div
          className="rounded-2xl p-6"
          style={{ background: "#EFE5E7" }}
        >
          <div className="flex items-center gap-3 mb-8">
            <BookOpen size={24} style={{ color: "#5A2E3C" }} />
            <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: "#111", fontSize: 18 }}>
              Classes
            </h3>
          </div>
          <div className="flex flex-col gap-5">
            {classes.map((item) => (
              <p key={item} style={{ fontFamily: "Inter, sans-serif", color: "#111", fontSize: 15, lineHeight: 1.25 }}>
                {item}
              </p>
            ))}
          </div>
        </div>

        <div
          className="rounded-2xl p-6"
          style={{ background: "#EFE5E7" }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Heart size={24} style={{ color: "#5A2E3C" }} />
              <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: "#111", fontSize: 18 }}>
                Hobbies
              </h3>
            </div>
            <button
              onClick={() => setEditingHobbies(!editingHobbies)}
              style={{ fontFamily: "Inter, sans-serif", color: "#5A2E3C", fontSize: 12, fontWeight: 700 }}
            >
              {editingHobbies ? "Done" : "Edit"}
            </button>
          </div>
          <div className="flex flex-wrap gap-4">
            {hobbies.map((hobby) => (
              <span
                key={hobby}
                className="px-5 py-2 rounded-full text-center flex items-center gap-2"
                style={{ background: "#5A2E3C", color: "white", fontFamily: "Inter, sans-serif", fontSize: 12, minWidth: 92 }}
              >
                {hobby}
                {editingHobbies && (
                  <button
                    onClick={() => removeHobby(hobby)}
                    aria-label={`Remove ${hobby}`}
                    className="w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.22)", color: "white", fontSize: 10, lineHeight: 1 }}
                  >
                    x
                  </button>
                )}
              </span>
            ))}
          </div>
          {editingHobbies && (
            <div className="mt-5 flex gap-3">
              <input
                value={newHobby}
                onChange={(e) => setNewHobby(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addHobby()}
                placeholder="Add a hobby"
                className="flex-1 px-4 py-2 rounded-full outline-none"
                style={{ background: "white", border: "1px solid #B9B0B2", color: "#111", fontFamily: "Inter, sans-serif", fontSize: 13 }}
              />
              <button
                onClick={addHobby}
                className="px-5 py-2 rounded-full font-semibold"
                style={{ background: "#5A2E3C", color: "white", fontFamily: "Poppins, sans-serif", fontSize: 12 }}
              >
                Add
              </button>
            </div>
          )}
        </div>

        <div
          className="rounded-2xl p-6"
          style={{ background: "#EFE5E7" }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Users size={24} style={{ color: "#5A2E3C" }} />
            <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: "#111", fontSize: 18 }}>
              Register Clubs
            </h3>
          </div>
          <div className="flex flex-col gap-5">
            {registeredClubs.map((club) => (
              <button
                key={club}
                onClick={() => undefined}
                className="flex items-center justify-between text-left"
              >
                <span>
                  <span style={{ display: "block", fontFamily: "Inter, sans-serif", color: "#111", fontSize: 14, fontWeight: 700 }}>
                    {club}
                  </span>
                  <span style={{ display: "block", fontFamily: "Inter, sans-serif", color: "#111", fontSize: 11 }}>
                    Member
                  </span>
                </span>
                <ChevronRight size={18} fill="#5A2E3C" style={{ color: "#5A2E3C" }} />
              </button>
            ))}
          </div>
          <button
            onClick={onLogout}
            className="mt-8 px-5 py-2 rounded-full"
            style={{ background: "#5A2E3C", color: "white", fontFamily: "Poppins, sans-serif", fontSize: 12 }}
          >
            Sign Out
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
        return <HomeScreen onNav={setScreen} />;
      case "clubs":
        return <ClubsScreen state={appState} setState={setAppState} />;
      case "checkin":
        return <CheckInScreen state={appState} setState={setAppState} onNav={setScreen} />;
      case "nearby":
        return <NearbyScreen state={appState} setState={setAppState} onMessage={handleMessage} />;
      case "messaging":
        return <MessagingScreen state={appState} setState={setAppState} targetId={messageTarget} />;
      case "events":
        return <EventsScreen state={appState} setState={setAppState} />;
      case "profile":
        return <ProfileScreen onLogout={handleLogout} />;
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
