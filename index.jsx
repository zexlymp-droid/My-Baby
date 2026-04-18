import { useState, useEffect, useRef, useCallback } from "react";

// ── Floating Icons Pool ──────────────────────────────────────────────────────
const ICONS = ["✦", "✿", "♡", "✧", "❋", "꩜", "⊹", "✶", "꙳", "⋆"];
const SAMPLE_PHOTOS = [
  {
    id: 1,
    src: "https://picsum.photos/seed/ribbon1/400/500",
    caption: "Hari ini dia pakai dress biru... hati gw langsung bergetar.",
    mood: "✦ cantik banget",
    date: "12 Apr 2025",
    tilt: -3,
    hearts: 24,
  },
  {
    id: 2,
    src: "https://picsum.photos/seed/ribbon2/380/460",
    caption: "Senyumnya waktu ketawa itu... gak ada obatnya.",
    mood: "✧ senyumnya",
    date: "28 Mar 2025",
    tilt: 2,
    hearts: 31,
  },
  {
    id: 3,
    src: "https://picsum.photos/seed/ribbon3/400/480",
    caption: "Momen biasa yang gak pernah gw lupain.",
    mood: "♡ detail favoritku",
    date: "15 Mar 2025",
    tilt: -2,
    hearts: 18,
  },
  {
    id: 4,
    src: "https://picsum.photos/seed/ribbon4/360/440",
    caption: "Dia gak tau betapa indahnya dia di hari itu.",
    mood: "✿ secret moment",
    date: "02 Mar 2025",
    tilt: 3,
    hearts: 42,
  },
  {
    id: 5,
    src: "https://picsum.photos/seed/ribbon5/400/500",
    caption: "Golden hour + dia = gw hilang kata-kata.",
    mood: "✦ golden hour",
    date: "18 Feb 2025",
    tilt: -1,
    hearts: 55,
  },
  {
    id: 6,
    src: "https://picsum.photos/seed/ribbon6/380/450",
    caption: "Bukan foto terbaik, tapi momen paling gw sayang.",
    mood: "❋ memory keabadian",
    date: "01 Feb 2025",
    tilt: 2,
    hearts: 29,
  },
];

// ── Sparkle Component ────────────────────────────────────────────────────────
function Sparkle({ x, y, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 800);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div
      style={{
        position: "fixed",
        left: x,
        top: y,
        pointerEvents: "none",
        zIndex: 9999,
        transform: "translate(-50%,-50%)",
      }}
    >
      {["✦", "✧", "⋆"].map((s, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            fontSize: `${10 + i * 4}px`,
            color: i === 0 ? "#a8d8ff" : i === 1 ? "#fff" : "#7bb8e8",
            animation: `sparkle-burst 0.8s ease-out forwards`,
            animationDelay: `${i * 80}ms`,
            "--dx": `${(i - 1) * 20}px`,
            "--dy": `${-20 - i * 10}px`,
          }}
        >
          {s}
        </span>
      ))}
    </div>
  );
}

// ── Floating Particle ────────────────────────────────────────────────────────
function FloatingParticle({ icon, style }) {
  return (
    <div
      className="floating-particle"
      style={{
        position: "fixed",
        fontSize: style.size,
        color: style.color,
        left: style.left,
        top: style.top,
        opacity: style.opacity,
        animation: `float-up ${style.duration}s ${style.delay}s ease-in-out infinite alternate`,
        pointerEvents: "none",
        zIndex: 1,
        userSelect: "none",
      }}
    >
      {icon}
    </div>
  );
}

