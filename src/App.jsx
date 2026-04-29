import { useState, useRef } from "react";

const profiles = [
  { id: 1, name: "Dani R.", location: "Oakland, CA", mediums: ["Songwriter", "Producer", "Vocalist"], vibe: "Making melancholy bops. Looking for someone to co-write with — doesn't matter if you're new to it.", seeking: ["Lyricist", "Guitarist", "Beatmaker"], color: "#C8F5A0", verified: true },
  { id: 2, name: "Marcus T.", location: "Brooklyn, NY", mediums: ["Choreographer", "Dancer", "Filmmaker"], vibe: "Want to shoot a short dance film in the subway tunnels. Need a DP and someone who moves.", seeking: ["Cinematographer", "Dancer", "Editor"], color: "#FFD6A5", verified: false },
  { id: 3, name: "Priya K.", location: "Los Angeles, CA", mediums: ["Playwright", "Poet", "Director"], vibe: "Writing a one-act play about immigration and memory. Looking for anyone who wants to help.", seeking: ["Actor", "Set Designer", "Composer"], color: "#BDB2FF", verified: true },
  { id: 4, name: "Eli M.", location: "Chicago, IL", mediums: ["Illustrator", "Muralist", "Zine Maker"], vibe: "Making a zine about queer joy in the midwest. Writers, photographers, poets — slide in.", seeking: ["Writer", "Photographer", "Poet"], color: "#FF9AA2", verified: false },
];

const likedProfiles = [
  { id: 5, name: "Yemi A.", location: "Oakland, CA", mediums: ["Filmmaker", "Editor"], vibe: "Making short docs about Bay Area subcultures. Looking for a creative collaborator.", color: "#FFD6A5", verified: true },
  { id: 6, name: "Soo J.", location: "San Francisco, CA", mediums: ["Composer", "Pianist"], vibe: "Writing ambient music for short films and dance pieces.", color: "#BDB2FF", verified: false },
  { id: 7, name: "Rafa M.", location: "Berkeley, CA", mediums: ["Poet", "Spoken Word"], vibe: "Working on a collection about grief and diaspora. Want to perform with musicians.", color: "#FF9AA2", verified: true },
];

const projects = [
  { id: 1, title: "Park Shakespeare: A Midsummer", creator: "Yolanda F.", type: "Theater", desc: "Putting on a free performance in Dolores Park this August. All experience levels welcome.", needs: ["Actors", "Costume Designer", "Sound"], spots: 6, emoji: "🎭", tagColor: "#FFD6A5" },
  { id: 2, title: "Ambient Score for a Short Film", creator: "Jin L.", type: "Music + Film", desc: "I have a 12-min short film that needs an original score. Looking for a composer who vibes with experimental ambient.", needs: ["Composer", "Sound Designer"], spots: 1, emoji: "🎬", tagColor: "#C8F5A0" },
  { id: 3, title: "Dance Music Video — No Budget, All Vision", creator: "Amara S.", type: "Dance + Film", desc: "Shooting a visual for an original track. Need dancers who aren't afraid to look weird.", needs: ["Dancers", "Cinematographer", "Stylist"], spots: 4, emoji: "💃", tagColor: "#BDB2FF" },
  { id: 4, title: "Zine: 'What Does Home Sound Like?'", creator: "Theo R.", type: "Print + Writing", desc: "Open call for pieces about diaspora and sound. Submit a poem, a playlist annotation, an essay.", needs: ["Writers", "Illustrators", "Photographers"], spots: 12, emoji: "📖", tagColor: "#FF9AA2" },
];

const events = [
  { id: 1, title: "Open Mic: No Covers, No Rules", host: "The Starline Social Club", location: "Oakland, CA", date: "Fri, May 2", time: "7:00 PM", type: "Music", desc: "A genuinely judgment-free open mic. Bring 5 minutes of whatever — half-finished songs welcome.", going: 34, tags: ["Musicians", "Poets", "Comedians"], color: "#C8F5A0", emoji: "🎤", featured: true },
  { id: 2, title: "Figure Drawing Drop-In", host: "Vida Arts", location: "Mission District, SF", date: "Sat, May 3", time: "2:00 PM", type: "Visual Art", desc: "Weekly figure drawing session. Model provided, bring your own supplies. All skill levels.", going: 18, tags: ["Illustrators", "Painters", "Sculptors"], color: "#FFD6A5", emoji: "✏️", featured: false },
  { id: 3, title: "Bollywood Dance Social", host: "Desi Creatives Bay Area", location: "San Jose, CA", date: "Sat, May 3", time: "5:30 PM", type: "Dance", desc: "Come dance, meet other desi artists, talk about what you're working on. Beginners always welcome.", going: 52, tags: ["Dancers", "Choreographers", "Musicians"], color: "#FF9AA2", emoji: "💃", featured: true },
  { id: 4, title: "Poets in the Park", host: "Bay Area Literary Arts", location: "Dolores Park, SF", date: "Sun, May 4", time: "11:00 AM", type: "Writing", desc: "Bring something you wrote. Or just listen. Blankets and good vibes.", going: 27, tags: ["Poets", "Writers", "Everyone"], color: "#BDB2FF", emoji: "📝", featured: false },
  { id: 5, title: "Lo-Fi Jam Session", host: "Organized by Ren M.", location: "Temescal, Oakland", date: "Tue, May 6", time: "6:00 PM", type: "Music", desc: "Living room jam, 8 people max. Mostly jazz/soul/hip-hop adjacent. BYO instrument, snacks to share.", going: 7, tags: ["Producers", "Instrumentalists", "Vocalists"], color: "#C8F5A0", emoji: "🎸", featured: false },
];

