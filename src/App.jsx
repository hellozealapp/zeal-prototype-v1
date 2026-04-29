import { useState, useRef } from "react";

const profiles = [
  {
    id: 1, name: "Dani R.", location: "Oakland, CA",
    mediums: ["Songwriter", "Producer", "Vocalist"],
    vibe: "Making melancholy bops. Looking for someone to co-write with — doesn't matter if you're new to it.",
    seeking: ["Lyricist", "Guitarist", "Beatmaker"],
    color: "#C8F5A0", verified: true,
  },
  {
    id: 2, name: "Marcus T.", location: "Brooklyn, NY",
    mediums: ["Choreographer", "Dancer", "Filmmaker"],
    vibe: "Want to shoot a short dance film in the subway tunnels. Need a DP and someone who moves.",
    seeking: ["Cinematographer", "Dancer", "Editor"],
    color: "#FFD6A5", verified: false,
  },
  {
    id: 3, name: "Priya K.", location: "Los Angeles, CA",
    mediums: ["Playwright", "Poet", "Director"],
    vibe: "Writing a one-act play about immigration and memory. Looking for anyone who wants to help.",
    seeking: ["Actor", "Set Designer", "Composer"],
    color: "#BDB2FF", verified: true,
  },
  {
    id: 4, name: "Eli M.", location: "Chicago, IL",
    mediums: ["Illustrator", "Muralist", "Zine Maker"],
    vibe: "Making a zine about queer joy in the midwest. Writers, photographers, poets — slide in.",
    seeking: ["Writer", "Photographer", "Poet"],
    color: "#FF9AA2", verified: false,
  },
];

const projects = [
  { id: 1, title: "Park Shakespeare: A Midsummer", creator: "Yolanda F.", type: "Theater", desc: "Putting on a free performance in Dolores Park this August. All experience levels welcome.", needs: ["Actors", "Costume Designer", "Sound"], spots: 6, emoji: "🎭", tagColor: "#FFD6A5" },
  { id: 2, title: "Ambient Score for a Short Film", creator: "Jin L.", type: "Music + Film", desc: "I have a 12-min short film that needs an original score. Looking for a composer who vibes with experimental ambient.", needs: ["Composer", "Sound Designer"], spots: 1, emoji: "🎬", tagColor: "#C8F5A0" },
  { id: 3, title: "Dance Music Video — No Budget, All Vision", creator: "Amara S.", type: "Dance + Film", desc: "Shooting a visual for an original track. Need dancers who aren't afraid to look weird. Bharatanatyam meets krump energy.", needs: ["Dancers", "Cinematographer", "Stylist"], spots: 4, emoji: "💃", tagColor: "#BDB2FF" },
  { id: 4, title: "Zine: 'What Does Home Sound Like?'", creator: "Theo R.", type: "Print + Writing", desc: "Open call for pieces about diaspora and sound. Submit a poem, a playlist annotation, an essay — anything.", needs: ["Writers", "Illustrators", "Photographers"], spots: 12, emoji: "📖", tagColor: "#FF9AA2" },
];

const events = [
  { id: 1, title: "Open Mic: No Covers, No Rules", host: "The Starline Social Club", location: "Oakland, CA", date: "Fri, May 2", time: "7:00 PM", type: "Music", desc: "A genuinely judgment-free open mic. Bring 5 minutes of whatever — half-finished songs welcome.", going: 34, tags: ["Musicians", "Poets", "Comedians"], color: "#C8F5A0", emoji: "🎤", featured: true },
  { id: 2, title: "Figure Drawing Drop-In", host: "Vida Arts", location: "Mission District, SF", date: "Sat, May 3", time: "2:00 PM", type: "Visual Art", desc: "Weekly figure drawing session. Model provided, bring your own supplies. All skill levels.", going: 18, tags: ["Illustrators", "Painters", "Sculptors"], color: "#FFD6A5", emoji: "✏️", featured: false },
  { id: 3, title: "Bollywood Dance Social", host: "Desi Creatives Bay Area", location: "San Jose, CA", date: "Sat, May 3", time: "5:30 PM", type: "Dance", desc: "Come dance, meet other desi artists, talk about what you're working on. Beginners always welcome. Chai provided.", going: 52, tags: ["Dancers", "Choreographers", "Musicians"], color: "#FF9AA2", emoji: "💃", featured: true },
  { id: 4, title: "Poets in the Park", host: "Bay Area Literary Arts", location: "Dolores Park, SF", date: "Sun, May 4", time: "11:00 AM", type: "Writing", desc: "Bring something you wrote. Or just listen. Blankets and good vibes.", going: 27, tags: ["Poets", "Writers", "Everyone"], color: "#BDB2FF", emoji: "📝", featured: false },
  { id: 5, title: "Lo-Fi Jam Session", host: "Organized by Ren M.", location: "Temescal, Oakland", date: "Tue, May 6", time: "6:00 PM", type: "Music", desc: "Living room jam, 8 people max. Mostly jazz/soul/hip-hop adjacent. BYO instrument, snacks to share.", going: 7, tags: ["Producers", "Instrumentalists", "Vocalists"], color: "#C8F5A0", emoji: "🎸", featured: false },
];

