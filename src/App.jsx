import { useState, useEffect, useRef } from "react";
import {
  Code2, Layers, Database, GitBranch, Terminal, Globe, Lock, Brain,
  MapPin, Mail, Phone, ExternalLink, Github, Linkedin, ArrowRight,
  Trophy, Rocket, GraduationCap, Search, ChevronDown, User, Cpu,
  Star, Zap, BookOpen, Server, Layout, FileText, X, Download, Menu
} from "lucide-react";

/* ─── DATA ─────────────────────────────────────────────────────────────────── */
const SKILLS = [
  { name: "JavaScript",   logo: "https://cdn.simpleicons.org/javascript/F7DF1E",    level: "Advanced"     },
  { name: "React JS",     logo: "https://cdn.simpleicons.org/react/61DAFB",         level: "Advanced"     },
  { name: "Next JS",      logo: "https://cdn.simpleicons.org/nextdotjs/ffffff",      level: "Beginner"     },
  { name: "Node JS",      logo: "https://cdn.simpleicons.org/nodedotjs/339933",     level: "Advanced"     },
  { name: "Express",      logo: "https://cdn.simpleicons.org/express/ffffff",        level: "Intermediate" },
  { name: "C / C++",      logo: "https://cdn.simpleicons.org/cplusplus/00599C",     level: "Advanced"     },
  { name: "Python",       logo: "https://cdn.simpleicons.org/python/3776AB",        level: "Beginner"     },
  { name: "Tailwind CSS", logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4",   level: "Advanced"     },
  { name: "MySQL",        logo: "https://cdn.simpleicons.org/mysql/4479A1",         level: "Advanced"     },
  { name: "MongoDB",      logo: "https://cdn.simpleicons.org/mongodb/47A248",       level: "Intermediate" },
  { name: "REST / JWT",   logo: "https://cdn.simpleicons.org/jsonwebtokens/F7DF1E", level: "Beginner"     },
  { name: "DSA",          logo: "https://cdn.simpleicons.org/leetcode/FFA116",      level: "Intermediate" },
];

const PROJECTS = [
  {
    id: "01", name: "HealthDesk", tag: "AI Healthcare Platform", Icon: Globe,
    desc: "Healthcare platform enabling asynchronous care with AI support and real-time consultations.",
    features: [
      { Icon: Globe, text: "Real-time video consultations with transcription & structured reports" },
      { Icon: Brain, text: "AI multilingual medical chatbot using curated research datasets" },
      { Icon: Search, text: "Predictive Symptom Analyzer using k-NN model" },
      { Icon: MapPin, text: "Location-based pharmacy search and medicine request system" },
    ],
    stack: ["ReactJS", "Tailwind CSS"],
    github: "https://github.com/Hellf0rg0d/healthdesk",
    live: "https://axios-tawny-tau.vercel.app",
  },
  {
    id: "02", name: "Get-It", tag: "Secure File Sharing", Icon: Lock,
    desc: "Web app for secure file and text sharing using unique 6-character access codes.",
    features: [
      { Icon: Database, text: "Upload up to 10 files (max 10MB each)" },
      { Icon: Lock, text: "Unique 6-character secure access codes" },
      { Icon: ArrowRight, text: "Batch downloads and file preview support" },
      { Icon: Globe, text: "Fully responsive and performance optimized" },
    ],
    stack: ["ReactJS", "Tailwind CSS", "Axios"],
    github: "https://github.com/Sudhanva-Kulkarni/Get-It",
    live: "https://get-it-orpin.vercel.app",
  },
];

const NAV_SECTIONS = ["home", "about", "skills", "projects", "contact"];

/* ─── HOOKS ─────────────────────────────────────────────────────────────────── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, v];
}

function useIsMobile() {
  const [mobile, setMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return mobile;
}

/* ─── DOT GRID ───────────────────────────────────────────────────────────────── */
function DotGrid() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -999, y: -999 });
  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d");
    let W, H, dots = [], raf;
    const S = 36;
    const build = () => {
      W = c.width = c.offsetWidth; H = c.height = c.offsetHeight; dots = [];
      for (let x = S / 2; x < W; x += S)
        for (let y = S / 2; y < H; y += S)
          dots.push({ ox: x, oy: y, x, y });
    };
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      dots.forEach(d => {
        const dx = mouse.current.x - d.ox, dy = mouse.current.y - d.oy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const f = Math.max(0, 90 - dist) / 90;
        d.x += (d.ox - d.x) * 0.12 - dx * f * 0.18;
        d.y += (d.oy - d.y) * 0.12 - dy * f * 0.18;
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.2 + f * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(196,164,118,${0.05 + f * 0.55})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    build(); draw();
    const onR = () => build();
    const onM = (e) => { const r = c.getBoundingClientRect(); mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top }; };
    window.addEventListener("resize", onR);
    c.addEventListener("mousemove", onM);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onR); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "all" }} />;
}

