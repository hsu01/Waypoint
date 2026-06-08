import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import {
  MapPin, Users, MessageSquare, Calendar, ArrowRight, Play,
  CheckCircle, Star, ChevronRight, Menu, X
} from "lucide-react";
import digitalPrototype from "../../imports/Digital_Prototype-1.png";
import storyboard from "../../imports/Storyboard-1.png";
import firstSketch from "../../imports/First_Sketch-1.png";
import finalPaper from "../../imports/Final_Paper_Prototype-1.png";
import initialPaper from "../../imports/Initial_Paper_Prototype-1.png";

// ── helpers ──────────────────────────────────────────────────────────────────

function FadeIn({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: "Problem", href: "#problem" },
    { label: "Research", href: "#research" },
    { label: "Solution", href: "#solution" },
    { label: "Design Journey", href: "#journey" },
    { label: "Team", href: "#team" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(81,45,56,0.95)"
          : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.18)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "#F4BFDB" }}
          >
            <MapPin size={16} style={{ color: "#512D38" }} />
          </div>
          <span
            className="font-bold text-white tracking-tight"
            style={{ fontFamily: "Poppins, sans-serif", fontSize: 20 }}
          >
            WayPoint
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm text-white/80 hover:text-white transition-colors"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="/demo"
            className="px-5 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95"
            style={{
              background: "#F4BFDB",
              color: "#512D38",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Try Demo
          </a>
        </div>

        {/* Mobile */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div
          className="md:hidden px-6 pb-6 flex flex-col gap-4"
          style={{ background: "rgba(81,45,56,0.97)" }}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-white/80 hover:text-white text-base"
              style={{ fontFamily: "Inter, sans-serif" }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/demo"
            className="px-5 py-2 rounded-full text-sm font-semibold text-center mt-2"
            style={{ background: "#F4BFDB", color: "#512D38", fontFamily: "Poppins, sans-serif" }}
          >
            Try Demo
          </a>
        </div>
      )}
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #2a1219 0%, #512D38 40%, #7a3f52 70%, #B27092 100%)",
      }}
    >
      {/* Floating shapes */}
      <motion.div
        className="absolute rounded-full opacity-10"
        style={{ width: 500, height: 500, background: "#F4BFDB", top: -100, right: -100 }}
        animate={{ y: [0, -30, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full opacity-8"
        style={{ width: 300, height: 300, background: "#B27092", bottom: -80, left: -80 }}
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute rounded-full opacity-5"
        style={{ width: 200, height: 200, background: "#F4BFDB", top: "40%", left: "20%" }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm"
            style={{ background: "rgba(244,191,219,0.15)", border: "1px solid rgba(244,191,219,0.3)", color: "#F4BFDB", fontFamily: "Inter, sans-serif" }}
          >
            <Star size={14} fill="currentColor" />
            CSE 440 · University of Washington · Spring 2026 · TEAM MANGO
          </div>

          <h1
            className="text-white mb-6"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Turn Shared Communities Into{" "}
            <span style={{ color: "#F4BFDB" }}>Meaningful Connections</span>
          </h1>

          <p
            className="mb-4"
            style={{ fontFamily: "Inter, sans-serif", fontSize: 18, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, maxWidth: 560 }}
          >
            Imagine arriving on campus and discovering that three of your club friends are studying just one building away but you never knew they were there.
          </p>
          <p
            className="mb-10"
            style={{ fontFamily: "Inter, sans-serif", fontSize: 18, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, maxWidth: 560 }}
          >
            WayPoint helps students reconnect through shared communities, nearby peers, and campus events.
          </p>

          <div className="flex flex-wrap gap-4">
            <motion.a
              href="/demo"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base"
              style={{ background: "#F4BFDB", color: "#512D38", fontFamily: "Poppins, sans-serif" }}
            >
              Try Demo <ArrowRight size={18} />
            </motion.a>
            <motion.a
              href="#video"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base"
              style={{ border: "2px solid rgba(255,255,255,0.3)", color: "white", background: "rgba(255,255,255,0.05)", fontFamily: "Poppins, sans-serif" }}
            >
              <Play size={18} /> Watch Concept Video
            </motion.a>
          </div>
        </motion.div>

        {/* Right – kiosk mockup */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex justify-center"
        >
          <motion.div
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            {/* Kiosk stand */}
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                width: 340,
                background: "rgba(255,255,255,0.08)",
                border: "2px solid rgba(244,191,219,0.3)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 40px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)",
              }}
            >
              {/* Kiosk header bar */}
              <div
                className="px-6 py-4 flex items-center justify-between"
                style={{ background: "rgba(81,45,56,0.6)", borderBottom: "1px solid rgba(244,191,219,0.15)" }}
              >
                <div className="flex items-center gap-2">
                  <MapPin size={14} style={{ color: "#F4BFDB" }} />
                  <span style={{ fontFamily: "Poppins, sans-serif", color: "#F4BFDB", fontSize: 13, fontWeight: 600 }}>WayPoint</span>
                </div>
                <span style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.4)", fontSize: 11 }}>University of Washington</span>
              </div>

              {/* Screen content */}
              <div className="p-6" style={{ minHeight: 380 }}>
                <div className="mb-6">
                  <p style={{ fontFamily: "Poppins, sans-serif", color: "#F4BFDB", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Welcome, Student!</p>
                  <p style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.5)", fontSize: 11 }}>See who's nearby</p>
                </div>

                {/* Nearby friends preview */}
                {[
                  { name: "Jesse M.", club: "ACM Club", dist: "EEB, 2 min", color: "#F4BFDB" },
                  { name: "Jiawen Z.", club: "Robotics", dist: "CSE, 5 min", color: "#B27092" },
                  { name: "Yumeng M.", club: "SHPE", dist: "HUB, 8 min", color: "#DDF3E3" },
                ].map((f) => (
                  <div
                    key={f.name}
                    className="flex items-center gap-3 mb-3 p-3 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                      style={{ background: f.color, color: "#512D38", fontFamily: "Poppins, sans-serif" }}
                    >
                      {f.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p style={{ fontFamily: "Poppins, sans-serif", color: "white", fontSize: 12, fontWeight: 600 }}>{f.name}</p>
                      <p style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.4)", fontSize: 10 }}>{f.club} · {f.dist}</p>
                    </div>
                    <div
                      className="px-2 py-1 rounded-full text-xs"
                      style={{ background: "rgba(244,191,219,0.15)", color: "#F4BFDB", fontFamily: "Inter, sans-serif" }}
                    >
                      Say Hi
                    </div>
                  </div>
                ))}

                {/* Nav icons */}
                <div
                  className="mt-6 flex justify-around pt-4"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
                >
                  {[
                    { icon: <Users size={16} />, label: "Clubs" },
                    { icon: <MapPin size={16} />, label: "Nearby" },
                    { icon: <Calendar size={16} />, label: "Events" },
                    { icon: <MessageSquare size={16} />, label: "Profile" },
                  ].map((n) => (
                    <div key={n.label} className="flex flex-col items-center gap-1">
                      <div style={{ color: "#F4BFDB" }}>{n.icon}</div>
                      <span style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.4)", fontSize: 9 }}>{n.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Kiosk pole */}
            <div
              className="mx-auto"
              style={{ width: 24, height: 48, background: "rgba(255,255,255,0.12)", borderRadius: "0 0 8px 8px" }}
            />
            <div
              className="mx-auto"
              style={{ width: 80, height: 12, background: "rgba(255,255,255,0.08)", borderRadius: 8 }}
            />

            {/* Glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at center, rgba(244,191,219,0.12) 0%, transparent 70%)",
                borderRadius: "50%",
                transform: "translateY(20px)",
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-white/50" />
        </div>
      </motion.div>
    </section>
  );
}

// ── Problem ───────────────────────────────────────────────────────────────────

function ProblemSection() {
  const quotes = [
    "I meet people through clubs but never see them again.",
    "It's hard to coordinate schedules.",
    "I never know who's around campus.",
  ];

  return (
    <section id="problem" className="py-32" style={{ background: "#FFF9FC" }}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-20">
            <span
              className="inline-block px-4 py-1 rounded-full text-sm mb-4"
              style={{ background: "#F8F4F6", color: "#512D38", fontFamily: "Inter, sans-serif" }}
            >
              The Challenge
            </span>
            <h2
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                color: "#2B2B2B",
                lineHeight: 1.2,
              }}
            >
              The Problem
            </h2>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <FadeIn>
              <div
                className="p-8 rounded-3xl mb-8"
                style={{ background: "#F8F4F6" }}
              >
                <p
                  className="mb-4"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: 18, color: "#2B2B2B", lineHeight: 1.7 }}
                >
                  Friendships often begin through classes, clubs, and events.
                  But once that shared environment ends, many connections disappear.
                </p>
                <div className="flex gap-4">
                  {[
                    { num: "73%", label: "lose touch after clubs end" },
                    { num: "2 in 3", label: "want easier ways to reconnect" },
                  ].map((s) => (
                    <div key={s.label} className="flex-1 text-center p-4 rounded-2xl" style={{ background: "white" }}>
                      <div style={{ fontFamily: "Poppins, sans-serif", fontSize: 32, fontWeight: 700, color: "#512D38" }}>{s.num}</div>
                      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#717182" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <div className="flex flex-col gap-4">
              {quotes.map((q, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div
                    className="p-5 rounded-2xl flex gap-4 items-start"
                    style={{ background: "white", border: "1px solid #F8F4F6", boxShadow: "0 2px 12px rgba(81,45,56,0.06)" }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5"
                      style={{ background: "#F4BFDB", color: "#512D38", fontFamily: "Poppins, sans-serif" }}
                    >
                      "
                    </div>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: 16, color: "#2B2B2B", fontStyle: "italic", lineHeight: 1.6 }}>
                      {q}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Right – illustration */}
          <FadeIn delay={0.2} className="flex justify-center">
            <div className="relative">
              <div
                className="rounded-3xl overflow-hidden"
                style={{ width: "100%", maxWidth: 440, background: "#F8F4F6", padding: 32 }}
              >
                <svg viewBox="0 0 400 340" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%" }}>
                  {/* Campus path */}
                  <path d="M40 200 Q200 180 360 200" stroke="#E8D5DC" strokeWidth="3" strokeDasharray="8 4" />
                  {/* Building left */}
                  <rect x="20" y="100" width="80" height="100" rx="8" fill="#B27092" opacity="0.2" />
                  <rect x="30" y="115" width="15" height="18" rx="2" fill="#B27092" opacity="0.4" />
                  <rect x="55" y="115" width="15" height="18" rx="2" fill="#B27092" opacity="0.4" />
                  <rect x="30" y="145" width="15" height="18" rx="2" fill="#B27092" opacity="0.4" />
                  <rect x="55" y="145" width="15" height="18" rx="2" fill="#B27092" opacity="0.4" />
                  {/* Building right */}
                  <rect x="300" y="80" width="80" height="120" rx="8" fill="#512D38" opacity="0.15" />
                  <rect x="310" y="95" width="15" height="18" rx="2" fill="#512D38" opacity="0.3" />
                  <rect x="335" y="95" width="15" height="18" rx="2" fill="#512D38" opacity="0.3" />
                  <rect x="360" y="95" width="15" height="18" rx="2" fill="#512D38" opacity="0.3" />

                  {/* Student A */}
                  <circle cx="140" cy="195" r="20" fill="#F4BFDB" />
                  <circle cx="140" cy="180" r="12" fill="#512D38" />
                  <text x="140" y="225" textAnchor="middle" fill="#512D38" fontSize="11" fontFamily="Inter, sans-serif" fontWeight="600">Sam</text>
                  <path d="M138 200 L138 230" stroke="#512D38" strokeWidth="2" />
                  <path d="M125 210 L138 215 L151 210" stroke="#512D38" strokeWidth="2" />

                  {/* Student B */}
                  <circle cx="260" cy="195" r="20" fill="#B27092" />
                  <circle cx="260" cy="180" r="12" fill="#2B2B2B" />
                  <text x="260" y="225" textAnchor="middle" fill="#2B2B2B" fontSize="11" fontFamily="Inter, sans-serif" fontWeight="600">Jordan</text>
                  <path d="M258 200 L258 230" stroke="#2B2B2B" strokeWidth="2" />
                  <path d="M245 210 L258 215 L271 210" stroke="#2B2B2B" strokeWidth="2" />

                  {/* Missed connection spark */}
                  <circle cx="200" cy="160" r="24" fill="#F4BFDB" opacity="0.15" />
                  <text x="200" y="166" textAnchor="middle" fontSize="22">🤝</text>
                  <text x="200" y="290" textAnchor="middle" fill="#B27092" fontSize="12" fontFamily="Inter, sans-serif">Both in Computer Science Club</text>
                  <text x="200" y="310" textAnchor="middle" fill="#717182" fontSize="11" fontFamily="Inter, sans-serif">…but they don't know it</text>
                </svg>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ── Research ──────────────────────────────────────────────────────────────────

function ResearchSection() {
  const cards = [
    {
      title: "Situational Friendships",
      body: "Students maintain friendships while sharing a class or club but often lose contact afterward.",
      icon: "🔗",
      color: "#F4BFDB",
    },
    {
      title: "Busy Schedules",
      body: "Even motivated students struggle to find time to reconnect with peers outside of class.",
      icon: "📅",
      color: "#B27092",
    },
    {
      title: "Uncertainty",
      body: "Students hesitate to reach out because they fear awkwardness or rejection.",
      icon: "🤔",
      color: "#DDF3E3",
    },
    {
      title: "Desire for Low-Pressure Interaction",
      body: "Students want easier and more natural ways to stay connected without forced conversation.",
      icon: "💬",
      color: "#F8F4F6",
    },
  ];

  return (
    <section id="research" style={{ background: "#F8F4F6", padding: "7rem 0" }}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-4">
            <span
              className="inline-block px-4 py-1 rounded-full text-sm mb-4"
              style={{ background: "#F4BFDB", color: "#512D38", fontFamily: "Inter, sans-serif" }}
            >
              User Research
            </span>
            <h2
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                color: "#2B2B2B",
                lineHeight: 1.2,
                marginBottom: 8,
              }}
            >
              What We Learned
            </h2>
            <p style={{ fontFamily: "Inter, sans-serif", color: "#717182", fontSize: 18, maxWidth: 540, margin: "0 auto" }}>
              Insights gathered from interviews and diary studies with UW students.
            </p>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {cards.map((c, i) => (
            <FadeIn key={c.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6, boxShadow: "0 20px 48px rgba(81,45,56,0.12)" }}
                className="p-6 rounded-3xl h-full"
                style={{ background: "white", boxShadow: "0 2px 16px rgba(81,45,56,0.06)", border: "1px solid rgba(81,45,56,0.06)" }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4"
                  style={{ background: c.color }}
                >
                  {c.icon}
                </div>
                <h3
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: "#2B2B2B", fontSize: 16, marginBottom: 8 }}
                >
                  {c.title}
                </h3>
                <p style={{ fontFamily: "Inter, sans-serif", color: "#717182", fontSize: 14, lineHeight: 1.6 }}>
                  {c.body}
                </p>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* Chart */}
        <FadeIn delay={0.3}>
          <div
            className="mt-16 p-8 rounded-3xl"
            style={{ background: "white", border: "1px solid rgba(81,45,56,0.06)" }}
          >
            <h3
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: "#2B2B2B", fontSize: 18, marginBottom: 24 }}
            >
              Student Pain Points Survey
            </h3>
            <div className="flex flex-col gap-4">
              {[
                { label: "Losing touch with club friends", pct: 78 },
                { label: "Hard to coordinate schedules", pct: 65 },
                { label: "Don't know who's nearby", pct: 71 },
                { label: "Fear of awkward outreach", pct: 58 },
              ].map((b) => (
                <div key={b.label} className="flex items-center gap-4">
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#2B2B2B", width: 240, flexShrink: 0 }}>
                    {b.label}
                  </span>
                  <div className="flex-1 rounded-full overflow-hidden" style={{ background: "#F8F4F6", height: 10 }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${b.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      style={{ height: "100%", background: "linear-gradient(90deg, #512D38, #B27092)", borderRadius: 99 }}
                    />
                  </div>
                  <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: "#512D38", fontSize: 14, width: 40 }}>
                    {b.pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ── Solution ──────────────────────────────────────────────────────────────────

function SolutionSection() {
  const features = [
    { icon: <MapPin size={24} />, title: "Check In", body: "Share your location and availability with club members.", color: "#512D38" },
    { icon: <Users size={24} />, title: "Nearby Friends", body: "See club peers who are nearby on campus right now.", color: "#B27092" },
    { icon: <MessageSquare size={24} />, title: "Messaging", body: "Send low-pressure messages to reconnect naturally.", color: "#F4BFDB" },
    { icon: <Calendar size={24} />, title: "Events", body: "Discover and RSVP to campus activities and gatherings.", color: "#DDF3E3" },
  ];

  return (
    <section id="solution" style={{ background: "#FFF9FC", padding: "7rem 0" }}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-6">
            <span
              className="inline-block px-4 py-1 rounded-full text-sm mb-4"
              style={{ background: "#512D38", color: "#F4BFDB", fontFamily: "Inter, sans-serif" }}
            >
              The Solution
            </span>
            <h2
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                color: "#2B2B2B",
                lineHeight: 1.2,
                marginBottom: 8,
              }}
            >
              Meet WayPoint
            </h2>
            <p
              style={{ fontFamily: "Inter, sans-serif", color: "#717182", fontSize: 18, maxWidth: 600, margin: "0 auto" }}
            >
              A campus kiosk platform that helps students reconnect with members of their student organizations through real-time presence, shared context, and campus events.
            </p>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                className="p-8 rounded-3xl text-center"
                style={{
                  background: i % 2 === 0 ? "#512D38" : "white",
                  border: "1px solid rgba(81,45,56,0.08)",
                  boxShadow: "0 4px 24px rgba(81,45,56,0.08)",
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 mx-auto"
                  style={{
                    background: i % 2 === 0 ? "rgba(244,191,219,0.2)" : "#F8F4F6",
                    color: i % 2 === 0 ? "#F4BFDB" : "#512D38",
                  }}
                >
                  {f.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 600,
                    color: i % 2 === 0 ? "white" : "#2B2B2B",
                    fontSize: 18,
                    marginBottom: 8,
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    color: i % 2 === 0 ? "rgba(255,255,255,0.65)" : "#717182",
                    fontSize: 14,
                    lineHeight: 1.6,
                  }}
                >
                  {f.body}
                </p>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* Demo CTA */}
        <FadeIn delay={0.3}>
          <div
            id="screens"
            className="mt-24 p-12 rounded-3xl text-center"
            style={{ background: "linear-gradient(135deg, #512D38, #7a3f52)", position: "relative", overflow: "hidden" }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 70% 30%, rgba(244,191,219,0.15) 0%, transparent 60%)" }}
            />
            <h2
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: "white", fontSize: 32, marginBottom: 12 }}
            >
              See WayPoint In Action
            </h2>
            <p style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.7)", fontSize: 18, marginBottom: 32 }}>
              Explore the full interactive kiosk prototype experience.
            </p>

            {/* Screen thumbnails */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-10">
              {["Login", "Home", "Clubs", "Check In", "Nearby Friends", "Events"].map((s, i) => (
                <motion.div
                  key={s}
                  whileHover={{ y: -4, scale: 1.05 }}
                  className="rounded-xl p-3 flex flex-col items-center gap-2 cursor-pointer"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
                    style={{ background: "rgba(244,191,219,0.15)" }}
                  >
                    {["🔐", "🏠", "👥", "📍", "🤝", "📅"][i]}
                  </div>
                  <span style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.7)", fontSize: 10 }}>{s}</span>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="/demo"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-semibold text-base"
              style={{ background: "#F4BFDB", color: "#512D38", fontFamily: "Poppins, sans-serif" }}
            >
              Launch Interactive Demo <ArrowRight size={18} />
            </motion.a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ── Design Journey ────────────────────────────────────────────────────────────

function JourneySection() {
  const steps = [
    {
      num: "01",
      title: "Problem Discovery",
      desc: "We identified that social disconnection at large universities is a significant but underaddressed challenge.",
      img: null,
      emoji: "🔍",
    },
    {
      num: "02",
      title: "User Research",
      desc: "Interviews and diary studies revealed key pain points around scheduling, uncertainty, and social friction.",
      img: null,
      emoji: "📋",
    },
    {
      num: "03",
      title: "Ideation & Sketching",
      desc: "Early sketches explored kiosk-based concepts for a Club Connect system on campus.",
      img: firstSketch,
      emoji: null,
    },
    {
      num: "04",
      title: "Storyboarding",
      desc: "Storyboards illustrated the student journey from club ending to reconnecting via WayPoint.",
      img: storyboard,
      emoji: null,
    },
    {
      num: "05",
      title: "Paper Prototype",
      desc: "Low-fidelity paper prototypes let us rapidly test core flows with real users.",
      img: finalPaper,
      emoji: null,
    },
    {
      num: "06",
      title: "Digital Prototype",
      desc: "The final digital prototype brings WayPoint to life with a complete interactive experience.",
      img: digitalPrototype,
      emoji: null,
    },
  ];

  return (
    <section id="journey" style={{ background: "#F8F4F6", padding: "7rem 0" }}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-20">
            <span
              className="inline-block px-4 py-1 rounded-full text-sm mb-4"
              style={{ background: "#F4BFDB", color: "#512D38", fontFamily: "Inter, sans-serif" }}
            >
              Design Process
            </span>
            <h2
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                color: "#2B2B2B",
                lineHeight: 1.2,
              }}
            >
              From Idea To Prototype
            </h2>
          </div>
        </FadeIn>

        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
            style={{ background: "linear-gradient(180deg, #F4BFDB, #512D38)" }}
          />

          <div className="flex flex-col gap-12">
            {steps.map((s, i) => (
              <FadeIn key={s.num} delay={i * 0.08}>
                <div className={`relative flex flex-col md:flex-row gap-8 items-start md:items-center ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                  {/* Dot */}
                  <div
                    className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full border-4 -translate-x-1/2 z-10"
                    style={{ background: "#F4BFDB", borderColor: "#512D38", top: 24 }}
                  />

                  {/* Card */}
                  <div className={`w-full md:w-5/12 pl-16 md:pl-0 ${i % 2 === 1 ? "md:pr-12" : "md:pl-12"}`}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="p-6 rounded-3xl"
                      style={{ background: "white", boxShadow: "0 4px 24px rgba(81,45,56,0.08)", border: "1px solid rgba(81,45,56,0.06)" }}
                    >
                      <div
                        className="text-xs font-bold mb-2"
                        style={{ fontFamily: "Poppins, sans-serif", color: "#B27092" }}
                      >
                        STEP {s.num}
                      </div>
                      <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: "#2B2B2B", fontSize: 20, marginBottom: 8 }}>
                        {s.title}
                      </h3>
                      <p style={{ fontFamily: "Inter, sans-serif", color: "#717182", fontSize: 14, lineHeight: 1.6 }}>
                        {s.desc}
                      </p>
                      {s.img && (
                        <img
                          src={s.img}
                          alt={s.title}
                          className="mt-4 w-full rounded-xl object-cover"
                          style={{ maxHeight: 180 }}
                        />
                      )}
                      {s.emoji && (
                        <div className="mt-4 text-5xl text-center">{s.emoji}</div>
                      )}
                    </motion.div>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden md:block w-5/12" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Video ─────────────────────────────────────────────────────────────────────

function VideoSection() {
  return (
    <section id="video" style={{ background: "#FFF9FC", padding: "7rem 0" }}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <FadeIn>
          <span
            className="inline-block px-4 py-1 rounded-full text-sm mb-4"
            style={{ background: "#F8F4F6", color: "#512D38", fontFamily: "Inter, sans-serif" }}
          >
            Concept Video
          </span>
          <h2
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#2B2B2B",
              lineHeight: 1.2,
              marginBottom: 12,
            }}
          >
            Watch The Story
          </h2>
          <p
            style={{ fontFamily: "Inter, sans-serif", color: "#717182", fontSize: 18, maxWidth: 560, margin: "0 auto 40px" }}
          >
            Our concept video demonstrates how WayPoint helps students reconnect naturally through shared communities and campus presence.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{ paddingBottom: "56.25%", background: "#F8F4F6" }}
          >
            <iframe
              src="https://www.youtube.com/embed/dgCbUCmWG3w"
              title="WayPoint Concept Video"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ border: "none" }}
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ── Final Prototype ───────────────────────────────────────────────────────────

function FinalPrototypeSection() {
  const screens = [
    { label: "Login", emoji: "🔐", desc: "Sign in with your UW NetID" },
    { label: "Home", emoji: "🏠", desc: "Your personalized campus hub" },
    { label: "Clubs", emoji: "👥", desc: "Browse your organizations" },
    { label: "Check-In", emoji: "📍", desc: "Share your location" },
    { label: "Nearby Friends", emoji: "🤝", desc: "See who's around" },
    { label: "Messaging", emoji: "💬", desc: "Low-pressure connection" },
    { label: "Events", emoji: "📅", desc: "Discover activities" },
    { label: "Profile", emoji: "👤", desc: "Your campus identity" },
  ];

  return (
    <section style={{ background: "#512D38", padding: "7rem 0" }}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <span
              className="inline-block px-4 py-1 rounded-full text-sm mb-4"
              style={{ background: "rgba(244,191,219,0.2)", color: "#F4BFDB", fontFamily: "Inter, sans-serif" }}
            >
              Final Design
            </span>
            <h2
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                color: "white",
                lineHeight: 1.2,
              }}
            >
              The Final Experience
            </h2>
          </div>
        </FadeIn>

        {/* Horizontally scrollable screens */}
        <div className="overflow-x-auto pb-6 -mx-6 px-6">
          <div className="flex gap-4" style={{ width: "max-content" }}>
            {screens.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -6 }}
                className="flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  width: 160,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(244,191,219,0.15)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
                }}
              >
                {/* Kiosk top bar */}
                <div
                  className="py-2 px-3 text-center"
                  style={{ background: "rgba(244,191,219,0.08)", borderBottom: "1px solid rgba(244,191,219,0.1)" }}
                >
                  <span style={{ fontFamily: "Inter, sans-serif", color: "#F4BFDB", fontSize: 9 }}>WayPoint Kiosk</span>
                </div>
                {/* Screen */}
                <div className="p-4 text-center" style={{ minHeight: 200 }}>
                  <div className="text-4xl mb-3">{s.emoji}</div>
                  <div style={{ fontFamily: "Poppins, sans-serif", color: "white", fontWeight: 600, fontSize: 13, marginBottom: 4 }}>
                    {s.label}
                  </div>
                  <div style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.5)", fontSize: 11, lineHeight: 1.5 }}>
                    {s.desc}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <FadeIn delay={0.2}>
          <div className="text-center mt-12">
            <motion.a
              href="/demo"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-semibold"
              style={{ background: "#F4BFDB", color: "#512D38", fontFamily: "Poppins, sans-serif", fontSize: 16 }}
            >
              Try the Interactive Demo <ChevronRight size={20} />
            </motion.a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ── Impact ────────────────────────────────────────────────────────────────────

function ImpactSection() {
  const cards = [
    { title: "Build Belonging", body: "Help students feel more connected to campus life and community.", emoji: "🏛️" },
    { title: "Reduce Social Friction", body: "Lower the barriers to reaching out and rekindling connections.", emoji: "🤝" },
    { title: "Strengthen Communities", body: "Transform shared organizations into lasting, meaningful friendships.", emoji: "💪" },
  ];

  return (
    <section style={{ background: "#FFF9FC", padding: "7rem 0" }}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <span
              className="inline-block px-4 py-1 rounded-full text-sm mb-4"
              style={{ background: "#DDF3E3", color: "#2B2B2B", fontFamily: "Inter, sans-serif" }}
            >
              Impact
            </span>
            <h2
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                color: "#2B2B2B",
                lineHeight: 1.2,
              }}
            >
              Why It Matters
            </h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((c, i) => (
            <FadeIn key={c.title} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -6 }}
                className="p-10 rounded-3xl text-center"
                style={{
                  background: i === 1 ? "#512D38" : "white",
                  border: "1px solid rgba(81,45,56,0.08)",
                  boxShadow: "0 4px 32px rgba(81,45,56,0.08)",
                }}
              >
                <div className="text-5xl mb-6">{c.emoji}</div>
                <h3
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 700,
                    color: i === 1 ? "white" : "#2B2B2B",
                    fontSize: 22,
                    marginBottom: 12,
                  }}
                >
                  {c.title}
                </h3>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    color: i === 1 ? "rgba(255,255,255,0.7)" : "#717182",
                    fontSize: 16,
                    lineHeight: 1.7,
                  }}
                >
                  {c.body}
                </p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Team ──────────────────────────────────────────────────────────────────────

function TeamSection() {
  const members = [
    { name: "Keerthana Kompella", initial: "K" },
    { name: "Yasmin Corona Gomez", initial: "Y" },
    { name: "Lory Quiroz", initial: "L" },
    { name: "Xuan Nhu Tran", initial: "X" },
    { name: "Hsu Wai Hnin Kyaw", initial: "H" },
  ];

  const colors = ["#F4BFDB", "#B27092", "#DDF3E3", "#F4BFDB", "#B27092"];

  return (
    <section id="team" style={{ background: "#F8F4F6", padding: "7rem 0" }}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <span
              className="inline-block px-4 py-1 rounded-full text-sm mb-4"
              style={{ background: "#F4BFDB", color: "#512D38", fontFamily: "Inter, sans-serif" }}
            >
              The Team
            </span>
            <h2
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                color: "#2B2B2B",
                lineHeight: 1.2,
              }}
            >
              Team Mango
            </h2>
          </div>
        </FadeIn>

        <div className="flex flex-wrap justify-center gap-6">
          {members.map((m, i) => (
            <FadeIn key={m.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                className="flex flex-col items-center p-8 rounded-3xl text-center"
                style={{
                  background: "white",
                  border: "1px solid rgba(81,45,56,0.06)",
                  boxShadow: "0 4px 24px rgba(81,45,56,0.06)",
                  width: 200,
                }}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mb-4"
                  style={{ background: colors[i], color: "#512D38", fontFamily: "Poppins, sans-serif" }}
                >
                  {m.initial}
                </div>
                <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: "#2B2B2B", fontSize: 15, marginBottom: 0 }}>
                  {m.name}
                </h3>
                <div className="flex gap-1 mt-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={12} fill="#F4BFDB" style={{ color: "#F4BFDB" }} />
                  ))}
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer
      style={{ background: "#2a1219", padding: "4rem 0 2rem" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#F4BFDB" }}>
                <MapPin size={16} style={{ color: "#512D38" }} />
              </div>
              <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: "white", fontSize: 20 }}>WayPoint</span>
            </div>
            <p style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.6 }}>
              Turn Shared Communities Into Meaningful Connections
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: "white", fontSize: 14, marginBottom: 16 }}>
              Quick Links
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "Try Demo", href: "/demo" },
                { label: "Concept Video", href: "#video" },
                { label: "Design Process", href: "#journey" },
                { label: "Team", href: "#team" },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.5)", fontSize: 14, textDecoration: "none" }}
                  className="hover:text-white transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Course info */}
          <div>
            <h4 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: "white", fontSize: 14, marginBottom: 16 }}>
              Project Info
            </h4>
            <div className="flex flex-col gap-2">
              {[
                "CSE 440 Human Computer Interaction",
                "University of Washington",
                "Spring 2026",
                "Team Mango",
              ].map((t) => (
                <span key={t} style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.45)", fontSize: 14 }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          className="pt-6 text-center"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.3)", fontSize: 13 }}>
            © 2026 WayPoint · Team Mango · CSE 440 · University of Washington
          </p>
        </div>
      </div>
    </footer>
  );
}

// ── Landing Page ──────────────────────────────────────────────────────────────

export function LandingPage() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div style={{ fontFamily: "Inter, sans-serif" }}>
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <ResearchSection />
      <SolutionSection />
      <JourneySection />
      <VideoSection />
      <FinalPrototypeSection />
      <ImpactSection />
      <TeamSection />
      <Footer />
    </div>
  );
}
