import { useEffect, useState, useRef } from "react";
import "./App.css";

// ====== YAHAN SE DETAILS BADLO ======
const D = {
  groomEn: "Sumit",
  brideEn: "Nisha",
  groom: "Sumit Kumar",
  bride: "Nisha Kumari",
  groomFamily: [
    "SON OF",
    "MR. SHANKAR SAHAY",
    "MRS. INDU SAHAI",
    "ROHTAS",
  ],
  brideFamily: [
    "DAUGHTER OF",
    "MR. RAVINDRA SRIVASTAV",
    "MRS. MAMTA SRIVASTAV",
    "ROHTAS",
  ],
  weddingDate: "2026-12-02T17:00:00",
  venue: "जे.पी. मैरेज हॉल",
  venueAddr: "नारायण टोला, डालमियानगर, रोहतास (बिहार)",
  mapLink:
    "https://www.google.com/maps/search/?api=1&query=JP+Marriage+Hall+Narayan+Tola+Dalmianagar",
  note: "बारात दिनांक 02.12.2026 (बुधवार) को सुरक्षित वाहन द्वारा शाम 05 बजे जे.पी. मैरेज हॉल, नारायण टोला, डालमियानगर से लाला कॉलोनी, न्यू डिलियाँ, डेहरी के लिए प्रस्थान करेगी।",
  host: "शंकर सहाय",
  phones: ["9852938997", "8340734995"],
  whatsapp: "919852938997",
  address: "क्वा.नं. एस/134, डालमियानगर, रोहतास (बिहार) 821305",
  welcome: "समस्त सहाय परिवार",
  wellwishers:
    "रिन्कु सहाय, पिन्कु सहाय, राकेश सहाय, गोविन्द सहाय, पंकज सहाय, चन्द्रकान्त सहाय, बब्लू सहाय, दीपक सहाय, विशाल सहाय एवं समस्त सहाय परिवार",
  funLine: "न कोई फोन, न कोई मैरेज, न कोई बहाना होगा, मेरे मामू के शादी में आपको जुलूल से जुलूल आना होगा",
  funBy: "यक्षित, उत्कृष्ट",
};

const EVENTS = [
  { icon: "🥥", name: "शुभ तिलक", date: "30.11.2026", day: "सोमवार" },
  { icon: "🌿", name: "हल्दी एवं मंडप", date: "01.12.2026", day: "मंगलवार" },
  { icon: "🪔", name: "शुभ विवाह", date: "02.12.2026", day: "बुधवार", main: true },
  { icon: "🏠", name: "बारात वापसी", date: "03.12.2026", day: "गुरुवार" },
];
// ====================================

function useCountdown(target) {
  const calc = () => {
    const diff = Math.max(0, new Date(target) - new Date());
    return [
      [Math.floor(diff / 86400000), "दिन"],
      [Math.floor((diff / 3600000) % 24), "घंटे"],
      [Math.floor((diff / 60000) % 60), "मिनट"],
      [Math.floor((diff / 1000) % 60), "सेकंड"],
    ];
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, [target]);
  return t;
}

const petals = Array.from({ length: 16 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  size: 10 + ((i * 7) % 16),
  dur: 9 + ((i * 3) % 9),
  delay: -((i * 5) % 12),
}));

const venuePhotos = [
  {
    src: "/venue5.jpg",
    alt: "JP Marriage Hall - Grand stage with floral decor",
  },
  {
    src: "/venue1.jpg",
    alt: "JP Marriage Hall - Floral decorated entry passage",
  },
  {
    src: "/venue2.jpg",
    alt: "JP Marriage Hall - Outdoor decorated seating area",
  },
  {
    src: "/venue3.jpg",
    alt: "JP Marriage Hall - Indoor decorated corridor with lights",
  },
  {
    src: "/venue4.jpg",
    alt: "JP Marriage Hall - Building exterior with lights",
  },
  {
    src: "/venue6.jpg",
    alt: "JP Marriage Hall - Spacious indoor reception hall",
  },
];