// ── Photo Card ───────────────────────────────────────────────────────────────
function PhotoCard({ photo, onHeartClick, hearted }) {
  const [hovered, setHovered] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [sparkles, setSparkles] = useState([]);

  const handleMouseMove = useCallback(
    (e) => {
      if (hovered && Math.random() < 0.15) {
        const rect = e.currentTarget.getBoundingClientRect();
        setSparkles((prev) => [
          ...prev.slice(-5),
          {
            id: Date.now() + Math.random(),
            x: e.clientX,
            y: e.clientY,
          },
        ]);
      }
    },
    [hovered]
  );

  return (
    <>
      {sparkles.map((s) => (
        <Sparkle
          key={s.id}
          x={s.x}
          y={s.y}
          onDone={() =>
            setSparkles((prev) => prev.filter((p) => p.id !== s.id))
          }
        />
      ))}
      <div
        className={`photo-card ${hovered ? "hovered" : ""}`}
        style={{ "--tilt": `${photo.tilt}deg` }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={handleMouseMove}
      >
        {/* Ribbon accent */}
        <div className="ribbon-accent">
          <span>✦</span>
        </div>

        {/* Photo wrapper */}
        <div className="photo-wrapper">
          <img src={photo.src} alt={photo.mood} loading="lazy" />
          <div className="photo-overlay">
            <button
              className="letter-btn"
              onClick={() => setLetterOpen(true)}
            >
              ✉ buka surat
            </button>
          </div>
        </div>

        {/* Polaroid bottom */}
        <div className="polaroid-bottom">
          <div className="mood-tag">{photo.mood}</div>
          <div className="photo-date">{photo.date}</div>
          <button
            className={`heart-btn ${hearted ? "hearted" : ""}`}
            onClick={() => onHeartClick(photo.id)}
          >
            {hearted ? "♥" : "♡"} {photo.hearts + (hearted ? 1 : 0)}
          </button>
        </div>

        {/* Corner dots */}
        <div className="corner-dot tl" />
        <div className="corner-dot tr" />
        <div className="corner-dot bl" />
        <div className="corner-dot br" />
      </div>

      {/* Letter modal */}
      {letterOpen && (
        <div className="letter-overlay" onClick={() => setLetterOpen(false)}>
          <div
            className="letter-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="letter-header">✦ catatan kecil ✦</div>
            <div className="letter-date">{photo.date}</div>
            <p className="letter-text">{photo.caption}</p>
            <div className="letter-mood">{photo.mood}</div>
            <button
              className="letter-close"
              onClick={() => setLetterOpen(false)}
            >
              tutup ✧
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// ── Upload Panel ─────────────────────────────────────────────────────────────
function UploadPanel({ onClose, onAdd }) {
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [mood, setMood] = useState("✦ cantik banget");
  const fileRef = useRef();

  const moods = [
    "✦ cantik banget",
    "✧ senyumnya",
    "♡ detail favoritku",
    "✿ secret moment",
    "❋ memory keabadian",
    "⋆ golden hour",
  ];

  const handleFile = (file) => {
    if (!file?.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = () => {
    if (!preview) return;
    onAdd({
      id: Date.now(),
      src: preview,
      caption: caption || "momen yang gak terlupakan.",
      mood,
      date: new Date().toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      tilt: (Math.random() - 0.5) * 6,
      hearts: 0,
    });
    onClose();
  };

  return (
    <div className="upload-overlay" onClick={onClose}>
      <div className="upload-panel" onClick={(e) => e.stopPropagation()}>
        <div className="upload-title">✦ tambah kenangan ✦</div>

        <div
          className={`drop-zone ${dragOver ? "drag-over" : ""} ${preview ? "has-preview" : ""}`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current.click()}
        >
          {preview ? (
            <img src={preview} alt="preview" className="drop-preview" />
          ) : (
            <>
              <div className="drop-icon">✧</div>
              <div className="drop-text">
                drag foto kesini
                <br />
                <small>atau klik untuk pilih</small>
              </div>
            </>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </div>

        <textarea
          className="caption-input"
          placeholder="cerita singkat... apa yang kamu rasain hari itu?"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          rows={3}
        />

        <div className="mood-select">
          {moods.map((m) => (
            <button
              key={m}
              className={`mood-option ${mood === m ? "selected" : ""}`}
              onClick={() => setMood(m)}
            >
              {m}
            </button>
          ))}
        </div>

        <div className="upload-actions">
          <button className="btn-cancel" onClick={onClose}>
            batal
          </button>
          <button
            className="btn-save"
            onClick={handleSubmit}
            disabled={!preview}
          >
            simpan kenangan ✦
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [photos, setPhotos] = useState(SAMPLE_PHOTOS);
  const [hearted, setHearted] = useState({});
  const [showUpload, setShowUpload] = useState(false);
  const [particles] = useState(() =>
    Array.from({ length: 22 }, (_, i) => ({
      id: i,
      icon: ICONS[i % ICONS.length],
      style: {
        size: `${10 + Math.random() * 14}px`,
        color: ["#a8d8ff", "#c9e8ff", "#7bb8e8", "#fff", "#d4ecff"][
          Math.floor(Math.random() * 5)
        ],
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        opacity: 0.12 + Math.random() * 0.2,
        duration: 4 + Math.random() * 5,
        delay: Math.random() * 4,
      },
    }))
  );

  // Custom cursor
  const cursorRef = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const toggleHeart = (id) =>
    setHearted((prev) => ({ ...prev, [id]: !prev[id] }));

  const addPhoto = (photo) => setPhotos((prev) => [photo, ...prev]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Gochi+Hand&family=DM+Sans:wght@300;400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --navy: #0a0f1e;
          --navy-2: #0d1530;
          --navy-3: #111d3c;
          --blue-soft: #a8d8ff;
          --blue-mid: #7bb8e8;
          --white: #f0f6ff;
          --white-dim: rgba(240,246,255,0.7);
          --ribbon: #c9e8ff;
          --glow: rgba(168,216,255,0.15);
        }

        html, body { 
          background: var(--navy); 
          min-height: 100vh; 
          cursor: none;
          overflow-x: hidden;
        }

        /* Custom cursor */
        .custom-cursor {
          position: fixed;
          width: 18px;
          height: 18px;
          pointer-events: none;
          z-index: 99999;
          transform: translate(-50%, -50%);
          font-size: 14px;
          color: var(--blue-soft);
          filter: drop-shadow(0 0 4px var(--blue-soft));
          transition: transform 0.1s ease;
        }

        /* Background noise texture */
        body::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: 
            radial-gradient(ellipse 80% 50% at 20% 30%, rgba(123,184,232,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 70%, rgba(168,216,255,0.05) 0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }

        /* Header */
        .header {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 56px 24px 32px;
        }
        .header-eyebrow {
          font-family: 'Gochi Hand', cursive;
          font-size: 13px;
          color: var(--blue-mid);
          letter-spacing: 4px;
          text-transform: uppercase;
          margin-bottom: 12px;
          opacity: 0.8;
        }
        .header-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 7vw, 64px);
          font-weight: 300;
          color: var(--white);
          line-height: 1.1;
          letter-spacing: -1px;
        }
        .header-title em {
          font-style: italic;
          color: var(--blue-soft);
        }
        .header-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: var(--white-dim);
          margin-top: 14px;
          font-weight: 300;
          letter-spacing: 1px;
        }
        .header-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-top: 20px;
          color: var(--blue-mid);
          opacity: 0.5;
          font-size: 12px;
          letter-spacing: 3px;
        }
        .header-divider::before,
        .header-divider::after {
          content: '';
          width: 60px;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--blue-mid));
        }
        .header-divider::after {
          background: linear-gradient(90deg, var(--blue-mid), transparent);
        }

        /* Gallery grid - masonry */
        .gallery {
          position: relative;
          z-index: 10;
          columns: 3;
          column-gap: 28px;
          max-width: 1100px;
          margin: 0 auto;
          padding: 20px 32px 60px;
        }
        @media (max-width: 860px) { .gallery { columns: 2; padding: 16px 20px 40px; } }
        @media (max-width: 520px) { .gallery { columns: 1; padding: 16px 24px 40px; } }

        /* Photo card */
        .photo-card {
          break-inside: avoid;
          position: relative;
          background: linear-gradient(135deg, #141e3a 0%, #0f1829 100%);
          border-radius: 4px;
          padding: 14px 14px 52px;
          margin-bottom: 28px;
          transform: rotate(var(--tilt));
          transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease;
          cursor: none;
          box-shadow: 
            0 8px 32px rgba(0,0,0,0.5),
            0 0 0 1px rgba(168,216,255,0.06),
            inset 0 1px 0 rgba(168,216,255,0.08);
        }
        .photo-card.hovered {
          transform: rotate(0deg) scale(1.03);
          box-shadow: 
            0 20px 60px rgba(0,0,0,0.6),
            0 0 0 1px rgba(168,216,255,0.2),
            0 0 40px rgba(168,216,255,0.08),
            inset 0 1px 0 rgba(168,216,255,0.15);
          z-index: 100;
        }

        /* Corner dots */
        .corner-dot {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(168,216,255,0.2);
        }
        .corner-dot.tl { top: 8px; left: 8px; }
        .corner-dot.tr { top: 8px; right: 8px; }
        .corner-dot.bl { bottom: 46px; left: 8px; }
        .corner-dot.br { bottom: 46px; right: 8px; }

        /* Ribbon accent */
        .ribbon-accent {
          position: absolute;
          top: -10px;
          right: 18px;
          width: 20px;
          height: 34px;
          background: linear-gradient(180deg, var(--blue-soft) 0%, var(--blue-mid) 100%);
          border-radius: 0 0 10px 10px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 4px;
          font-size: 10px;
          color: var(--navy);
          box-shadow: 0 4px 12px rgba(168,216,255,0.3);
          z-index: 2;
        }

        /* Photo wrapper */
        .photo-wrapper {
          position: relative;
          border-radius: 2px;
          overflow: hidden;
          line-height: 0;
        }
        .photo-wrapper img {
          width: 100%;
          height: auto;
          display: block;
          filter: brightness(0.92) saturate(0.85);
          transition: filter 0.4s ease, transform 0.4s ease;
        }
        .photo-card.hovered .photo-wrapper img {
          filter: brightness(1) saturate(1);
          transform: scale(1.02);
        }
        .photo-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(0deg, rgba(10,15,30,0.7) 0%, transparent 50%);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 12px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .photo-card.hovered .photo-overlay { opacity: 1; }

        .letter-btn {
          font-family: 'Gochi Hand', cursive;
          font-size: 12px;
          background: rgba(168,216,255,0.15);
          border: 1px solid rgba(168,216,255,0.3);
          color: var(--blue-soft);
          padding: 6px 14px;
          border-radius: 20px;
          cursor: none;
          transition: background 0.2s;
          backdrop-filter: blur(4px);
        }
        .letter-btn:hover { background: rgba(168,216,255,0.25); }

        /* Polaroid bottom */
        .polaroid-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 8px 14px 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .mood-tag {
          font-family: 'Gochi Hand', cursive;
          font-size: 10px;
          color: var(--blue-soft);
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .photo-date {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          color: var(--white-dim);
          opacity: 0.5;
          white-space: nowrap;
        }
        .heart-btn {
          font-family: 'Gochi Hand', cursive;
          font-size: 11px;
          background: none;
          border: none;
          color: rgba(168,216,255,0.5);
          cursor: none;
          transition: color 0.2s, transform 0.2s;
          white-space: nowrap;
          padding: 0;
        }
        .heart-btn.hearted { color: #ff8fa3; }
        .heart-btn:hover { transform: scale(1.2); }

        /* Letter modal */
        .letter-overlay {
          position: fixed;
          inset: 0;
          background: rgba(5,8,18,0.85);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          cursor: none;
        }
        .letter-modal {
          background: linear-gradient(135deg, #111d3c 0%, #0d1530 100%);
          border: 1px solid rgba(168,216,255,0.12);
          border-radius: 8px;
          padding: 40px 36px;
          max-width: 420px;
          width: 100%;
          text-align: center;
          box-shadow: 0 32px 80px rgba(0,0,0,0.6), 0 0 60px rgba(168,216,255,0.06);
          animation: modal-in 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes modal-in {
          from { opacity: 0; transform: scale(0.85) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .letter-header {
          font-family: 'Gochi Hand', cursive;
          font-size: 13px;
          color: var(--blue-mid);
          letter-spacing: 3px;
          margin-bottom: 8px;
          opacity: 0.7;
        }
        .letter-date {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          color: var(--white-dim);
          opacity: 0.4;
          margin-bottom: 24px;
        }
        .letter-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          font-style: italic;
          font-weight: 300;
          color: var(--white);
          line-height: 1.6;
          margin-bottom: 20px;
        }
        .letter-mood {
          font-family: 'Gochi Hand', cursive;
          font-size: 12px;
          color: var(--blue-soft);
          margin-bottom: 28px;
          opacity: 0.7;
        }
        .letter-close {
          font-family: 'Gochi Hand', cursive;
          font-size: 13px;
          background: none;
          border: 1px solid rgba(168,216,255,0.2);
          color: var(--white-dim);
          padding: 8px 24px;
          border-radius: 20px;
          cursor: none;
          transition: all 0.2s;
        }
        .letter-close:hover {
          background: rgba(168,216,255,0.08);
          border-color: rgba(168,216,255,0.4);
        }

        /* FAB upload button */
        .fab {
          position: fixed;
          bottom: 32px;
          right: 32px;
          z-index: 200;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1a2f5e, #0f1e40);
          border: 1px solid rgba(168,216,255,0.25);
          color: var(--blue-soft);
          font-size: 20px;
          cursor: none;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(0,0,0,0.4), 0 0 20px rgba(168,216,255,0.1);
          transition: all 0.3s;
        }
        .fab:hover {
          transform: scale(1.1) rotate(15deg);
          box-shadow: 0 12px 32px rgba(0,0,0,0.5), 0 0 30px rgba(168,216,255,0.2);
          border-color: rgba(168,216,255,0.5);
        }

        /* Upload panel */
        .upload-overlay {
          position: fixed;
          inset: 0;
          background: rgba(5,8,18,0.9);
          backdrop-filter: blur(10px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          cursor: none;
        }
        .upload-panel {
          background: linear-gradient(160deg, #111d3c 0%, #0d1530 100%);
          border: 1px solid rgba(168,216,255,0.12);
          border-radius: 12px;
          padding: 36px 32px;
          max-width: 460px;
          width: 100%;
          box-shadow: 0 32px 80px rgba(0,0,0,0.6);
          animation: modal-in 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }
        .upload-title {
          font-family: 'Gochi Hand', cursive;
          font-size: 18px;
          color: var(--blue-soft);
          text-align: center;
          margin-bottom: 24px;
          letter-spacing: 2px;
        }
        .drop-zone {
          border: 2px dashed rgba(168,216,255,0.2);
          border-radius: 8px;
          padding: 32px;
          text-align: center;
          cursor: none;
          transition: all 0.2s;
          margin-bottom: 18px;
        }
        .drop-zone.drag-over {
          border-color: var(--blue-soft);
          background: rgba(168,216,255,0.05);
        }
        .drop-zone.has-preview { padding: 0; overflow: hidden; }
        .drop-preview { width: 100%; height: 200px; object-fit: cover; display: block; }
        .drop-icon {
          font-size: 32px;
          color: var(--blue-mid);
          opacity: 0.5;
          margin-bottom: 10px;
        }
        .drop-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: var(--white-dim);
          opacity: 0.5;
          line-height: 1.6;
        }
        .caption-input {
          width: 100%;
          background: rgba(168,216,255,0.04);
          border: 1px solid rgba(168,216,255,0.1);
          border-radius: 6px;
          padding: 12px 14px;
          color: var(--white);
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          resize: none;
          outline: none;
          margin-bottom: 14px;
          transition: border-color 0.2s;
        }
        .caption-input:focus { border-color: rgba(168,216,255,0.3); }
        .caption-input::placeholder { color: rgba(240,246,255,0.25); }
        .mood-select {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 20px;
        }
        .mood-option {
          font-family: 'Gochi Hand', cursive;
          font-size: 11px;
          background: none;
          border: 1px solid rgba(168,216,255,0.15);
          color: var(--white-dim);
          padding: 5px 12px;
          border-radius: 20px;
          cursor: none;
          transition: all 0.2s;
          opacity: 0.6;
        }
        .mood-option.selected {
          border-color: var(--blue-soft);
          color: var(--blue-soft);
          opacity: 1;
          background: rgba(168,216,255,0.08);
        }
        .upload-actions {
          display: flex;
          gap: 10px;
          justify-content: flex-end;
        }
        .btn-cancel {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          background: none;
          border: 1px solid rgba(168,216,255,0.15);
          color: var(--white-dim);
          padding: 10px 20px;
          border-radius: 6px;
          cursor: none;
          opacity: 0.6;
          transition: opacity 0.2s;
        }
        .btn-cancel:hover { opacity: 1; }
        .btn-save {
          font-family: 'Gochi Hand', cursive;
          font-size: 14px;
          background: linear-gradient(135deg, rgba(168,216,255,0.15), rgba(123,184,232,0.1));
          border: 1px solid rgba(168,216,255,0.3);
          color: var(--blue-soft);
          padding: 10px 22px;
          border-radius: 6px;
          cursor: none;
          transition: all 0.2s;
          letter-spacing: 0.5px;
        }
        .btn-save:hover:not(:disabled) {
          background: rgba(168,216,255,0.2);
          border-color: rgba(168,216,255,0.5);
        }
        .btn-save:disabled { opacity: 0.35; }

        /* Footer */
        .footer {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 0 0 48px;
          font-family: 'Gochi Hand', cursive;
          font-size: 13px;
          color: var(--blue-mid);
          opacity: 0.35;
          letter-spacing: 2px;
        }

        /* Sparkle burst animation */
        @keyframes sparkle-burst {
          0%   { opacity: 1; transform: translate(0,0) scale(1); }
          100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(0.3); }
        }

        /* Float animation */
        @keyframes float-up {
          from { transform: translateY(0px) rotate(0deg); }
          to   { transform: translateY(-18px) rotate(15deg); }
        }

        /* Card stagger entrance */
        .photo-card {
          animation: card-in 0.6s ease both;
        }
        @keyframes card-in {
          from { opacity: 0; transform: rotate(var(--tilt)) translateY(24px); }
          to   { opacity: 1; transform: rotate(var(--tilt)) translateY(0); }
        }
      `}</style>

      {/* Custom cursor */}
      <div ref={cursorRef} className="custom-cursor">✦</div>

      {/* Floating particles */}
      {particles.map((p) => (
        <FloatingParticle key={p.id} icon={p.icon} style={p.style} />
      ))}

      {/* Header */}
      <header className="header">
        <div className="header-eyebrow">✦ midnight ribbon gallery ✦</div>
        <h1 className="header-title">
          Digital <em>Shrine</em>
        </h1>
        <p className="header-sub">ruang kecil untuk menyimpan kenangan yang tidak akan pernah cukup kata-kata</p>
        <div className="header-divider">✦ ✦ ✦</div>
      </header>

      {/* Gallery */}
      <main className="gallery">
        {photos.map((photo, i) => (
          <div key={photo.id} style={{ animationDelay: `${i * 80}ms` }}>
            <PhotoCard
              photo={photo}
              onHeartClick={toggleHeart}
              hearted={!!hearted[photo.id]}
            />
          </div>
        ))}
      </main>

      {/* Footer */}
      <footer className="footer">made with ♡ · hanya untukmu</footer>

      {/* FAB */}
      <button className="fab" onClick={() => setShowUpload(true)} title="tambah foto">
        ✦
      </button>

      {/* Upload panel */}
      {showUpload && (
        <UploadPanel onClose={() => setShowUpload(false)} onAdd={addPhoto} />
      )}
    </>
  );
}