const initialMessages = [
  { id: 1, name: "Dani R.", source: "Connect", preview: "Hey I saw your profile and love your work!", time: "2m", unread: true, color: "#C8F5A0", messages: [{ from: "them", text: "Hey I saw your profile and love your work!" }, { from: "them", text: "Would love to co-write something together sometime 🎵" }] },
  { id: 2, name: "Amara S.", source: "Project", preview: "Would love to have you on the video shoot", time: "1h", unread: true, color: "#BDB2FF", messages: [{ from: "them", text: "Hi! I'm putting together a dance music video and your background in Bharatanatyam is exactly what I'm looking for." }, { from: "them", text: "Would you be interested in joining?" }] },
  { id: 3, name: "Starline Social Club", source: "Event", preview: "Open mic is tomorrow at 7pm — doors open at 6", time: "3h", unread: false, color: "#FFD6A5", messages: [{ from: "them", text: "Hey! Just a reminder that Open Mic is tomorrow at 7pm." }, { from: "them", text: "Doors open at 6. Can't wait to see you there 🎤" }] },
  { id: 4, name: "Jin L.", source: "Project", preview: "Thanks for your interest in the film score!", time: "1d", unread: false, color: "#FF9AA2", messages: [{ from: "them", text: "Thanks so much for expressing interest in the film score project!" }, { from: "them", text: "Can we hop on a quick call this week to chat?" }] },
];

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

const filterTypes = ["All", "Music", "Dance", "Visual Art", "Writing", "Theater"];
const sourceColors = { Connect: "#C8F5A0", Project: "#BDB2FF", Event: "#FFD6A5" };