/* ─── SKILL BAR ──────────────────────────────────────────────────────────────── */
function SkillBar({ name, logo, level, delay }) {
  const [ref, v] = useReveal(0.3);
  const [hov, setHov] = useState(false);
  const isMobile = useIsMobile();
  const levelColor = level === "Advanced" ? "#c4a476" : level === "Intermediate" ? "#a0c4a0" : "rgba(232,224,213,0.45)";
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(14px)", transition: `all 0.5s ease ${delay}s` }}>
      <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: isMobile ? "10px 10px" : "11px 16px", border: `1px solid ${hov ? "rgba(196,164,118,0.35)" : "rgba(196,164,118,0.1)"}`, background: hov ? "rgba(196,164,118,0.06)" : "rgba(196,164,118,0.02)", transition: "all 0.2s ease" }}>
        <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 7 : 10, minWidth: 0 }}>
          <img src={logo} alt={name} style={{ width: isMobile ? 15 : 18, height: isMobile ? 15 : 18, objectFit: "contain", filter: hov ? "none" : "grayscale(30%) brightness(0.85)", transition: "filter 0.2s ease", flexShrink: 0 }} />
          <span style={{ fontSize: isMobile ? 11 : 12.5, color: "#e8e0d5", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{name}</span>
        </div>
        {isMobile ? (
          <div style={{ display: "flex", gap: 3, flexShrink: 0, marginLeft: 6 }} title={level}>
            {["Advanced", "Intermediate", "Beginner"].map((l, i) => {
              const filled = (level === "Advanced" && i <= 2) || (level === "Intermediate" && i <= 1) || (level === "Beginner" && i === 0);
              return <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: filled ? levelColor : "transparent", border: `1px solid ${filled ? levelColor : "rgba(196,164,118,0.25)"}`, transition: "all 0.2s" }} />;
            })}
          </div>
        ) : (
          <span style={{ fontSize: 10, color: levelColor, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.1em", fontWeight: 600, textTransform: "uppercase", flexShrink: 0 }}>{level}</span>
        )}
      </div>
    </div>
  );
}