export default function App() {
  const count = useCountdown(D.weddingDate);
  const [rsvp, setRsvp] = useState(false);
  const [f, setF] = useState({ name: "", guests: "1", coming: "हाँ, ज़रूर आऊँगा" });
  const [venuePhotoIndex, setVenuePhotoIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setVenuePhotoIndex((current) => (current + 1) % venuePhotos.length);
    }, 2500);

    return () => window.clearInterval(timer);
  }, []);

  const changeVenuePhoto = (step) => {
    setVenuePhotoIndex((current) => (current + step + venuePhotos.length) % venuePhotos.length);
  };

  const [opened, setOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleOpen = () => {
    setOpened(true);
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn("Audio autoplay blocked or failed:", err);
      });
    }
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn("Audio play failed:", err);
      });
    }
  };

  useEffect(() => {
    if (!opened) return;

    const nodes = document.querySelectorAll(".section-fade");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.15 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [opened]);

  const send = (e) => {
    e.preventDefault();
    const text = `प्रणाम! मैं ${f.name} हूँ। ${D.groomEn} & ${D.brideEn} की शादी में: ${f.coming}। कुल लोग: ${f.guests}।`;
    window.open(`https://wa.me/${D.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="page">
      <audio ref={audioRef} src="/wedding-music.mp3" loop preload="auto" />

      {opened && (
        <button
          type="button"
          className={`music-fab ${isPlaying ? "playing" : "paused"}`}
          onClick={toggleAudio}
          aria-label={isPlaying ? "संगीत रोकें" : "संगीत बजाएं"}
          title={isPlaying ? "संगीत रोकें (Pause)" : "संगीत बजाएं (Play)"}
        >
          <span className="music-fab-icon">{isPlaying ? "🎵" : "🔇"}</span>
          <span className="music-fab-text">{isPlaying ? "Music" : "Muted"}</span>
          {isPlaying && (
            <span className="music-fab-bars">
              <span className="bar b1"></span>
              <span className="bar b2"></span>
              <span className="bar b3"></span>
            </span>
          )}
        </button>
      )}

      {!opened && (
        <div className="splash" aria-live="polite">
          <div className="splash-inner">
            <p className="splash-shubh">॥ श्री गणेशाय नमः ॥</p>
            <div className="lotus">🪔</div>
            <p className="splash-tag">WEDDING INVITATION</p>
            <h1 className="splash-names">
              <span>{D.groomEn}</span>
              <span className="splash-amp"> &amp; </span>
              <span>{D.brideEn}</span>
            </h1>
            <p className="splash-subtitle">ARE GETTING MARRIED</p>
            <div className="splash-date">02 · DECEMBER · 2026</div>
            <button type="button" className="splash-btn" onClick={handleOpen}>
              ✉ TAP TO OPEN INVITATION
            </button>
          </div>
        </div>
      )}

      {petals.map((p, i) => (
        <span key={i} className="petal"
          style={{ left: p.left, width: p.size, height: p.size, animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s` }} />
      ))}

      <main className="card">
        <div className="topbar">ॐ &nbsp; शुभ ✦ लाभ &nbsp; 卐</div>

        <header className="head section-fade">
          <p className="shlok">
            मंगलम् पुण्डरीकाक्षः, मंगलाय तनो हरिः॥
          </p>
          <p className="intro-text">Two souls with but a single thought, two hearts that beat as one.</p>
          <p className="invite-line">With great joy, we invite you to celebrate<br />the wedding of</p>
        </header>

        <section className="couple section-fade">
          <div className="box groom-box">
            <span className="tag">GROOM</span>
            <h2 className="family-name">
              <span>{D.groom}</span>
            </h2>
            {D.groomFamily.map((l) => <p key={l}>{l}</p>)}
          </div>

          <div className="mid-wrap">
            <div className="mid">&amp;</div>
          </div>

          <div className="box bride-box">
            <span className="tag">BRIDE</span>
            <h2 className="family-name">
              <span>{D.bride}</span>
            </h2>
            {D.brideFamily.map((l) => <p key={l}>{l}</p>)}
          </div>
        </section>

        <p className="invite section-fade">
          We invite you and your family to grace this sacred celebration with your love, blessings, and warm presence.
        </p>

        <div className="photo-wrap section-fade">
          <img
            className="photo"
            src="/couple-poster.png"
            alt="Sumit and Nisha wedding portrait"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80";
            }}
          />
        </div>
        <p className="script section-fade">{D.groom} &amp; {D.bride}</p>
        <a
          className="btn gold section-fade"
          href="https://drive.google.com/file/d/1NVG4cXuu8iPwH1koxvU9Mp4PilK-sSNZ/view?usp=drive_link"
          target="_blank"
          rel="noreferrer"
        >
          📜 VIEW PHYSICAL CARD
        </a>

        <h3 className="section-title section-fade"><span className="diamond" />Wedding Festivities<span className="diamond" /></h3>
        <section className="events section-fade">
          {EVENTS.map((e) => (
            <div key={e.name} className={`ev ${e.main ? "main" : ""}`}>
              <div className="ico">{e.icon}</div>
              <b>{e.name === "शुभ तिलक" ? "Tilak Ceremony" : e.name === "हल्दी एवं मंडप" ? "Haldi & Mandap" : e.name === "शुभ विवाह" ? "Wedding Ceremony" : "Barat Return"}</b>
              <p>{e.date}</p>
              <small>({e.day})</small>
            </div>
          ))}
        </section>

        <h3 className="section-title section-fade"><span className="diamond" />Countdown to Our Celebration<span className="diamond" /></h3>
        <div className="count section-fade">
          {count.map(([v, l]) => (
            <div key={l}><strong>{String(v).padStart(2, "0")}</strong><span>{l}</span></div>
          ))}
        </div>

        <h3 className="section-title venue-heading section-fade">Venue</h3>
        <section className="venue section-fade">
          <div className="venue-gallery" aria-label="Wedding venue photos">
            {venuePhotos.map((photo, index) => (
              <img
                key={photo.src}
                className={`venue-photo${index === venuePhotoIndex ? " active" : ""}`}
                src={photo.src}
                alt={photo.alt}
                loading="eager"
                aria-hidden={index !== venuePhotoIndex}
              />
            ))}
            <button
              type="button"
              className="venue-arrow previous"
              aria-label="Previous venue photo"
              onClick={() => changeVenuePhoto(-1)}
            >
              ‹
            </button>
            <button
              type="button"
              className="venue-arrow next"
              aria-label="Next venue photo"
              onClick={() => changeVenuePhoto(1)}
            >
              ›
            </button>
            <div className="venue-dots" aria-label="Choose a venue photo">
              {venuePhotos.map((photo, index) => (
                <button
                  key={photo.src}
                  type="button"
                  className={index === venuePhotoIndex ? "active" : ""}
                  aria-label={`Show venue photo ${index + 1}`}
                  aria-pressed={index === venuePhotoIndex}
                  onClick={() => setVenuePhotoIndex(index)}
                />
              ))}
            </div>
          </div>
          <h2>{D.venue}</h2>
          <p>{D.venueAddr}</p>
          <p className="note">{D.note}</p>
          <a className="btn pink" href={D.mapLink} target="_blank" rel="noreferrer">📍 VIEW ON MAP</a>
        </section>

        <section className="fun section-fade">
          <p>“{D.funLine}”</p>
          <b>~ {D.funBy}</b>
        </section>

        <section className="foot section-fade">
          <p><b>With love & blessings: {D.welcome}</b></p>
          <p className="small"><b>With warm wishes from:</b> {D.wellwishers}</p>
          <p className="host">With heartfelt wishes<br /><b>{D.host}</b></p>
          <p className="small">{D.address}</p>
          <p>
            {D.phones.map((p) => (
              <a key={p} href={`tel:${p}`} className="tel">📞 {p}</a>
            ))}
          </p>
          <p className="hindi">Your presence will be our greatest blessing.</p>
          <button className="btn dark" onClick={() => setRsvp(!rsvp)}>CLICK HERE TO RSVP</button>

          {rsvp && (
            <form className="form" onSubmit={send}>
              <input required placeholder="आपका नाम" value={f.name}
                onChange={(e) => setF({ ...f, name: e.target.value })} />
              <select value={f.coming} onChange={(e) => setF({ ...f, coming: e.target.value })}>
                <option>हाँ, ज़रूर आऊँगा</option>
                <option>माफ़ कीजिए, नहीं आ पाऊँगा</option>
              </select>
              <input type="number" min="1" max="15" value={f.guests}
                onChange={(e) => setF({ ...f, guests: e.target.value })} />
              <button className="btn gold" type="submit">WhatsApp पर भेजें</button>
            </form>
          )}
        </section>
      </main>
    </div>
  );
}