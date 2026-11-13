/* Nav — sticky, blurred, with route links + theme toggle */
const LOGO_SVG = `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="20" cy="20" r="15.25" stroke="currentColor" stroke-width="1.5" opacity="0.55"/>
  <circle cx="31.6" cy="14.2" r="2.4" fill="currentColor"/>
  <text x="20" y="20" text-anchor="middle" dominant-baseline="central" font-family="'Newsreader', Georgia, serif" font-size="14" font-weight="500" fill="currentColor" letter-spacing="-0.5">UC</text>
</svg>`;

const RESUME_URL = "assets/uday-chadha-resume.pdf";

function Nav({ route, setRoute, theme, setTheme, accent, setAccent }) {
  const links = [
    ["home", "Home"],
    ["writing", "Writing"],
    ["about", "About"],
    ["resume", "Resume"],
  ];
  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="brand" onClick={() => setRoute("home")}>
          <span dangerouslySetInnerHTML={{ __html: LOGO_SVG }} />
          <span className="brand-name">Uday Chadha</span>
        </div>
        <div className="nav-links">
          {links.map(([id, label]) => (
            <button key={id}
              className={`nav-link ${route === id || (route === "post" && id === "writing") ? "is-active" : ""}`}
              onClick={() => setRoute(id)}>
              {label}
            </button>
          ))}
          <AccentPicker accent={accent} setAccent={setAccent} />
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
      </div>
    </nav>
  );
}

function Footer({ setRoute }) {
  return (
    <footer className="footer">
      <div className="page">
        <div className="footer-inner">
          <div className="footer-fine">© 2026 Uday Chadha</div>
          <div className="footer-links">
            <a className="footer-link" href="#" onClick={(e) => e.preventDefault()}>LinkedIn</a>
            <a className="footer-link" href="#" onClick={(e) => e.preventDefault()}>Email</a>
            <a className="footer-link" href="#resume" onClick={(e) => { e.preventDefault(); setRoute("resume"); }}>Resume</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Nav, Footer, RESUME_URL });