export default function App() {
  const [activeTab, setActiveTab] = useState("Connect");
  const [cardIndex, setCardIndex] = useState(0);
  const [swipeDir, setSwipeDir] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [matched, setMatched] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const [eventFilter, setEventFilter] = useState("All");
  const [rsvpd, setRsvpd] = useState({});
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState("unverified");
  const [videos, setVideos] = useState(sampleVideos);
  const [socialLinks, setSocialLinks] = useState({ substack: "", instagram: "", soundcloud: "", youtube: "", website: "", tiktok: "" });
  const [editingSocial, setEditingSocial] = useState(null);
  const [socialInput, setSocialInput] = useState("");
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [activeProfileSection, setActiveProfileSection] = useState("about");
  const [activeConvo, setActiveConvo] = useState(null);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [likes] = useState(likedProfiles);

  const photoInputRef = useRef();
  const videoInputRef = useRef();
  const current = profiles[cardIndex % profiles.length];
  const unreadCount = messages.filter((m) => m.unread).length;

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
  const handlePhotoChange = (e) => { const file = e.target.files[0]; if (file) setProfilePhoto(URL.createObjectURL(file)); };
  const handleVerify = () => { setShowVerifyModal(false); setVerificationStatus("pending"); setTimeout(() => setVerificationStatus("verified"), 2000); };
  const saveSocialLink = () => { if (editingSocial) { setSocialLinks((l) => ({ ...l, [editingSocial]: socialInput })); setEditingSocial(null); setSocialInput(""); } };
  const connectedSocials = socialPlatforms.filter((p) => socialLinks[p.key]);
  const unconnectedSocials = socialPlatforms.filter((p) => !socialLinks[p.key]);

  const openConvo = (msg) => {
    setMessages((prev) => prev.map((m) => m.id === msg.id ? { ...m, unread: false } : m));
    setActiveConvo(msg);
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setActiveConvo((prev) => ({ ...prev, messages: [...prev.messages, { from: "me", text: newMessage }] }));
    setMessages((prev) => prev.map((m) => m.id === activeConvo.id ? { ...m, preview: newMessage, messages: [...m.messages, { from: "me", text: newMessage }] } : m));
    setNewMessage("");
  };

  const tabs = [
    { id: "Connect", icon: "✦", badge: likes.length },
    { id: "Projects", icon: "◎" },
    { id: "Events", icon: "◈" },
    { id: "Messages", icon: "✉", badge: unreadCount },
    { id: "Profile", icon: "◐" },
  ];

  return (
    <div className="app-root">
      {/* Header */}
      <div className="header">
        <div className="logo">Zeal</div>
        <div className="avatar" onClick={() => setActiveTab("Profile")} style={{ border: verificationStatus === "verified" ? "2px solid #C8F5A0" : "2px solid #2a2a2a", background: profilePhoto ? "transparent" : "linear-gradient(135deg, #C8F5A0, #BDB2FF)" }}>
          {profilePhoto ? <img src={profilePhoto} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} /> : "M"}
        </div>
      </div>

      {/* Match toast */}
      {matched && <div className="toast">✦ You matched!</div>}

      {/* Verify Modal */}
      {showVerifyModal && (
        <div className="modal-overlay">
          <div className="modal-sheet">
            <div className="modal-title">Get Verified ✦</div>
            <div className="modal-body">Submit a 360° photo or short selfie video so other members know you're a real person. No portfolio needed.</div>
            <div className="upload-box">
              <div style={{ fontSize: 32, marginBottom: 8 }}>📷</div>
              <div style={{ fontSize: 13, color: "#888" }}>Tap to upload a 360° photo or selfie video</div>
              <div style={{ fontSize: 11, color: "#555", marginTop: 4 }}>MP4, MOV, JPG · max 50MB</div>
            </div>
            <div style={{ fontSize: 11, color: "#555", marginBottom: 20, lineHeight: 1.6 }}>Your verification media is only used for identity review and never shown publicly.</div>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn-secondary" onClick={() => setShowVerifyModal(false)}>Cancel</button>
              <button className="btn-primary" style={{ flex: 2 }} onClick={handleVerify}>Submit for Review →</button>
            </div>
          </div>
        </div>
      )}

      {/* Social Link Modal */}
      {editingSocial && (() => {
        const plat = socialPlatforms.find((p) => p.key === editingSocial);
        return (
          <div className="modal-overlay">
            <div className="modal-sheet">
              <div className="modal-title">Add {plat.label}</div>
              <div style={{ fontSize: 13, color: "#666", marginBottom: 20 }}>This is optional — share only what you're comfortable with.</div>
              <input autoFocus value={socialInput} onChange={(e) => setSocialInput(e.target.value)} placeholder={plat.placeholder} className="modal-input" />
              <div style={{ display: "flex", gap: 10 }}>
                <button className="btn-secondary" onClick={() => { setEditingSocial(null); setSocialInput(""); }}>Cancel</button>
                <button className="btn-primary" onClick={saveSocialLink} style={{ flex: 2, background: plat.color }}>Save →</button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Chat View */}
      {activeConvo && (
        <div className="chat-overlay">
          <div className="chat-header">
            <button className="back-btn" onClick={() => setActiveConvo(null)}>←</button>
            <div style={{ flex: 1 }}>
              <div className="chat-name">{activeConvo.name}</div>
              <span className="source-tag" style={{ background: sourceColors[activeConvo.source] }}>{activeConvo.source}</span>
            </div>
          </div>
          <div className="chat-messages">
            {activeConvo.messages.map((m, i) => (
              <div key={i} className={`message ${m.from === "me" ? "mine" : "theirs"}`}>
                <div className={`bubble ${m.from === "me" ? "bubble-mine" : "bubble-theirs"}`}>{m.text}</div>
              </div>
            ))}
          </div>
          <div className="chat-input-row">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Say something..."
              className="chat-input"
            />
            <button onClick={sendMessage} className="send-btn">→</button>
          </div>
        </div>
      )}

      {/* Likes Sheet */}
      {showLikes && (
        <div className="modal-overlay" onClick={() => setShowLikes(false)}>
          <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div className="modal-title">✦ {likes.length} people liked you</div>
              <button className="btn-ghost" onClick={() => setShowLikes(false)}>✕</button>
            </div>
            <div className="card-list">
              {likes.map((p) => (
                <div key={p.id} className="like-card" style={{ borderLeft: `3px solid ${p.color}` }}>
                  <div className="like-avatar" style={{ background: p.color }}>{p.name[0]}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div className="like-name">{p.name}</div>
                      {p.verified && <span className="verified-badge" style={{ background: "#C8F5A0", color: "#0a0a0a" }}>✦</span>}
                    </div>
                    <div className="like-location">{p.location}</div>
                    <div className="tag-row" style={{ marginTop: 6 }}>
                      {p.mediums.map((m) => <span key={m} className="tag-muted">{m}</span>)}
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <button className="btn-connect-sm" style={{ background: p.color }}>✦</button>
                    <button className="btn-pass-sm">✕</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="content">

        {/* CONNECT */}
        {activeTab === "Connect" && (
          <div className="tab-content">
            <p className="subtitle">Find your people. Start something.</p>
            <div className="card-stack">
              <div className="card-peek" style={{ background: profiles[(cardIndex + 1) % profiles.length].color }} />
              <div
                className="card"
                style={{
                  background: current.color,
                  transform: swipeDir === "left" ? "translateX(-130%) rotate(-14deg)" : swipeDir === "right" ? "translateX(130%) rotate(14deg)" : "translateX(0)",
                  transition: animating ? "transform 0.4s cubic-bezier(0.4,0,0.2,1)" : "none",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                        <div className="card-name">{current.name}</div>
                        {current.verified && <span className="verified-badge" style={{ background: "#0a0a0a", color: current.color }}>✦ verified</span>}
                      </div>
                      <div className="card-location">📍 {current.location}</div>
                    </div>
                    <div className="card-avatar" style={{ background: "#0a0a0a", color: current.color }}>{current.name[0]}</div>
                  </div>
                  <div className="tag-row" style={{ marginTop: 16 }}>
                    {current.mediums.map((m) => <span key={m} className="tag-dark-on-light">{m}</span>)}
                  </div>
                  <div className="card-vibe">"{current.vibe}"</div>
                </div>
                <div>
                  <div className="label-sm" style={{ marginBottom: 8 }}>Looking for</div>
                  <div className="tag-row">
                    {current.seeking.map((s) => <span key={s} className="tag-light-on-dark" style={{ background: "#0a0a0a", color: current.color }}>{s}</span>)}
                  </div>
                </div>
              </div>
            </div>
            <div className="swipe-buttons">
              <button className="btn-pass" onClick={() => swipe("left")}>✕</button>
              <button className="btn-connect" onClick={() => swipe("right")}>✦</button>
            </div>
            <p className="pass-connect-label">PASS · CONNECT</p>
          </div>
        )}

        {/* PROJECTS */}
        {activeTab === "Projects" && (
          <div className="tab-content">
            <div className="tab-header">
              <p className="subtitle">Open calls & collabs.</p>
              <button className="btn-accent" style={{ background: "#C8F5A0" }}>+ Post</button>
            </div>
            <div className="card-list">
              {projects.map((p) => (
                <div key={p.id} className="list-card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <span style={{ fontSize: 26 }}>{p.emoji}</span>
                    <span className="type-tag" style={{ background: p.tagColor }}>{p.type}</span>
                  </div>
                  <div className="list-card-title">{p.title}</div>
                  <div className="list-card-sub">by {p.creator}</div>
                  <div className="list-card-desc">{p.desc}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14 }}>
                    <div className="tag-row">{p.needs.map((n) => <span key={n} className="tag-muted">{n}</span>)}</div>
                    <span style={{ color: "#444", fontSize: 11 }}>{p.spots} spots</span>
                  </div>
                  <button className="btn-outline">Express Interest →</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EVENTS */}
        {activeTab === "Events" && (
          <div className="tab-content">
            <div className="tab-header">
              <p className="subtitle">Things worth showing up to.</p>
              <button className="btn-accent" style={{ background: "#FFD6A5" }}>+ List</button>
            </div>
            <div className="filter-row">
              {filterTypes.map((f) => (
                <button key={f} onClick={() => setEventFilter(f)} className={`filter-pill ${eventFilter === f ? "active" : ""}`}>{f}</button>
              ))}
            </div>
            {eventFilter === "All" && featuredEvent && (
              <div className="featured-event" style={{ background: featuredEvent.color }}>
                <div style={{ position: "absolute", top: -20, right: -10, fontSize: 90, opacity: 0.15, userSelect: "none", lineHeight: 1 }}>{featuredEvent.emoji}</div>
                <div className="featured-label">✦ Happening Soon</div>
                <div className="featured-title">{featuredEvent.title}</div>
                <div className="featured-meta">{featuredEvent.date} · {featuredEvent.time} · {featuredEvent.location}</div>
                <div className="featured-desc">{featuredEvent.desc}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14 }}>
                  <div style={{ fontSize: 12, color: "#444" }}><span style={{ fontWeight: 700, color: "#222" }}>{featuredEvent.going + (rsvpd[featuredEvent.id] ? 1 : 0)}</span> going</div>
                  <button onClick={() => toggleRsvp(featuredEvent.id)} className="btn-dark" style={{ color: featuredEvent.color }}>{rsvpd[featuredEvent.id] ? "✓ Going" : "I'm in →"}</button>
                </div>
              </div>
            )}
            <div className="card-list">
              {filteredEvents.filter((e) => eventFilter !== "All" || !e.featured).map((e) => (
                <div key={e.id} className="event-card">
                  <div className="event-date-block">
                    <div style={{ fontSize: 20 }}>{e.emoji}</div>
                    <div className="event-day">{e.date.split(",")[0]}</div>
                    <div className="event-num">{e.date.split(" ")[1]}</div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                      <div className="event-title">{e.title}</div>
                      <span className="type-tag" style={{ background: e.color, flexShrink: 0 }}>{e.type}</span>
                    </div>
                    <div className="event-meta">{e.time} · {e.location}</div>
                    <div className="event-desc">{e.desc}</div>
                    <div className="tag-row" style={{ marginTop: 10 }}>{e.tags.map((t) => <span key={t} className="tag-muted">{t}</span>)}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
                      <div style={{ fontSize: 11, color: "#444" }}><span style={{ color: "#666", fontWeight: 700 }}>{e.going + (rsvpd[e.id] ? 1 : 0)}</span> going</div>
                      <button onClick={() => toggleRsvp(e.id)} className="btn-rsvp" style={{ background: rsvpd[e.id] ? "#1e1e1e" : e.color, color: rsvpd[e.id] ? "#f0ece4" : "#0a0a0a", border: rsvpd[e.id] ? "1px solid #333" : "none" }}>{rsvpd[e.id] ? "✓ Going" : "I'm in"}</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ height: 20 }} />
          </div>
        )}

        {/* MESSAGES */}
        {activeTab === "Messages" && (
          <div className="tab-content">
            <p className="subtitle">Your conversations.</p>
            <div className="card-list">
              {messages.map((m) => (
                <div key={m.id} className="message-row" onClick={() => openConvo(m)}>
                  <div className="message-avatar" style={{ background: m.color }}>
                    {m.name[0]}
                    {m.unread && <div className="unread-dot" />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                      <div className="message-name" style={{ fontWeight: m.unread ? 700 : 400 }}>{m.name}</div>
                      <div className="message-time">{m.time}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3 }}>
                      <span className="source-tag" style={{ background: sourceColors[m.source] }}>{m.source}</span>
                      <div className="message-preview" style={{ fontWeight: m.unread ? 600 : 400, color: m.unread ? "#aaa" : "#555" }}>{m.preview}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {messages.length === 0 && (
              <div className="empty-state" style={{ marginTop: 40 }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>✉</div>
                <div style={{ fontSize: 13, color: "#555" }}>No messages yet.</div>
                <div style={{ fontSize: 12, color: "#444", marginTop: 4 }}>Connect with someone to start a conversation.</div>
              </div>
            )}
          </div>
        )}

        {/* PROFILE */}
        {activeTab === "Profile" && (
          <div>
            <div style={{ padding: "0 20px" }}>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 16, marginBottom: 16 }}>
                <div style={{ position: "relative" }}>
                  <div onClick={() => photoInputRef.current.click()} className="profile-avatar" style={{ border: verificationStatus === "verified" ? "2.5px solid #C8F5A0" : "2.5px solid #2a2a2a", background: profilePhoto ? "transparent" : "linear-gradient(135deg, #BDB2FF, #C8F5A0)" }}>
                    {profilePhoto ? <img src={profilePhoto} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} /> : "M"}
                  </div>
                  <div onClick={() => photoInputRef.current.click()} className="camera-btn">📷</div>
                  <input ref={photoInputRef} type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: "none" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="profile-name">Mounika</div>
                  <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>📍 Bay Area, CA</div>
                  <div style={{ marginTop: 8 }}>
                    {verificationStatus === "verified" && <span className="verified-badge" style={{ background: "#C8F5A0", color: "#0a0a0a" }}>✦ Verified</span>}
                    {verificationStatus === "pending" && <span className="verified-badge" style={{ background: "#FFD6A5", color: "#0a0a0a" }}>⏳ Pending</span>}
                    {verificationStatus === "unverified" && <button onClick={() => setShowVerifyModal(true)} className="verify-btn">Get verified →</button>}
                  </div>
                </div>
              </div>
              <div className="profile-bio">"Choreographer, writer, and cultural storyteller. Exploring queerness in myth through movement and words."</div>
              <div className="profile-tabs">
                {["about", "work", "links"].map((s) => (
                  <button key={s} onClick={() => setActiveProfileSection(s)} className={`profile-tab ${activeProfileSection === s ? "active" : ""}`}>{s}</button>
                ))}
              </div>
            </div>

            {activeProfileSection === "about" && (
              <div style={{ padding: "0 20px" }}>
                <div style={{ marginBottom: 22 }}>
                  <div className="label-sm" style={{ marginBottom: 10 }}>My Mediums</div>
                  <div className="tag-row">
                    {["Bharatanatyam", "Choreographer", "Writer", "Storyteller"].map((m) => <span key={m} className="tag-outline">{m}</span>)}
                    <span className="tag-add">+ Add</span>
                  </div>
                </div>
                <div style={{ marginBottom: 22 }}>
                  <div className="label-sm" style={{ marginBottom: 10 }}>Open To</div>
                  <div className="tag-row">
                    {["Dance Film", "Music Collab", "Writing Together", "Theater"].map((m) => <span key={m} className="tag-purple">{m}</span>)}
                  </div>
                </div>
                <div className="list-card">
                  <div className="label-sm" style={{ marginBottom: 10 }}>Experience Level</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    {["Beginner", "Hobbyist", "Experienced"].map((l, i) => (
                      <button key={l} className={`level-btn ${i === 1 ? "active" : ""}`}>{l}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeProfileSection === "work" && (
              <div style={{ padding: "0 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <div className="label-sm">Videos</div>
                  <button className="btn-ghost" onClick={() => videoInputRef.current.click()}>+ Upload</button>
                  <input ref={videoInputRef} type="file" accept="video/*" style={{ display: "none" }} onChange={(e) => { const file = e.target.files[0]; if (file) setVideos((v) => [...v, { id: Date.now(), label: file.name.replace(/\.[^.]+$/, ""), duration: "0:00", thumb: "#1a2a1e" }]); }} />
                </div>
                {videos.length === 0 && (
                  <div className="empty-state">
                    <div style={{ fontSize: 32, marginBottom: 8 }}>🎥</div>
                    <div style={{ fontSize: 13, color: "#555" }}>No videos yet.</div>
                  </div>
                )}
                <div className="card-list">
                  {videos.map((v) => (
                    <div key={v.id} className="video-card">
                      <div className="video-thumb" style={{ background: v.thumb }}>▶</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="video-label">{v.label}</div>
                        <div style={{ fontSize: 11, color: "#555", marginTop: 3 }}>{v.duration}</div>
                      </div>
                      <button onClick={() => setVideos((vids) => vids.filter((x) => x.id !== v.id))} className="btn-remove">✕</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeProfileSection === "links" && (
              <div style={{ padding: "0 20px" }}>
                <div style={{ fontSize: 13, color: "#666", marginBottom: 18, lineHeight: 1.6 }}>Link your work if you want — none of this is required.</div>
                {connectedSocials.length > 0 && (
                  <div style={{ marginBottom: 20 }}>
                    <div className="label-sm" style={{ marginBottom: 10 }}>Connected</div>
                    <div className="card-list">
                      {connectedSocials.map((p) => (
                        <div key={p.key} className="social-card">
                          <span style={{ fontSize: 18, color: p.color, width: 24, textAlign: "center" }}>{p.icon}</span>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div className="label-sm">{p.label}</div>
                            <div style={{ fontSize: 13, color: "#f0ece4", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{socialLinks[p.key]}</div>
                          </div>
                          <button onClick={() => { setEditingSocial(p.key); setSocialInput(socialLinks[p.key]); }} className="btn-ghost">Edit</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {unconnectedSocials.length > 0 && (
                  <div>
                    <div className="label-sm" style={{ marginBottom: 10 }}>Add a Link</div>
                    <div className="card-list">
                      {unconnectedSocials.map((p) => (
                        <button key={p.key} onClick={() => { setEditingSocial(p.key); setSocialInput(""); }} className="social-card-btn">
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
      <div className="bottom-nav">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => { setActiveTab(t.id); if (t.id === "Connect") setShowLikes(false); }} className="nav-btn">
            <div style={{ position: "relative", display: "inline-flex" }}>
              <span className="nav-icon" style={{ color: activeTab === t.id ? "#C8F5A0" : "#333" }}>{t.icon}</span>
              {t.badge > 0 && (
                <span
                  className="badge"
                  onClick={(e) => { e.stopPropagation(); if (t.id === "Connect") setShowLikes(true); }}
                >{t.badge}</span>
              )}
            </div>
            <span className="nav-label" style={{ color: activeTab === t.id ? "#C8F5A0" : "#333" }}>{t.id}</span>
          </button>
        ))}
      </div>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }
        html, body, #root { width: 100%; height: 100%; background: #0a0a0a; }

        .app-root {
          font-family: 'Georgia', 'Times New Roman', serif;
          background: #0a0a0a;
          min-height: 100vh;
          width: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .header {
          padding: 20px 20px 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-shrink: 0;
        }

        .logo {
          font-size: 26px;
          font-weight: 700;
          color: #f0ece4;
          letter-spacing: -0.5px;
          font-style: italic;
        }

        .avatar {
          width: 38px; height: 38px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; color: #0a0a0a; font-weight: 700;
          cursor: pointer; overflow: hidden; flex-shrink: 0;
        }

        .toast {
          position: fixed; top: 68px; left: 50%;
          transform: translateX(-50%);
          background: #C8F5A0; color: #0a0a0a;
          padding: 10px 24px; border-radius: 999px;
          font-size: 13px; font-weight: 700; letter-spacing: 1px;
          z-index: 100; white-space: nowrap;
          animation: popIn 0.25s ease;
        }

        .content {
          flex: 1; overflow-y: auto;
          padding-bottom: 80px; width: 100%;
        }

        .tab-content { padding: 0 16px; width: 100%; }

        .subtitle {
          color: #666; font-size: 13px;
          margin: 4px 0 16px; padding-left: 4px;
        }

        .tab-header {
          display: flex; justify-content: space-between;
          align-items: center; margin-bottom: 16px; padding-left: 4px;
        }

        .card-stack { position: relative; width: 100%; margin-bottom: 20px; }

        .card-peek {
          position: absolute; top: 8px; left: 4px; right: 4px;
          height: calc(100% - 8px); border-radius: 24px; opacity: 0.35; z-index: 0;
        }

        .card {
          position: relative; z-index: 1; width: 100%;
          border-radius: 24px; padding: 24px;
          display: flex; flex-direction: column;
          justify-content: space-between; gap: 20px; min-height: 380px;
        }

        .card-name { font-size: 24px; font-weight: 700; color: #0a0a0a; font-style: italic; }
        .card-location { font-size: 12px; color: #333; margin-top: 2px; }
        .card-avatar {
          width: 48px; height: 48px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 18px; font-style: italic; flex-shrink: 0;
        }
        .card-vibe { margin-top: 16px; font-size: 14px; color: #1a1a1a; line-height: 1.65; font-style: italic; }

        .swipe-buttons { display: flex; justify-content: center; gap: 24px; margin-top: 4px; }
        .btn-pass {
          width: 60px; height: 60px; border-radius: 50%;
          background: #1a1a1a; border: 1px solid #2e2e2e;
          color: #666; font-size: 20px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
        }
        .btn-connect {
          width: 60px; height: 60px; border-radius: 50%;
          background: #C8F5A0; border: none; color: #0a0a0a;
          font-size: 20px; cursor: pointer; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
        }
        .pass-connect-label { text-align: center; color: #444; font-size: 10px; margin-top: 10px; letter-spacing: 1px; }

        .tag-row { display: flex; flex-wrap: wrap; gap: 6px; }
        .tag-dark-on-light { background: rgba(0,0,0,0.13); color: #0a0a0a; font-size: 10px; font-weight: 700; padding: 4px 10px; border-radius: 999px; letter-spacing: 0.5px; text-transform: uppercase; }
        .tag-light-on-dark { font-size: 10px; font-weight: 700; padding: 4px 10px; border-radius: 999px; letter-spacing: 0.5px; text-transform: uppercase; }
        .tag-muted { background: #222; color: #888; font-size: 10px; padding: 3px 8px; border-radius: 999px; font-weight: 700; }
        .tag-outline { background: #1a1a1a; color: #f0ece4; font-size: 12px; font-weight: 700; padding: 7px 14px; border-radius: 999px; border: 1px solid #2e2e2e; }
        .tag-add { background: transparent; color: #444; font-size: 12px; font-weight: 700; padding: 7px 14px; border-radius: 999px; border: 1px dashed #2e2e2e; cursor: pointer; }
        .tag-purple { background: #BDB2FF; color: #0a0a0a; font-size: 12px; font-weight: 700; padding: 7px 14px; border-radius: 999px; }

        .verified-badge { font-size: 10px; font-weight: 700; padding: 3px 10px; border-radius: 999px; letter-spacing: 0.5px; }
        .verify-btn { background: transparent; border: 1px dashed #444; border-radius: 999px; padding: 3px 10px; color: #888; font-size: 10px; font-weight: 700; cursor: pointer; letter-spacing: 0.5px; font-family: Georgia, serif; }

        .card-list { display: flex; flex-direction: column; gap: 10px; }
        .list-card { background: #141414; border-radius: 20px; padding: 20px; border: 1px solid #222; }
        .list-card-title { font-size: 16px; font-weight: 700; color: #f0ece4; margin-top: 10px; font-style: italic; }
        .list-card-sub { font-size: 11px; color: #555; margin-top: 2px; }
        .list-card-desc { font-size: 13px; color: #999; margin-top: 10px; line-height: 1.6; }
        .type-tag { font-size: 9px; font-weight: 700; padding: 3px 8px; border-radius: 999px; letter-spacing: 0.5px; text-transform: uppercase; color: #0a0a0a; white-space: nowrap; }
        .btn-outline { margin-top: 14px; width: 100%; padding: 10px; background: transparent; border: 1px solid #2e2e2e; border-radius: 12px; color: #f0ece4; font-size: 13px; font-weight: 700; cursor: pointer; letter-spacing: 0.5px; font-family: Georgia, serif; }

        .filter-row { display: flex; gap: 8px; overflow-x: auto; padding: 8px 4px 16px; scrollbar-width: none; }
        .filter-pill { background: #1a1a1a; color: #555; border: 1px solid #222; border-radius: 999px; padding: 6px 14px; font-size: 10px; font-weight: 700; letter-spacing: 0.5px; cursor: pointer; white-space: nowrap; font-family: Georgia, serif; text-transform: uppercase; transition: all 0.15s; }
        .filter-pill.active { background: #f0ece4; color: #0a0a0a; border: none; }

        .featured-event { border-radius: 20px; padding: 22px; margin-bottom: 16px; position: relative; overflow: hidden; }
        .featured-label { font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #333; margin-bottom: 8px; }
        .featured-title { font-size: 20px; font-weight: 700; color: #0a0a0a; font-style: italic; line-height: 1.3; }
        .featured-meta { font-size: 12px; color: #333; margin-top: 6px; }
        .featured-desc { font-size: 13px; color: #1a1a1a; margin-top: 10px; line-height: 1.6; }
        .btn-dark { background: #0a0a0a; border: none; border-radius: 999px; padding: 8px 18px; font-size: 12px; font-weight: 700; cursor: pointer; font-family: Georgia, serif; }

        .event-card { background: #141414; border-radius: 18px; padding: 16px; border: 1px solid #1e1e1e; display: flex; gap: 12px; align-items: flex-start; }
        .event-date-block { min-width: 48px; text-align: center; background: #1a1a1a; border-radius: 12px; padding: 10px 6px; display: flex; flex-direction: column; align-items: center; gap: 2px; border: 1px solid #222; flex-shrink: 0; }
        .event-day { font-size: 9px; color: #555; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; margin-top: 4px; }
        .event-num { font-size: 14px; color: #f0ece4; font-weight: 700; }
        .event-title { font-size: 13px; font-weight: 700; color: #f0ece4; font-style: italic; line-height: 1.3; flex: 1; }
        .event-meta { font-size: 11px; color: #555; margin-top: 4px; }
        .event-desc { font-size: 12px; color: #888; margin-top: 6px; line-height: 1.5; }
        .btn-rsvp { border-radius: 999px; padding: 5px 14px; font-size: 11px; font-weight: 700; cursor: pointer; font-family: Georgia, serif; transition: all 0.15s; }

        /* MESSAGES */
        .message-row { display: flex; gap: 12px; align-items: center; padding: 14px 0; border-bottom: 1px solid #1a1a1a; cursor: pointer; }
        .message-row:active { opacity: 0.7; }
        .message-avatar { width: 46px; height: 46px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 700; color: #0a0a0a; flex-shrink: 0; position: relative; }
        .unread-dot { position: absolute; top: 0; right: 0; width: 10px; height: 10px; background: #C8F5A0; border-radius: 50%; border: 2px solid #0a0a0a; }
        .message-name { font-size: 14px; color: #f0ece4; font-style: italic; }
        .message-time { font-size: 11px; color: #444; flex-shrink: 0; }
        .message-preview { font-size: 12px; color: #555; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; min-width: 0; }
        .source-tag { font-size: 9px; font-weight: 700; padding: 2px 6px; border-radius: 999px; color: #0a0a0a; flex-shrink: 0; letter-spacing: 0.3px; }

        /* CHAT */
        .chat-overlay { position: fixed; inset: 0; background: #0a0a0a; z-index: 150; display: flex; flex-direction: column; }
        .chat-header { padding: 20px 16px 12px; display: flex; align-items: center; gap: 12px; border-bottom: 1px solid #1a1a1a; flex-shrink: 0; }
        .back-btn { background: none; border: none; color: #f0ece4; font-size: 20px; cursor: pointer; padding: 4px 8px 4px 0; font-family: Georgia, serif; }
        .chat-name { font-size: 16px; font-weight: 700; color: #f0ece4; font-style: italic; }
        .chat-messages { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 10px; }
        .message { display: flex; }
        .message.mine { justify-content: flex-end; }
        .message.theirs { justify-content: flex-start; }
        .bubble { max-width: 75%; padding: 10px 14px; border-radius: 18px; font-size: 14px; line-height: 1.5; }
        .bubble-mine { background: #C8F5A0; color: #0a0a0a; border-bottom-right-radius: 4px; }
        .bubble-theirs { background: #1a1a1a; color: #f0ece4; border-bottom-left-radius: 4px; border: 1px solid #222; }
        .chat-input-row { padding: 12px 16px 28px; display: flex; gap: 10px; border-top: 1px solid #1a1a1a; flex-shrink: 0; }
        .chat-input { flex: 1; background: #1a1a1a; border: 1px solid #2e2e2e; border-radius: 999px; padding: 12px 16px; color: #f0ece4; font-size: 14px; font-family: Georgia, serif; outline: none; }
        .send-btn { width: 44px; height: 44px; border-radius: 50%; background: #C8F5A0; border: none; color: #0a0a0a; font-size: 18px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }

        /* LIKES */
        .like-card { background: #141414; border-radius: 16px; padding: 14px 16px; border: 1px solid #222; display: flex; gap: 12px; align-items: center; }
        .like-avatar { width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 700; color: #0a0a0a; flex-shrink: 0; }
        .like-name { font-size: 14px; font-weight: 700; color: #f0ece4; font-style: italic; }
        .like-location { font-size: 11px; color: #555; margin-top: 2px; }
        .btn-connect-sm { width: 32px; height: 32px; border-radius: 50%; border: none; color: #0a0a0a; font-size: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .btn-pass-sm { width: 32px; height: 32px; border-radius: 50%; background: #1a1a1a; border: 1px solid #2e2e2e; color: #666; font-size: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center; }

        /* PROFILE */
        .profile-avatar { width: 88px; height: 88px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 32px; color: #0a0a0a; font-weight: 700; font-style: italic; cursor: pointer; overflow: hidden; flex-shrink: 0; }
        .camera-btn { position: absolute; bottom: 2px; right: 2px; width: 26px; height: 26px; border-radius: 50%; background: #f0ece4; display: flex; align-items: center; justify-content: center; font-size: 13px; cursor: pointer; border: 2px solid #0a0a0a; }
        .profile-name { font-size: 22px; font-weight: 700; color: #f0ece4; font-style: italic; }
        .profile-bio { font-size: 14px; color: #aaa; line-height: 1.7; font-style: italic; margin-bottom: 20px; padding-left: 2px; }
        .profile-tabs { display: flex; border-bottom: 1px solid #1e1e1e; margin-bottom: 20px; }
        .profile-tab { flex: 1; background: none; border: none; border-bottom: 2px solid transparent; color: #555; font-size: 11px; font-weight: 700; padding: 8px 0 12px; cursor: pointer; letter-spacing: 1px; text-transform: uppercase; font-family: Georgia, serif; transition: all 0.15s; margin-bottom: -1px; }
        .profile-tab.active { border-bottom: 2px solid #C8F5A0; color: #f0ece4; }
        .level-btn { flex: 1; padding: 9px 4px; border-radius: 10px; border: none; background: #222; color: #555; font-size: 11px; font-weight: 700; cursor: pointer; font-family: Georgia, serif; }
        .level-btn.active { background: #f0ece4; color: #0a0a0a; }

        .video-card { background: #141414; border-radius: 16px; border: 1px solid #1e1e1e; display: flex; align-items: center; gap: 14px; padding: 14px 16px; }
        .video-thumb { width: 72px; height: 52px; border-radius: 10px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 22px; color: #555; }
        .video-label { font-size: 13px; font-weight: 700; color: #f0ece4; font-style: italic; line-height: 1.3; }
        .btn-remove { background: none; border: none; color: #444; font-size: 16px; cursor: pointer; padding: 4px; }

        .social-card { background: #141414; border-radius: 14px; padding: 12px 16px; border: 1px solid #222; display: flex; align-items: center; gap: 12px; }
        .social-card-btn { background: #141414; border-radius: 14px; padding: 12px 16px; border: 1px solid #1e1e1e; display: flex; align-items: center; gap: 12px; cursor: pointer; width: 100%; text-align: left; font-family: Georgia, serif; }

        .empty-state { background: #141414; border-radius: 16px; padding: 32px; border: 1px dashed #222; text-align: center; margin-bottom: 16px; }

        /* BUTTONS */
        .btn-accent { border: none; border-radius: 999px; padding: 6px 14px; font-size: 10px; font-weight: 700; letter-spacing: 0.5px; cursor: pointer; text-transform: uppercase; color: #0a0a0a; font-family: Georgia, serif; }
        .btn-primary { padding: 12px; background: #C8F5A0; border: none; border-radius: 12px; color: #0a0a0a; font-size: 13px; font-weight: 700; cursor: pointer; font-family: Georgia, serif; }
        .btn-secondary { flex: 1; padding: 12px; background: #1a1a1a; border: 1px solid #2e2e2e; border-radius: 12px; color: #888; font-size: 13px; cursor: pointer; font-family: Georgia, serif; }
        .btn-ghost { background: #1a1a1a; border: 1px solid #2e2e2e; border-radius: 999px; padding: 5px 12px; color: #888; font-size: 10px; font-weight: 700; cursor: pointer; letter-spacing: 0.5px; font-family: Georgia, serif; }

        .label-sm { font-size: 10px; font-weight: 700; color: #444; letter-spacing: 1px; text-transform: uppercase; }

        /* MODALS */
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); z-index: 200; display: flex; align-items: flex-end; }
        .modal-sheet { background: #141414; border-radius: 24px 24px 0 0; padding: 28px; width: 100%; border: 1px solid #222; border-bottom: none; animation: slideUp 0.3s ease; }
        .modal-title { font-size: 18px; font-weight: 700; color: #f0ece4; font-style: italic; margin-bottom: 8px; }
        .modal-body { font-size: 13px; color: #888; line-height: 1.6; margin-bottom: 20px; }
        .modal-input { width: 100%; padding: 14px 16px; background: #1a1a1a; border: 1px solid #2e2e2e; border-radius: 12px; color: #f0ece4; font-size: 14px; font-family: Georgia, serif; outline: none; margin-bottom: 16px; }
        .upload-box { background: #1a1a1a; border-radius: 16px; padding: 20px; border: 1px dashed #333; text-align: center; margin-bottom: 16px; cursor: pointer; }

        /* BOTTOM NAV */
        .bottom-nav { position: fixed; bottom: 0; left: 0; right: 0; width: 100%; background: #0a0a0a; border-top: 1px solid #1a1a1a; display: flex; padding: 12px 0 20px; z-index: 50; }
        .nav-btn { flex: 1; background: none; border: none; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 3px; }
        .nav-icon { font-size: 16px; }
        .nav-label { font-size: 9px; letter-spacing: 1px; text-transform: uppercase; font-family: Georgia, serif; font-weight: 700; }

        .badge { position: absolute; top: -6px; right: -8px; background: #C8F5A0; color: #0a0a0a; font-size: 9px; font-weight: 700; min-width: 16px; height: 16px; border-radius: 999px; display: flex; align-items: center; justify-content: center; padding: 0 4px; font-family: Georgia, serif; cursor: pointer; }

        @keyframes popIn {
          from { opacity: 0; transform: translateX(-50%) scale(0.9); }
          to   { opacity: 1; transform: translateX(-50%) scale(1); }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        button:active { opacity: 0.8; }
      `}</style>
    </div>
  );
}
