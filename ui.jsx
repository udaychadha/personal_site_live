/* Shared primitives for the Observatory UI kit */
const { useState, useEffect, useRef, useCallback } = React;

/* Lucide icon — renders the named icon via the global lucide map */
function Icon({ name, size = 16, className = "", style = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && window.lucide && window.lucide.icons) {
      const data = window.lucide.icons[name] || window.lucide.icons[toPascal(name)];
      ref.current.innerHTML = "";
      if (data) {
        const svg = window.lucide.createElement(data);
        svg.setAttribute("width", size);
        svg.setAttribute("height", size);
        svg.setAttribute("stroke-width", "1.75");
        ref.current.appendChild(svg);
      }
    }
  }, [name, size]);
  return <span ref={ref} className={className} style={{ display: "inline-flex", ...style }} />;
}
function toPascal(s) { return s.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(""); }

function Button({ variant = "primary", icon, iconRight, children, onClick, style }) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick} style={style}>
      {icon && <Icon name={icon} />}
      {children}
      {iconRight && <Icon name={iconRight} />}
    </button>
  );
}

function Chip({ children, accent }) {
  return <span className={`chip ${accent ? "chip-accent" : ""}`}>{children}</span>;
}

function Eyebrow({ children }) {
  return <span className="eyebrow">{children}</span>;
}

/* Sun / moon theme toggle — Night ↔ Paper */
function ThemeToggle({ theme, setTheme }) {
  return (
    <div className="theme-toggle" role="group" aria-label="Theme">
      <button className={theme === "night" ? "is-on" : ""} onClick={() => setTheme("night")} aria-label="Night theme" title="Night">
        <Icon name="moon" />
      </button>
      <button className={theme === "paper" ? "is-on" : ""} onClick={() => setTheme("paper")} aria-label="Paper theme" title="Paper">
        <Icon name="sun" />
      </button>
    </div>
  );
}

/* Accent picker — mono by default; color is opt-in.
   One trigger in the nav; click opens a small popover of swatches. */
const ACCENTS = [
  { id: "teal",  name: "Teal",  dot: "#4FA89B" },
  { id: "amber", name: "Amber", dot: "#C79A46" },
  { id: "iris",  name: "Iris",  dot: "#9187D6" },
  { id: "sky",   name: "Sky",   dot: "#5B97D8" },
];
function AccentPicker({ accent, setAccent }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => { if (wrap.current && !wrap.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);
  const current = ACCENTS.find((a) => a.id === accent);
  const surprise = () => {
    const pool = ACCENTS.filter((a) => a.id !== accent);
    setAccent(pool[Math.floor(Math.random() * pool.length)].id);
  };
  return (
    <div className="accent-picker" ref={wrap}>
      <button className="accent-trigger" aria-haspopup="true" aria-expanded={open}
        aria-label="Accent color" data-tip="Couldn't pick a color. You can."
        onClick={() => setOpen((o) => !o)}>
        <span className={`accent-swatch ${current ? "" : "is-mono"}`} style={current ? { background: current.dot } : undefined} />
      </button>
      {open && (
        <div className="accent-pop" role="group" aria-label="Accent color">
          <p className="accent-pop-title">Couldn't decide on a color.</p>
          <p className="accent-pop-sub">So it's black and white, unless you'd rather not.</p>
          <button className={`accent-mono ${accent === "mono" ? "is-on" : ""}`} aria-pressed={accent === "mono"} onClick={() => setAccent("mono")}>
            <span className="accent-swatch is-mono" /> Mono <span className="accent-mono-k">default</span>
          </button>
          <div className="accent-row">
            {ACCENTS.map((a) => (
              <button key={a.id} className={`accent-dot ${accent === a.id ? "is-on" : ""}`}
                style={{ background: a.dot }} aria-pressed={accent === a.id}
                onClick={() => setAccent(a.id)} aria-label={a.name} title={a.name} />
            ))}
            <button className="accent-dice" onClick={surprise} aria-label="Surprise me" title="Surprise me">
              <Icon name="dices" size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* Intersection-observer reveal hook → returns a ref to attach */
function useReveal(options = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in", "reveal"); io.unobserve(e.target); }
      });
    }, { threshold: 0.15, ...options });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/* Staggered reveal for a list of children */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal-up ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

Object.assign(window, { useState, useEffect, useRef, useCallback, Icon, Button, Chip, Eyebrow, ThemeToggle, AccentPicker, ACCENTS, useReveal, Reveal });