/* ─── PROJECT CARD ───────────────────────────────────────────────────────────── */
function ProjectCard({ project, index }) {
  const [hov, setHov] = useState(false);
  const [ref, v] = useReveal(0.1);
  const isMobile = useIsMobile();
  const { id, name, tag, Icon: PIcon, desc, features, stack, github, live } = project;
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(50px)", transition: `all 0.75s cubic-bezier(.23,1,.32,1) ${index * 0.12}s` }}>
      <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{ position: "relative", overflow: "hidden", border: `1px solid ${hov ? "rgba(196,164,118,0.45)" : "rgba(196,164,118,0.12)"}`, background: hov ? "rgba(196,164,118,0.03)" : "rgba(10,10,10,0.85)", transition: "all 0.35s cubic-bezier(.23,1,.32,1)", transform: hov && !isMobile ? "translateY(-4px)" : "none", boxShadow: hov ? "0 24px 60px rgba(0,0,0,0.55)" : "none" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1.5, background: "linear-gradient(90deg,transparent,#c4a476,transparent)", opacity: hov ? 1 : 0, transition: "opacity 0.3s" }} />
        <div style={{ position: "absolute", right: 16, bottom: -20, fontSize: isMobile ? "5rem" : "8rem", fontWeight: 900, color: "rgba(196,164,118,0.04)", fontFamily: "'Playfair Display', Georgia, serif", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>{id}</div>
        <div style={{ padding: isMobile ? "24px 20px" : "32px 36px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(196,164,118,0.07)", border: "1px solid rgba(196,164,118,0.18)", flexShrink: 0 }}>
                <PIcon size={18} color="#c4a476" strokeWidth={1.5} />
              </div>
              <div>
                <p style={{ fontSize: 9.5, letterSpacing: "0.25em", color: "#c4a476", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>{tag}</p>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: isMobile ? "1.25rem" : "1.55rem", color: "#e8e0d5", fontWeight: 700, lineHeight: 1.1, marginTop: 3 }}>{name}</h3>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
              {[{ Icon: Github, href: github }, { Icon: ExternalLink, href: live }].map(({ Icon: LIcon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noreferrer"
                  style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(196,164,118,0.2)", textDecoration: "none", transition: "all 0.2s" }}
                  onMouseOver={e => { e.currentTarget.style.background = "rgba(196,164,118,0.12)"; e.currentTarget.style.borderColor = "rgba(196,164,118,0.45)"; }}
                  onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(196,164,118,0.2)"; }}>
                  <LIcon size={14} color="#c4a476" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
          <p style={{ fontSize: "0.83rem", color: "rgba(232,224,213,0.52)", lineHeight: 1.75, fontFamily: "'DM Sans', sans-serif", marginBottom: 20 }}>{desc}</p>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 8, marginBottom: 22 }}>
            {features.map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "9px 12px", background: "rgba(196,164,118,0.03)", border: "1px solid rgba(196,164,118,0.07)", transition: "all 0.18s" }}
                onMouseOver={e => { e.currentTarget.style.borderColor = "rgba(196,164,118,0.2)"; e.currentTarget.style.background = "rgba(196,164,118,0.06)"; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(196,164,118,0.07)"; e.currentTarget.style.background = "rgba(196,164,118,0.03)"; }}>
                <f.Icon size={11} color="#c4a476" strokeWidth={1.5} style={{ marginTop: 2, flexShrink: 0 }} />
                <span style={{ fontSize: "0.75rem", color: "rgba(232,224,213,0.6)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.55 }}>{f.text}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap", alignItems: "center" }}>
            <Code2 size={11} color="rgba(196,164,118,0.45)" strokeWidth={1.5} />
            {stack.map(t => (
              <span key={t} style={{ fontSize: 10.5, padding: "3px 11px", background: "rgba(196,164,118,0.05)", border: "1px solid rgba(196,164,118,0.18)", color: "#c4a476", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.06em" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── SECTION HEADING ────────────────────────────────────────────────────────── */
function SectionHead({ eyebrow, title, sub }) {
  const [ref, v] = useReveal(0.2);
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(30px)", transition: "all 0.75s cubic-bezier(.23,1,.32,1)", marginBottom: 48 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div style={{ width: 22, height: 1, background: "#c4a476" }} />
        <span style={{ fontSize: 9.5, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c4a476", fontFamily: "'DM Sans', sans-serif" }}>{eyebrow}</span>
      </div>
      <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.8rem, 4.5vw, 3.2rem)", color: "#e8e0d5", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.02em" }}>{title}</h2>
      {sub && <p style={{ fontSize: "0.875rem", color: "rgba(232,224,213,0.42)", marginTop: 12, maxWidth: 500, lineHeight: 1.8, fontFamily: "'DM Sans', sans-serif" }}>{sub}</p>}
    </div>
  );
}

/* ─── ACHIEVEMENT CARD ───────────────────────────────────────────────────────── */
function AchCard({ Icon: AIcon, title, desc, tag, i }) {
  const [ref, v] = useReveal(0.2);
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(40px)", transition: `all 0.75s cubic-bezier(.23,1,.32,1) ${i * 0.1}s` }}>
      <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{ position: "relative", overflow: "hidden", border: `1px solid ${hov ? "rgba(196,164,118,0.4)" : "rgba(196,164,118,0.1)"}`, background: hov ? "rgba(196,164,118,0.04)" : "transparent", padding: "30px 28px", transition: "all 0.3s cubic-bezier(.23,1,.32,1)", boxShadow: hov ? "0 20px 50px rgba(0,0,0,0.45)" : "none" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1.5, background: "linear-gradient(90deg,transparent,#c4a476,transparent)", opacity: hov ? 1 : 0, transition: "opacity 0.3s" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <div style={{ width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(196,164,118,0.08)", border: "1px solid rgba(196,164,118,0.2)", flexShrink: 0 }}>
            <AIcon size={16} color="#c4a476" strokeWidth={1.5} />
          </div>
          <span style={{ fontSize: 9.5, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c4a476", fontFamily: "'DM Sans', sans-serif", padding: "3px 10px", border: "1px solid rgba(196,164,118,0.18)" }}>{tag}</span>
        </div>
        <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.1rem", color: "#e8e0d5", fontWeight: 700, lineHeight: 1.4, marginBottom: 10 }}>{title}</h3>
        <p style={{ fontSize: "0.82rem", color: "rgba(232,224,213,0.48)", lineHeight: 1.75, fontFamily: "'DM Sans', sans-serif" }}>{desc}</p>
      </div>
    </div>
  );
}

/* ─── RESUME MODAL ───────────────────────────────────────────────────────────── */
function ResumeModal({ onClose }) {
  const isMobile = useIsMobile();
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handleKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 2000, background: "rgba(4,4,4,0.88)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", display: "flex", alignItems: "center", justifyContent: "center", padding: isMobile ? "12px" : "24px", animation: "fadeIn 0.25s ease" }}>
      <div onClick={e => e.stopPropagation()} style={{ position: "relative", width: "100%", maxWidth: 860, height: isMobile ? "95vh" : "90vh", display: "flex", flexDirection: "column", border: "1px solid rgba(196,164,118,0.22)", background: "#0d0d0d", boxShadow: "0 40px 100px rgba(0,0,0,0.7)", animation: "slideUp 0.3s cubic-bezier(.23,1,.32,1)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: isMobile ? "12px 14px" : "14px 20px", borderBottom: "1px solid rgba(196,164,118,0.12)", background: "rgba(196,164,118,0.03)", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(196,164,118,0.25)", background: "rgba(196,164,118,0.07)" }}>
              <FileText size={14} color="#c4a476" strokeWidth={1.5} />
            </div>
            <div>
              <p style={{ fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "#c4a476", fontFamily: "'DM Sans', sans-serif" }}>Document Preview</p>
              <p style={{ fontSize: isMobile ? 10 : 12, color: "#e8e0d5", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, marginTop: 1 }}>Sudhanva_Kulkarni_Resume.pdf</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <a href="/Resume.pdf" download="Sudhanva_Kulkarni_Resume.pdf" style={{ display: "flex", alignItems: "center", gap: 7, padding: isMobile ? "7px 12px" : "8px 18px", background: "linear-gradient(135deg,#b8860b,#c4a476,#e8c97a)", color: "#080808", fontSize: 10, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none", transition: "opacity 0.2s" }}
              onMouseOver={e => e.currentTarget.style.opacity = "0.88"} onMouseOut={e => e.currentTarget.style.opacity = "1"}>
              <Download size={11} strokeWidth={2} /> {isMobile ? "" : "Download"}
            </a>
            <button onClick={onClose} style={{ width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(196,164,118,0.2)", background: "transparent", cursor: "pointer", transition: "all 0.2s" }}
              onMouseOver={e => { e.currentTarget.style.background = "rgba(196,164,118,0.1)"; e.currentTarget.style.borderColor = "rgba(196,164,118,0.45)"; }}
              onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(196,164,118,0.2)"; }}>
              <X size={14} color="#c4a476" strokeWidth={1.5} />
            </button>
          </div>
        </div>
        <div style={{ flex: 1, overflow: "hidden", background: "#111" }}>
          <iframe src="/Resume.pdf#toolbar=0&navpanes=0&scrollbar=1" title="Resume Preview" style={{ width: "100%", height: "100%", border: "none", display: "block" }} />
        </div>
        <div style={{ padding: "10px 20px", borderTop: "1px solid rgba(196,164,118,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <p style={{ fontSize: 9.5, color: "rgba(232,224,213,0.22)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.1em" }}>{isMobile ? "Tap outside to close" : "Press ESC or click outside to close"}</p>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#c4a476", boxShadow: "0 0 8px #c4a476", opacity: 0.7 }} />
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN ────────────────────────────────────────────────────────────────────── */
export default function Portfolio() {
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [cScale, setCScale] = useState(1);
  const [active, setActive] = useState("home");
  const [resumeOpen, setResumeOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => { setTimeout(() => setLoaded(true), 120); }, []);

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const observers = [];
    const visibilityMap = {};
    NAV_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(([entry]) => {
        visibilityMap[id] = entry.intersectionRatio;
        const best = Object.entries(visibilityMap).reduce((a, b) => (b[1] > a[1] ? b : a), ["home", 0]);
        setActive(best[0]);
      }, { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1], rootMargin: "-60px 0px -30% 0px" });
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    const fn = (e) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  useEffect(() => {
    if (menuOpen) setMenuOpen(false);
  }, [scrollY]);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMenuOpen(false);
  };

  const navBg = scrollY > 50;
  const MAX = 1160;
  const PAD = isMobile ? "0 20px" : "0 48px";

  return (
    <div style={{ background: "#080808", color: "#e8e0d5", minHeight: "100vh", overflowX: "hidden", width: "100%" }}>

      {resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}

      {/* Custom cursor — desktop only */}
      {!isMobile && (
        <div style={{ position: "fixed", pointerEvents: "none", zIndex: 9999, left: cursor.x, top: cursor.y, transform: `translate(-50%,-50%) scale(${cScale})`, transition: "transform 0.18s cubic-bezier(.23,1,.32,1)" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#c4a476", position: "relative", zIndex: 1 }} />
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 32, height: 32, borderRadius: "50%", border: "1px solid rgba(196,164,118,0.3)" }} />
        </div>
      )}

      {/* Grain */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 100, opacity: 0.28, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")` }} />

      {/* ── NAV ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 500, transition: "all 0.35s ease", background: navBg || menuOpen ? "rgba(12,10,8,0.95)" : "transparent", backdropFilter: navBg ? "blur(28px) saturate(160%)" : "none", WebkitBackdropFilter: navBg ? "blur(28px) saturate(160%)" : "none", borderBottom: navBg ? "1px solid rgba(196,164,118,0.12)" : "none", boxShadow: navBg ? "0 1px 40px rgba(0,0,0,0.35)" : "none" }}>
        <div style={{ maxWidth: MAX, margin: "0 auto", padding: PAD, height: 62, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={() => go("home")} onMouseEnter={() => setCScale(1.8)} onMouseLeave={() => setCScale(1)}
            style={{ background: "none", border: "none", cursor: isMobile ? "pointer" : "none", fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.25rem", fontWeight: 700, color: "#c4a476" }}>S·K</button>

          {!isMobile && (
            <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
              {NAV_SECTIONS.map(s => (
                <button key={s} onClick={() => go(s)} onMouseEnter={() => setCScale(1.4)} onMouseLeave={() => setCScale(1)}
                  style={{ background: "none", border: "none", cursor: "none", fontSize: 10.5, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: active === s ? "#c4a476" : "rgba(232,224,213,0.38)", transition: "color 0.2s", position: "relative", padding: "4px 0" }}>
                  {s}
                  {active === s && <div style={{ position: "absolute", bottom: -1, left: 0, right: 0, height: 1, background: "#c4a476" }} />}
                </button>
              ))}
            </div>
          )}

          {isMobile && (
            <button onClick={() => setMenuOpen(o => !o)}
              style={{ background: "none", border: "1px solid rgba(196,164,118,0.25)", cursor: "pointer", padding: "6px 8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {menuOpen ? <X size={18} color="#c4a476" strokeWidth={1.5} /> : <Menu size={18} color="#c4a476" strokeWidth={1.5} />}
            </button>
          )}
        </div>

        {isMobile && menuOpen && (
          <div style={{ background: "rgba(8,8,8,0.98)", borderTop: "1px solid rgba(196,164,118,0.1)", padding: "8px 0 16px" }}>
            {NAV_SECTIONS.map(s => (
              <button key={s} onClick={() => go(s)}
                style={{ display: "block", width: "100%", background: "none", border: "none", cursor: "pointer", padding: "14px 24px", textAlign: "left", fontSize: 11, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: active === s ? "#c4a476" : "rgba(232,224,213,0.5)", borderLeft: active === s ? "2px solid #c4a476" : "2px solid transparent", transition: "all 0.2s" }}>
                {s}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="home" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <DotGrid />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "65vw", height: "65vh", background: "radial-gradient(ellipse,rgba(196,164,118,0.07) 0%,transparent 68%)", pointerEvents: "none" }} />

        {!isMobile && [
          { side: "left", text: "Portfolio 2025  ·  Full-Stack Developer" },
          { side: "right", text: "Dharwad, Karnataka  ·  Open to Internships" },
        ].map(s => (
          <div key={s.side} style={{ position: "absolute", [s.side]: 20, top: "50%", transform: `translateY(-50%) rotate(${s.side === "left" ? "-" : ""}90deg)`, fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(196,164,118,0.28)", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" }}>{s.text}</div>
        ))}

        <div style={{ maxWidth: MAX, margin: "0 auto", padding: isMobile ? "0 24px" : "0 80px", position: "relative", zIndex: 10, width: "100%", paddingTop: isMobile ? 100 : 80, paddingBottom: isMobile ? 60 : 0 }}>
          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(36px)", transition: "all 0.95s cubic-bezier(.23,1,.32,1) 0.18s" }}>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: isMobile ? "clamp(3rem, 16vw, 5rem)" : "clamp(3.2rem, 8.5vw, 8rem)", fontWeight: 900, lineHeight: 0.9, letterSpacing: "-0.03em", color: "#e8e0d5", margin: 0 }}>
              Sudhanva
              <br />
              <span style={{ WebkitTextStroke: "1.5px rgba(196,164,118,0.5)", color: "transparent", display: "block" }}>Kulkarni</span>
            </h1>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 8 : 16, marginTop: 28, flexWrap: "wrap", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)", transition: "all 0.75s ease 0.35s" }}>
            <Code2 size={14} color="#c4a476" strokeWidth={1.5} />
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: isMobile ? "0.9rem" : "1.05rem", color: "#c4a476", fontStyle: "italic" }}>Full-Stack Developer</span>
          </div>

          {isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8, opacity: loaded ? 1 : 0, transition: "opacity 0.75s ease 0.4s" }}>
              <GraduationCap size={13} color="rgba(232,224,213,0.4)" strokeWidth={1.5} />
              <span style={{ fontSize: "0.78rem", color: "rgba(232,224,213,0.42)", fontFamily: "'DM Sans', sans-serif" }}>KLE Technological University</span>
            </div>
          )}

          <p style={{ fontSize: "0.875rem", color: "rgba(232,224,213,0.48)", lineHeight: 1.85, fontFamily: "'DM Sans', sans-serif", maxWidth: 480, marginTop: 20, opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(16px)", transition: "all 0.75s ease 0.48s" }}>
            2nd-year CSE student building fast, scalable web applications from the ground up — turning ideas into polished, production-ready products with clean code and sharp interfaces.
          </p>

          <div style={{ display: "flex", gap: 10, marginTop: 36, flexWrap: "wrap", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(16px)", transition: "all 0.75s ease 0.6s" }}>
            <button onClick={() => go("projects")} onMouseEnter={() => setCScale(0.5)} onMouseLeave={() => setCScale(1)}
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 22px", background: "linear-gradient(135deg,#b8860b,#c4a476,#e8c97a)", color: "#080808", fontSize: 10, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", border: "none", cursor: isMobile ? "pointer" : "none", boxShadow: "0 6px 24px rgba(196,164,118,0.22)", transition: "opacity 0.2s" }}
              onMouseOver={e => e.currentTarget.style.opacity = "0.88"} onMouseOut={e => e.currentTarget.style.opacity = "1"}>
              <Layers size={12} strokeWidth={2} /> View Projects
            </button>
            <button onClick={() => setResumeOpen(true)} onMouseEnter={() => setCScale(0.5)} onMouseLeave={() => setCScale(1)}
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 22px", background: "transparent", border: "1px solid rgba(196,164,118,0.35)", color: "#c4a476", fontSize: 10, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", cursor: isMobile ? "pointer" : "none", transition: "all 0.22s" }}
              onMouseOver={e => { e.currentTarget.style.background = "rgba(196,164,118,0.09)"; e.currentTarget.style.borderColor = "#c4a476"; }}
              onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(196,164,118,0.35)"; }}>
              <FileText size={12} strokeWidth={1.5} /> View Resume
            </button>
            {[
              { Icon: Github, label: "GitHub", href: "https://github.com/Sudhanva-Kulkarni" },
              { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/sudhanva-kulkarni-210642388" },
            ].map(({ Icon: LIcon, label, href }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" onMouseEnter={() => setCScale(0.5)} onMouseLeave={() => setCScale(1)}
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 22px", background: "transparent", border: "1px solid rgba(196,164,118,0.35)", color: "#c4a476", fontSize: 10, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none", transition: "all 0.22s" }}
                onMouseOver={e => { e.currentTarget.style.background = "rgba(196,164,118,0.09)"; e.currentTarget.style.borderColor = "#c4a476"; }}
                onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(196,164,118,0.35)"; }}>
                <LIcon size={12} strokeWidth={1.5} /> {label}
              </a>
            ))}
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: loaded ? 1 : 0, transition: "opacity 0.75s ease 1.2s" }}>
          <span style={{ fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(196,164,118,0.35)", fontFamily: "'DM Sans', sans-serif" }}>Scroll</span>
          <ChevronDown size={14} color="rgba(196,164,118,0.4)" strokeWidth={1.5} style={{ animation: "bounce 1.8s ease infinite" }} />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "60px 0", position: "relative" }}>
        <div style={{ maxWidth: MAX, margin: "0 auto", padding: PAD }}>
          <SectionHead eyebrow="Who I Am" title={<>Building the <span style={{ color: "#c4a476" }}>future,</span> one commit at a time.</>} />

          {/* Info grid */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 10 : 14 }}>
            {[
              { Icon: GraduationCap, label: "Education", val: "B.E. Computer Science — KLE Technological University, Hubballi (2028)" },
              { Icon: MapPin,        label: "Location",  val: "Dharwad, Karnataka, India" },
              { Icon: Star,          label: "CGPA",      val: "8.88" },
              { Icon: Phone,         label: "Phone",     val: "+91 7899450140" },
              { Icon: Mail,          label: "Email",     val: "sudhanvakulkarni1305@gmail.com" },
            ].map(item => (
              <div key={item.label}
                style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "14px 18px", border: "1px solid rgba(196,164,118,0.07)", background: "rgba(196,164,118,0.02)", transition: "all 0.2s" }}
                onMouseOver={e => { e.currentTarget.style.borderColor = "rgba(196,164,118,0.26)"; e.currentTarget.style.background = "rgba(196,164,118,0.05)"; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(196,164,118,0.07)"; e.currentTarget.style.background = "rgba(196,164,118,0.02)"; }}>
                <item.Icon size={13} color="#c4a476" strokeWidth={1.5} style={{ marginTop: 3, flexShrink: 0 }} />
                <div>
                  <span style={{ fontSize: 9.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "#c4a476", fontFamily: "'DM Sans', sans-serif" }}>{item.label}</span>
                  <p style={{ fontSize: "0.82rem", color: "rgba(232,224,213,0.62)", fontFamily: "'DM Sans', sans-serif", marginTop: 2, lineHeight: 1.5, wordBreak: "break-word" }}>{item.val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ padding: "60px 0", borderTop: "1px solid rgba(196,164,118,0.06)", position: "relative", overflow: "hidden" }}>
        {!isMobile && <div style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", fontFamily: "'Playfair Display', Georgia, serif", fontSize: "20vw", fontWeight: 900, color: "rgba(196,164,118,0.022)", lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>SK</div>}
        <div style={{ maxWidth: MAX, margin: "0 auto", padding: PAD, position: "relative", zIndex: 1 }}>
          <SectionHead eyebrow="Technical Arsenal" title={<>Skills & <span style={{ color: "#c4a476" }}>Technologies</span></>} sub="A growing toolkit built through projects, contests, and relentless curiosity." />
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(auto-fit, minmax(300px, 1fr))", gap: isMobile ? 8 : 28 }}>
            {SKILLS.map((s, i) => <SkillBar key={s.name} {...s} delay={i * 0.055} />)}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ padding: "60px 0", borderTop: "1px solid rgba(196,164,118,0.06)" }}>
        <div style={{ maxWidth: MAX, margin: "0 auto", padding: PAD }}>
          <SectionHead eyebrow="Selected Work" title={<>Things I've <span style={{ color: "#c4a476" }}>Built</span></>} sub="Real-world applications built with modern stacks and shipped to production." />
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── ACHIEVEMENTS ── */}
      <section style={{ padding: "60px 0", borderTop: "1px solid rgba(196,164,118,0.06)" }}>
        <div style={{ maxWidth: MAX, margin: "0 auto", padding: PAD }}>
          <SectionHead eyebrow="Recognition" title={<>Achievements & <span style={{ color: "#c4a476" }}>Highlights</span></>} />
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(340px, 1fr))", gap: 22 }}>
            {[
              { Icon: Trophy, title: "4th Place — Algoblitz 2.0", desc: "Secured 4th place in the Algoblitz 2.0 competitive coding contest, competing against some of the sharpest minds in the field.", tag: "Competitive Coding" },
              { Icon: Rocket, title: "Finalist — HackTU 7.0", desc: "Selected as one of 120 finalist teams from 6,000+ applicants. Hosted by Major League Hacking at Thapar Institute of Technology, Patiala.", tag: "Hackathon" },
            ].map((a, i) => <AchCard key={i} {...a} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: "60px 0", borderTop: "1px solid rgba(196,164,118,0.06)", position: "relative", overflow: "hidden" }}>
        {!isMobile && <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", fontFamily: "'Playfair Display', Georgia, serif", fontSize: "20vw", fontWeight: 900, color: "rgba(196,164,118,0.018)", lineHeight: 1, pointerEvents: "none", userSelect: "none", whiteSpace: "nowrap" }}>HELLO</div>}
        <div style={{ maxWidth: 720, margin: "0 auto", padding: PAD, position: "relative", zIndex: 1, textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
            <div style={{ width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(196,164,118,0.25)", background: "rgba(196,164,118,0.07)" }}>
              <Mail size={22} color="#c4a476" strokeWidth={1.5} />
            </div>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2rem, 7vw, 3.8rem)", fontWeight: 700, color: "#e8e0d5", lineHeight: 1.08, marginBottom: 18 }}>
            Let's build something<br /><span style={{ color: "#c4a476" }}>remarkable.</span>
          </h2>
          <p style={{ fontSize: "0.875rem", color: "rgba(232,224,213,0.42)", lineHeight: 1.85, fontFamily: "'DM Sans', sans-serif", marginBottom: 40 }}>
            Actively seeking internship opportunities in full-stack or AI development. If you're working on something exciting, I'd love to be part of it.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 44 }}>
            <a href="mailto:sudhanvakulkarni1305@gmail.com" onMouseEnter={() => setCScale(0.5)} onMouseLeave={() => setCScale(1)}
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "13px 24px", background: "linear-gradient(135deg,#b8860b,#c4a476,#e8c97a)", color: "#080808", fontSize: 11, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none", boxShadow: "0 6px 22px rgba(196,164,118,0.22)", transition: "opacity 0.2s" }}
              onMouseOver={e => e.currentTarget.style.opacity = "0.88"} onMouseOut={e => e.currentTarget.style.opacity = "1"}>
              <Mail size={12} strokeWidth={2} /> Send an Email
            </a>
            <a href="https://www.linkedin.com/in/sudhanva-kulkarni-210642388" target="_blank" rel="noreferrer" onMouseEnter={() => setCScale(0.5)} onMouseLeave={() => setCScale(1)}
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "13px 24px", background: "transparent", border: "1px solid rgba(196,164,118,0.38)", color: "#c4a476", fontSize: 11, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none", transition: "all 0.2s" }}
              onMouseOver={e => { e.currentTarget.style.background = "rgba(196,164,118,0.09)"; e.currentTarget.style.borderColor = "#c4a476"; }}
              onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(196,164,118,0.38)"; }}>
              <Linkedin size={12} strokeWidth={1.5} /> LinkedIn
            </a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 12 }}>
            {[
              { Icon: Mail, label: "Email", val: "sudhanvakulkarni1305@gmail.com", href: "mailto:sudhanvakulkarni1305@gmail.com" },
              { Icon: Github, label: "GitHub", val: "Sudhanva-Kulkarni", href: "https://github.com/Sudhanva-Kulkarni" },
              { Icon: Linkedin, label: "LinkedIn", val: "sudhanva-kulkarni", href: "https://www.linkedin.com/in/sudhanva-kulkarni-210642388" },
              { Icon: Phone, label: "Phone", val: "+91 7899450140", href: "tel:+917899450140" },
            ].map(c => (
              <a key={c.label} href={c.href} target="_blank" rel="noreferrer" onMouseEnter={() => setCScale(1.4)} onMouseLeave={() => setCScale(1)}
                style={{ padding: "20px 14px", border: "1px solid rgba(196,164,118,0.1)", background: "rgba(196,164,118,0.02)", textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 7, transition: "all 0.22s" }}
                onMouseOver={e => { e.currentTarget.style.borderColor = "rgba(196,164,118,0.38)"; e.currentTarget.style.background = "rgba(196,164,118,0.06)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(196,164,118,0.1)"; e.currentTarget.style.background = "rgba(196,164,118,0.02)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <c.Icon size={18} color="#c4a476" strokeWidth={1.5} />
                <span style={{ fontSize: 9.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "#c4a476", fontFamily: "'DM Sans', sans-serif" }}>{c.label}</span>
                <span style={{ fontSize: 10, color: "rgba(232,224,213,0.32)", fontFamily: "'DM Sans', sans-serif", textAlign: "center", wordBreak: "break-all" }}>{c.val}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid rgba(196,164,118,0.07)", padding: isMobile ? "20px 24px" : "24px 48px" }}>
        <div style={{ maxWidth: MAX, margin: "0 auto", display: "flex", justifyContent: isMobile ? "center" : "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, textAlign: isMobile ? "center" : "left" }}>
          <p style={{ fontSize: 10.5, color: "rgba(232,224,213,0.18)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.1em" }}>© 2025 Sudhanva S Kulkarni</p>
          {!isMobile && <p style={{ fontSize: 10.5, color: "rgba(232,224,213,0.14)", fontFamily: "'DM Sans', sans-serif" }}>Built with React · Passion · Coffee</p>}
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #080808; }
        @media (hover: none) { body { cursor: auto !important; } a, button { cursor: pointer !important; } }
        @media (hover: hover) { body { cursor: none !important; } a, button { cursor: none !important; } }
        @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(5px); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(32px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>
    </div>
  );
}