const tabs = ["Discover", "Projects", "Events", "Profile"];
const tabIcons = { Discover: "✦", Projects: "◎", Events: "◈", Profile: "◐" };
const filterTypes = ["All", "Music", "Dance", "Visual Art", "Writing", "Theater"];

const socialPlatforms = [
  { key: "substack", label: "Substack", icon: "✍︎", placeholder: "yourname.substack.com", color: "#FF6719" },
  { key: "instagram", label: "Instagram", icon: "◉", placeholder: "@yourhandle", color: "#E1306C" },
  { key: "soundcloud", label: "SoundCloud", icon: "☁", placeholder: "soundcloud.com/you", color: "#FF5500" },
  { key: "youtube", label: "YouTube", icon: "▶", placeholder: "youtube.com/@you", color: "#FF0000" },
  { key: "website", label: "Website", icon: "⊕", placeholder: "yoursite.com", color: "#C8F5A0" },
  { key: "tiktok", label: "TikTok", icon: "♪", placeholder: "@yourhandle", color: "#69C9D0" },
];

const sampleVideos = [
  { id: 1, label: "Bharatanatyam piece, 2024", duration: "2:14", thumb: "#1a1a1a" },
  { id: 2, label: "Choreography sketch — untitled", duration: "0:47", thumb: "#1e1a2e" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("Discover");
  const [cardIndex, setCardIndex] = useState(0);
  const [swipeDir, setSwipeDir] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [matched, setMatched] = useState(false);
  const [eventFilter, setEventFilter] = useState("All");
  const [rsvpd, setRsvpd] = useState({});

  // Profile state
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState("unverified"); // unverified | pending | verified
  const [videos, setVideos] = useState(sampleVideos);
  const [socialLinks, setSocialLinks] = useState({ substack: "", instagram: "", soundcloud: "", youtube: "", website: "", tiktok: "" });
  const [editingSocial, setEditingSocial] = useState(null);
  const [socialInput, setSocialInput] = useState("");
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [activeProfileSection, setActiveProfileSection] = useState("about");

  const photoInputRef = useRef();
  const videoInputRef = useRef();

  const current = profiles[cardIndex % profiles.length];

  const swipe = (dir) => {
    if (animating) return;
    setSwipeDir(dir); setAnimating(true);
    if (dir === "right") setTimeout(() => setMatched(true), 300);
    setTimeout(() => {
      setCardIndex((i) => i + 1);
      setSwipeDir(null); setAnimating(false);
      if (dir === "right") setTimeout(() => setMatched(false), 1600);
    }, 450);
  };

  const toggleRsvp = (id) => setRsvpd((r) => ({ ...r, [id]: !r[id] }));
  const featuredEvent = events.find((e) => e.featured);
  const filteredEvents = eventFilter === "All" ? events : events.filter((e) => e.type === eventFilter);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfilePhoto(URL.createObjectURL(file));
  };

  const handleVerify = () => {
    setShowVerifyModal(false);
    setVerificationStatus("pending");
    setTimeout(() => setVerificationStatus("verified"), 2000);
  };

  const saveSocialLink = () => {
    if (editingSocial) {
      setSocialLinks((l) => ({ ...l, [editingSocial]: socialInput }));
      setEditingSocial(null);
      setSocialInput("");
    }
  };

  const connectedSocials = socialPlatforms.filter((p) => socialLinks[p.key]);
  const unconnectedSocials = socialPlatforms.filter((p) => !socialLinks[p.key]);

  return (
    <div style={{
      fontFamily: "'Georgia', 'Times New Roman', serif",
      background: "#0a0a0a", minHeight: "100vh",
      maxWidth: 420, margin: "0 auto",
      display: "flex", flexDirection: "column",
      position: "relative", overflow: "hidden",
    }}>
      {/* Header */}
      <div style={{ padding: "20px 24px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 26, fontWeight: 700, color: "#f0ece4", letterSpacing: "-0.5px", fontStyle: "italic" }}>collab.</div>
        <div
          onClick={() => setActiveTab("Profile")}
          style={{
            width: 38, height: 38, borderRadius: "50%", cursor: "pointer",
            background: profilePhoto ? "transparent" : "linear-gradient(135deg, #C8F5A0, #BDB2FF)",
            overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, color: "#0a0a0a", fontWeight: 700,
            border: verificationStatus === "verified" ? "2px solid #C8F5A0" : "none",
          }}>
          {profilePhoto
            ? <img src={profilePhoto} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : "M"}
        </div>
      </div>

      {/* Match toast */}
      {matched && (
        <div style={{
          position: "absolute", top: 68, left: "50%", transform: "translateX(-50%)",
          background: "#C8F5A0", color: "#0a0a0a", padding: "10px 24px",
          borderRadius: 999, fontSize: 13, fontWeight: 700, letterSpacing: 1,
          zIndex: 100, whiteSpace: "nowrap", animation: "popIn 0.25s ease",
        }}>✦ You matched!</div>
      )}

      {/* Verify Modal */}
      {showVerifyModal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
          zIndex: 200, display: "flex", alignItems: "flex-end",
        }}>
          <div style={{
            background: "#141414", borderRadius: "24px 24px 0 0",
            padding: 28, width: "100%", maxWidth: 420, margin: "0 auto",
            border: "1px solid #222", borderBottom: "none",
            animation: "slideUp 0.3s ease",
          }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#f0ece4", fontStyle: "italic", marginBottom: 8 }}>
              Get Verified ✦
            </div>
            <div style={{ fontSize: 13, color: "#888", lineHeight: 1.6, marginBottom: 20 }}>
              Submit a 360° photo or short selfie video so other members know you're a real person. No portfolio needed — this is just about authenticity, not skill level.
            </div>
            <div style={{
              background: "#1a1a1a", borderRadius: 16, padding: 20,
              border: "1px dashed #333", textAlign: "center", marginBottom: 16, cursor: "pointer",
            }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📷</div>
              <div style={{ fontSize: 13, color: "#888" }}>Tap to upload a 360° photo or selfie video</div>
              <div style={{ fontSize: 11, color: "#555", marginTop: 4 }}>MP4, MOV, JPG · max 50MB</div>
            </div>
            <div style={{ fontSize: 11, color: "#555", marginBottom: 20, lineHeight: 1.6 }}>
              Your verification media is only used for identity review. It's never shown publicly on your profile.
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowVerifyModal(false)} style={{
                flex: 1, padding: "12px", background: "#1a1a1a", border: "1px solid #2e2e2e",
                borderRadius: 12, color: "#888", fontSize: 13, cursor: "pointer", fontFamily: "Georgia, serif",
              }}>Cancel</button>
              <button onClick={handleVerify} style={{
                flex: 2, padding: "12px", background: "#C8F5A0", border: "none",
                borderRadius: 12, color: "#0a0a0a", fontSize: 13, fontWeight: 700,
                cursor: "pointer", fontFamily: "Georgia, serif",
              }}>Submit for Review →</button>
            </div>
          </div>
        </div>
      )}

      {/* Social Link Modal */}
      {editingSocial && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
          zIndex: 200, display: "flex", alignItems: "flex-end",
        }}>
          <div style={{
            background: "#141414", borderRadius: "24px 24px 0 0",
            padding: 28, width: "100%", maxWidth: 420, margin: "0 auto",
            border: "1px solid #222", borderBottom: "none",
            animation: "slideUp 0.3s ease",
          }}>
            {(() => {
              const plat = socialPlatforms.find((p) => p.key === editingSocial);
              return <>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#f0ece4", fontStyle: "italic", marginBottom: 4 }}>
                  Add {plat.label}
                </div>
                <div style={{ fontSize: 13, color: "#666", marginBottom: 20 }}>
                  This is optional — share only what you're comfortable with.
                </div>
                <input
                  autoFocus
                  value={socialInput}
                  onChange={(e) => setSocialInput(e.target.value)}
                  placeholder={plat.placeholder}
                  style={{
                    width: "100%", padding: "14px 16px",
                    background: "#1a1a1a", border: "1px solid #2e2e2e",
                    borderRadius: 12, color: "#f0ece4", fontSize: 14,
                    fontFamily: "Georgia, serif", outline: "none",
                    boxSizing: "border-box", marginBottom: 16,
                  }}
                />
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => { setEditingSocial(null); setSocialInput(""); }} style={{
                    flex: 1, padding: "12px", background: "#1a1a1a", border: "1px solid #2e2e2e",
                    borderRadius: 12, color: "#888", fontSize: 13, cursor: "pointer", fontFamily: "Georgia, serif",
                  }}>Cancel</button>
                  <button onClick={saveSocialLink} style={{
                    flex: 2, padding: "12px", background: plat.color, border: "none",
                    borderRadius: 12, color: "#0a0a0a", fontSize: 13, fontWeight: 700,
                    cursor: "pointer", fontFamily: "Georgia, serif",
                  }}>Save →</button>
                </div>
              </>;
            })()}
          </div>
        </div>
      )}

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 80 }}>

        {/* DISCOVER */}
        {activeTab === "Discover" && (
          <div style={{ padding: "0 16px" }}>
            <p style={{ color: "#666", fontSize: 13, margin: "4px 0 20px", paddingLeft: 8 }}>Find your people. Start something.</p>
            <div style={{ position: "relative", height: 480 }}>
              <div style={{
                position: "absolute", top: 8, left: "50%",
                transform: "translateX(-50%) scale(0.96)",
                width: "100%", height: 440,
                background: profiles[(cardIndex + 1) % profiles.length].color,
                borderRadius: 24, opacity: 0.35,
              }} />
              <div style={{
                position: "absolute", top: 0, left: "50%",
                transform: `translateX(-50%) ${swipeDir === "left" ? "translateX(-130%) rotate(-14deg)" : swipeDir === "right" ? "translateX(130%) rotate(14deg)" : ""}`,
                transition: animating ? "transform 0.4s cubic-bezier(0.4,0,0.2,1)" : "none",
                width: "100%", height: 440, background: current.color,
                borderRadius: 24, padding: 28, boxSizing: "border-box",
                display: "flex", flexDirection: "column", justifyContent: "space-between",
              }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ fontSize: 26, fontWeight: 700, color: "#0a0a0a", fontStyle: "italic" }}>{current.name}</div>
                        {current.verified && (
                          <span style={{
                            background: "#0a0a0a", color: current.color,
                            fontSize: 10, fontWeight: 700, padding: "3px 8px",
                            borderRadius: 999, letterSpacing: 0.5,
                          }}>✦ verified</span>
                        )}
                      </div>
                      <div style={{ fontSize: 12, color: "#333", marginTop: 2 }}>📍 {current.location}</div>
                    </div>
                    <div style={{
                      width: 52, height: 52, borderRadius: "50%",
                      background: "#0a0a0a", display: "flex", alignItems: "center",
                      justifyContent: "center", color: current.color,
                      fontWeight: 700, fontSize: 20, fontStyle: "italic",
                    }}>{current.name[0]}</div>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 16 }}>
                    {current.mediums.map((m) => (
                      <span key={m} style={{
                        background: "rgba(0,0,0,0.13)", color: "#0a0a0a",
                        fontSize: 10, fontWeight: 700, padding: "4px 10px",
                        borderRadius: 999, letterSpacing: 0.5, textTransform: "uppercase",
                      }}>{m}</span>
                    ))}
                  </div>
                  <div style={{ marginTop: 20, fontSize: 15, color: "#1a1a1a", lineHeight: 1.65, fontStyle: "italic" }}>
                    "{current.vibe}"
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#444", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Looking for</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {current.seeking.map((s) => (
                      <span key={s} style={{
                        background: "#0a0a0a", color: current.color,
                        fontSize: 10, fontWeight: 700, padding: "4px 10px",
                        borderRadius: 999, letterSpacing: 0.5, textTransform: "uppercase",
                      }}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 20 }}>
              <button onClick={() => swipe("left")} style={{
                width: 60, height: 60, borderRadius: "50%",
                background: "#1a1a1a", border: "1px solid #2e2e2e",
                color: "#666", fontSize: 20, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>✕</button>
              <button onClick={() => swipe("right")} style={{
                width: 60, height: 60, borderRadius: "50%",
                background: "#C8F5A0", border: "none",
                color: "#0a0a0a", fontSize: 20, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700,
              }}>✦</button>
            </div>
            <p style={{ textAlign: "center", color: "#444", fontSize: 10, marginTop: 10, letterSpacing: 1 }}>PASS · CONNECT</p>
          </div>
        )}

        {/* PROJECTS */}
        {activeTab === "Projects" && (
          <div style={{ padding: "0 16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, paddingLeft: 8 }}>
              <p style={{ color: "#666", fontSize: 13, margin: 0 }}>Open calls & collabs.</p>
              <button style={{
                background: "#C8F5A0", color: "#0a0a0a", border: "none",
                borderRadius: 999, padding: "6px 14px",
                fontSize: 10, fontWeight: 700, letterSpacing: 0.5, cursor: "pointer", textTransform: "uppercase",
              }}>+ Post</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {projects.map((p) => (
                <div key={p.id} style={{ background: "#141414", borderRadius: 20, padding: 22, border: "1px solid #222" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <span style={{ fontSize: 26 }}>{p.emoji}</span>
                    <span style={{
                      background: p.tagColor, color: "#0a0a0a",
                      fontSize: 10, fontWeight: 700, padding: "3px 10px",
                      borderRadius: 999, letterSpacing: 0.5, textTransform: "uppercase",
                    }}>{p.type}</span>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#f0ece4", marginTop: 10, fontStyle: "italic" }}>{p.title}</div>
                  <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>by {p.creator}</div>
                  <div style={{ fontSize: 13, color: "#999", marginTop: 10, lineHeight: 1.6 }}>{p.desc}</div>
                  <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                      {p.needs.map((n) => (
                        <span key={n} style={{
                          background: "#222", color: "#888",
                          fontSize: 10, padding: "3px 8px", borderRadius: 999, fontWeight: 700,
                        }}>{n}</span>
                      ))}
                    </div>
                    <span style={{ color: "#444", fontSize: 11 }}>{p.spots} spots</span>
                  </div>
                  <button style={{
                    marginTop: 14, width: "100%", padding: "10px",
                    background: "transparent", border: "1px solid #2e2e2e",
                    borderRadius: 12, color: "#f0ece4", fontSize: 13, fontWeight: 700,
                    cursor: "pointer", letterSpacing: 0.5, fontFamily: "Georgia, serif",
                  }}>Express Interest →</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EVENTS */}
        {activeTab === "Events" && (
          <div style={{ padding: "0 16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4, paddingLeft: 8 }}>
              <p style={{ color: "#666", fontSize: 13, margin: 0 }}>Things worth showing up to.</p>
              <button style={{
                background: "#FFD6A5", color: "#0a0a0a", border: "none",
                borderRadius: 999, padding: "6px 14px",
                fontSize: 10, fontWeight: 700, letterSpacing: 0.5, cursor: "pointer", textTransform: "uppercase",
              }}>+ List</button>
            </div>
            <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "12px 8px", scrollbarWidth: "none" }}>
              {filterTypes.map((f) => (
                <button key={f} onClick={() => setEventFilter(f)} style={{
                  background: eventFilter === f ? "#f0ece4" : "#1a1a1a",
                  color: eventFilter === f ? "#0a0a0a" : "#555",
                  border: eventFilter === f ? "none" : "1px solid #222",
                  borderRadius: 999, padding: "6px 14px",
                  fontSize: 10, fontWeight: 700, letterSpacing: 0.5,
                  cursor: "pointer", whiteSpace: "nowrap",
                  fontFamily: "Georgia, serif", textTransform: "uppercase", transition: "all 0.15s",
                }}>{f}</button>
              ))}
            </div>
            {eventFilter === "All" && featuredEvent && (
              <div style={{
                background: featuredEvent.color, borderRadius: 20,
                padding: 22, marginBottom: 16,
                position: "relative", overflow: "hidden",
              }}>
                <div style={{ position: "absolute", top: -20, right: -10, fontSize: 90, opacity: 0.15, userSelect: "none", lineHeight: 1 }}>{featuredEvent.emoji}</div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#333", marginBottom: 8 }}>✦ Happening Soon</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#0a0a0a", fontStyle: "italic", lineHeight: 1.3 }}>{featuredEvent.title}</div>
                <div style={{ fontSize: 12, color: "#333", marginTop: 6 }}>{featuredEvent.date} · {featuredEvent.time} · {featuredEvent.location}</div>
                <div style={{ fontSize: 13, color: "#1a1a1a", marginTop: 10, lineHeight: 1.6 }}>{featuredEvent.desc}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14 }}>
                  <div style={{ fontSize: 12, color: "#444" }}><span style={{ fontWeight: 700, color: "#222" }}>{featuredEvent.going + (rsvpd[featuredEvent.id] ? 1 : 0)}</span> going</div>
                  <button onClick={() => toggleRsvp(featuredEvent.id)} style={{
                    background: "#0a0a0a", color: featuredEvent.color, border: "none",
                    borderRadius: 999, padding: "8px 18px", fontSize: 12, fontWeight: 700,
                    cursor: "pointer", fontFamily: "Georgia, serif", letterSpacing: 0.5,
                  }}>{rsvpd[featuredEvent.id] ? "✓ Going" : "I'm in →"}</button>
                </div>
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {filteredEvents.filter((e) => eventFilter !== "All" || !e.featured).map((e) => (
                <div key={e.id} style={{
                  background: "#141414", borderRadius: 18, padding: "18px 20px",
                  border: "1px solid #1e1e1e", display: "flex", gap: 14, alignItems: "flex-start",
                }}>
                  <div style={{
                    minWidth: 50, textAlign: "center", background: "#1a1a1a",
                    borderRadius: 12, padding: "10px 6px",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
                    border: "1px solid #222",
                  }}>
                    <div style={{ fontSize: 20 }}>{e.emoji}</div>
                    <div style={{ fontSize: 9, color: "#555", fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", marginTop: 4 }}>{e.date.split(",")[0]}</div>
                    <div style={{ fontSize: 14, color: "#f0ece4", fontWeight: 700 }}>{e.date.split(" ")[1]}</div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#f0ece4", fontStyle: "italic", lineHeight: 1.3, flex: 1 }}>{e.title}</div>
                      <span style={{
                        background: e.color, color: "#0a0a0a",
                        fontSize: 9, fontWeight: 700, padding: "3px 8px",
                        borderRadius: 999, letterSpacing: 0.5, textTransform: "uppercase",
                        whiteSpace: "nowrap", flexShrink: 0,
                      }}>{e.type}</span>
                    </div>
                    <div style={{ fontSize: 11, color: "#555", marginTop: 4 }}>{e.time} · {e.location}</div>
                    <div style={{ fontSize: 12, color: "#888", marginTop: 6, lineHeight: 1.5 }}>{e.desc}</div>
                    <div style={{ display: "flex", gap: 5, marginTop: 10, flexWrap: "wrap" }}>
                      {e.tags.map((t) => (
                        <span key={t} style={{ background: "#222", color: "#666", fontSize: 9, padding: "2px 8px", borderRadius: 999, fontWeight: 700 }}>{t}</span>
                      ))}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
                      <div style={{ fontSize: 11, color: "#444" }}><span style={{ color: "#666", fontWeight: 700 }}>{e.going + (rsvpd[e.id] ? 1 : 0)}</span> going</div>
                      <button onClick={() => toggleRsvp(e.id)} style={{
                        background: rsvpd[e.id] ? "#1e1e1e" : e.color,
                        color: rsvpd[e.id] ? "#f0ece4" : "#0a0a0a",
                        border: rsvpd[e.id] ? "1px solid #333" : "none",
                        borderRadius: 999, padding: "5px 14px",
                        fontSize: 11, fontWeight: 700, cursor: "pointer",
                        fontFamily: "Georgia, serif", transition: "all 0.15s",
                      }}>{rsvpd[e.id] ? "✓ Going" : "I'm in"}</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ height: 20 }} />
          </div>
        )}

        {/* PROFILE */}
        {activeTab === "Profile" && (
          <div>
            {/* Hero section */}
            <div style={{ position: "relative", padding: "0 20px 0" }}>
              {/* Photo + name row */}
              <div style={{ display: "flex", alignItems: "flex-end", gap: 16, marginBottom: 16 }}>
                {/* Avatar */}
                <div style={{ position: "relative" }}>
                  <div
                    onClick={() => photoInputRef.current.click()}
                    style={{
                      width: 88, height: 88, borderRadius: "50%",
                      background: profilePhoto ? "transparent" : "linear-gradient(135deg, #BDB2FF, #C8F5A0)",
                      overflow: "hidden", cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 32, color: "#0a0a0a", fontWeight: 700, fontStyle: "italic",
                      border: verificationStatus === "verified" ? "2.5px solid #C8F5A0" : "2.5px solid #2a2a2a",
                      flexShrink: 0,
                    }}>
                    {profilePhoto
                      ? <img src={profilePhoto} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      : "M"}
                  </div>
                  {/* Camera overlay */}
                  <div
                    onClick={() => photoInputRef.current.click()}
                    style={{
                      position: "absolute", bottom: 2, right: 2,
                      width: 26, height: 26, borderRadius: "50%",
                      background: "#f0ece4", display: "flex", alignItems: "center",
                      justifyContent: "center", fontSize: 13, cursor: "pointer",
                      border: "2px solid #0a0a0a",
                    }}>📷</div>
                  <input ref={photoInputRef} type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: "none" }} />
                </div>

                {/* Name + verification */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: "#f0ece4", fontStyle: "italic" }}>Mounika</div>
                  <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>📍 Bay Area, CA</div>
                  {/* Verification badge */}
                  <div style={{ marginTop: 8 }}>
                    {verificationStatus === "verified" && (
                      <span style={{
                        background: "#C8F5A0", color: "#0a0a0a",
                        fontSize: 10, fontWeight: 700, padding: "3px 10px",
                        borderRadius: 999, letterSpacing: 0.5,
                      }}>✦ Verified</span>
                    )}
                    {verificationStatus === "pending" && (
                      <span style={{
                        background: "#FFD6A5", color: "#0a0a0a",
                        fontSize: 10, fontWeight: 700, padding: "3px 10px",
                        borderRadius: 999, letterSpacing: 0.5,
                      }}>⏳ Verification pending</span>
                    )}
                    {verificationStatus === "unverified" && (
                      <button onClick={() => setShowVerifyModal(true)} style={{
                        background: "transparent", border: "1px dashed #444",
                        borderRadius: 999, padding: "3px 10px",
                        color: "#888", fontSize: 10, fontWeight: 700,
                        cursor: "pointer", letterSpacing: 0.5,
                        fontFamily: "Georgia, serif",
                      }}>Get verified →</button>
                    )}
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div style={{
                fontSize: 14, color: "#aaa", lineHeight: 1.7,
                fontStyle: "italic", marginBottom: 20, paddingLeft: 2,
              }}>
                "Choreographer, writer, and cultural storyteller. Exploring queerness in myth through movement and words."
              </div>

              {/* Section tabs */}
              <div style={{ display: "flex", gap: 0, borderBottom: "1px solid #1e1e1e", marginBottom: 20 }}>
                {["about", "work", "links"].map((s) => (
                  <button key={s} onClick={() => setActiveProfileSection(s)} style={{
                    flex: 1, background: "none", border: "none",
                    borderBottom: activeProfileSection === s ? "2px solid #C8F5A0" : "2px solid transparent",
                    color: activeProfileSection === s ? "#f0ece4" : "#555",
                    fontSize: 11, fontWeight: 700, padding: "8px 0 12px",
                    cursor: "pointer", letterSpacing: 1, textTransform: "uppercase",
                    fontFamily: "Georgia, serif", transition: "all 0.15s",
                    marginBottom: -1,
                  }}>{s}</button>
                ))}
              </div>
            </div>

            {/* ABOUT section */}
            {activeProfileSection === "about" && (
              <div style={{ padding: "0 20px" }}>
                <div style={{ marginBottom: 22 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#444", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>My Mediums</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {["Bharatanatyam", "Choreographer", "Writer", "Storyteller"].map((m) => (
                      <span key={m} style={{
                        background: "#1a1a1a", color: "#f0ece4", fontSize: 12,
                        fontWeight: 700, padding: "7px 14px", borderRadius: 999, border: "1px solid #2e2e2e",
                      }}>{m}</span>
                    ))}
                    <span style={{
                      background: "transparent", color: "#444", fontSize: 12,
                      fontWeight: 700, padding: "7px 14px", borderRadius: 999,
                      border: "1px dashed #2e2e2e", cursor: "pointer",
                    }}>+ Add</span>
                  </div>
                </div>

                <div style={{ marginBottom: 22 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#444", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>Open To</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {["Dance Film", "Music Collab", "Writing Together", "Theater"].map((m) => (
                      <span key={m} style={{ background: "#BDB2FF", color: "#0a0a0a", fontSize: 12, fontWeight: 700, padding: "7px 14px", borderRadius: 999 }}>{m}</span>
                    ))}
                  </div>
                </div>

                <div style={{ background: "#141414", borderRadius: 16, padding: 18, border: "1px solid #1e1e1e", marginBottom: 22 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#444", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>Experience Level</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    {["Beginner", "Hobbyist", "Experienced"].map((l, i) => (
                      <button key={l} style={{
                        flex: 1, padding: "9px 4px", borderRadius: 10, border: "none",
                        background: i === 1 ? "#f0ece4" : "#222",
                        color: i === 1 ? "#0a0a0a" : "#555",
                        fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "Georgia, serif",
                      }}>{l}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* WORK section */}
            {activeProfileSection === "work" && (
              <div style={{ padding: "0 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#444", letterSpacing: 1, textTransform: "uppercase" }}>Videos</div>
                  <button
                    onClick={() => videoInputRef.current.click()}
                    style={{
                      background: "#1a1a1a", border: "1px solid #2e2e2e",
                      borderRadius: 999, padding: "5px 12px",
                      color: "#888", fontSize: 10, fontWeight: 700,
                      cursor: "pointer", letterSpacing: 0.5, fontFamily: "Georgia, serif",
                    }}>+ Upload</button>
                  <input ref={videoInputRef} type="file" accept="video/*" style={{ display: "none" }}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) setVideos((v) => [...v, { id: Date.now(), label: file.name.replace(/\.[^.]+$/, ""), duration: "0:00", thumb: "#1a2a1e" }]);
                    }} />
                </div>

                {videos.length === 0 && (
                  <div style={{
                    background: "#141414", borderRadius: 16, padding: 32,
                    border: "1px dashed #222", textAlign: "center", marginBottom: 16,
                  }}>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>🎥</div>
                    <div style={{ fontSize: 13, color: "#555" }}>No videos yet.</div>
                    <div style={{ fontSize: 12, color: "#444", marginTop: 4 }}>Share a clip of your work — anything goes.</div>
                  </div>
                )}

                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                  {videos.map((v) => (
                    <div key={v.id} style={{
                      background: "#141414", borderRadius: 16,
                      border: "1px solid #1e1e1e", overflow: "hidden",
                      display: "flex", alignItems: "center", gap: 14,
                      padding: "14px 16px",
                    }}>
                      {/* Thumbnail */}
                      <div style={{
                        width: 72, height: 52, borderRadius: 10,
                        background: v.thumb, flexShrink: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 22,
                      }}>▶</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#f0ece4", fontStyle: "italic", lineHeight: 1.3 }}>{v.label}</div>
                        <div style={{ fontSize: 11, color: "#555", marginTop: 3 }}>{v.duration}</div>
                      </div>
                      <button
                        onClick={() => setVideos((vids) => vids.filter((x) => x.id !== v.id))}
                        style={{
                          background: "none", border: "none", color: "#444",
                          fontSize: 16, cursor: "pointer", padding: 4,
                        }}>✕</button>
                    </div>
                  ))}
                </div>

                <div style={{
                  background: "#141414", borderRadius: 16, padding: 16,
                  border: "1px solid #1e1e1e",
                }}>
                  <div style={{ fontSize: 11, color: "#555", lineHeight: 1.6 }}>
                    Videos are optional and just for context — you don't need a polished reel. A phone clip of rehearsal is fine.
                  </div>
                </div>
              </div>
            )}

            {/* LINKS section */}
            {activeProfileSection === "links" && (
              <div style={{ padding: "0 20px" }}>
                <div style={{ fontSize: 13, color: "#666", marginBottom: 18, lineHeight: 1.6 }}>
                  Link your work if you want — none of this is required. Share what you're comfortable with.
                </div>

                {/* Connected */}
                {connectedSocials.length > 0 && (
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#444", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>Connected</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {connectedSocials.map((p) => (
                        <div key={p.key} style={{
                          background: "#141414", borderRadius: 14, padding: "12px 16px",
                          border: "1px solid #222", display: "flex", alignItems: "center", gap: 12,
                        }}>
                          <span style={{ fontSize: 18, color: p.color, width: 24, textAlign: "center" }}>{p.icon}</span>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 11, color: "#555", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>{p.label}</div>
                            <div style={{ fontSize: 13, color: "#f0ece4", marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{socialLinks[p.key]}</div>
                          </div>
                          <button onClick={() => { setEditingSocial(p.key); setSocialInput(socialLinks[p.key]); }} style={{
                            background: "none", border: "none", color: "#555",
                            fontSize: 12, cursor: "pointer", padding: 4,
                          }}>Edit</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add more */}
                {unconnectedSocials.length > 0 && (
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#444", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>Add a Link</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {unconnectedSocials.map((p) => (
                        <button key={p.key} onClick={() => { setEditingSocial(p.key); setSocialInput(""); }} style={{
                          background: "#141414", borderRadius: 14, padding: "12px 16px",
                          border: "1px solid #1e1e1e", display: "flex", alignItems: "center",
                          gap: 12, cursor: "pointer", width: "100%", textAlign: "left",
                          fontFamily: "Georgia, serif",
                        }}>
                          <span style={{ fontSize: 18, color: "#333", width: 24, textAlign: "center" }}>{p.icon}</span>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13, color: "#666", fontWeight: 700 }}>{p.label}</div>
                            <div style={{ fontSize: 11, color: "#3a3a3a", marginTop: 1 }}>{p.placeholder}</div>
                          </div>
                          <span style={{ color: "#444", fontSize: 18 }}>+</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            <div style={{ height: 24 }} />
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div style={{
        position: "fixed", bottom: 0, left: "50%",
        transform: "translateX(-50%)", width: 420, maxWidth: "100%",
        background: "#0a0a0a", borderTop: "1px solid #1a1a1a",
        display: "flex", padding: "12px 0 20px",
      }}>
        {tabs.map((t) => (
          <button key={t} onClick={() => setActiveTab(t)} style={{
            flex: 1, background: "none", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
          }}>
            <span style={{ fontSize: 16, color: activeTab === t ? "#C8F5A0" : "#333" }}>{tabIcons[t]}</span>
            <span style={{
              fontSize: 9, letterSpacing: 1, textTransform: "uppercase",
              color: activeTab === t ? "#C8F5A0" : "#333",
              fontFamily: "Georgia, serif", fontWeight: 700,
            }}>{t}</span>
          </button>
        ))}
      </div>

      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: translateX(-50%) scale(0.9); }
          to   { opacity: 1; transform: translateX(-50%) scale(1); }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { display: none; }
        button:active { opacity: 0.8; }
      `}</style>
    </div>
  );
}
