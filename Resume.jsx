/* In-site PDF viewer: shows the document on the page instead of downloading it.
   Used by the Resume page and the SmartEdge paper page. */

function PdfViewer({ eyebrow, title, sub, src, actions, onBack }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <main className="page">
      <section className="section resume" style={{ paddingTop: "var(--sp-16)" }}>
        {onBack && (
          <button className="btn btn-quiet" onClick={onBack} style={{ marginBottom: "var(--sp-6)", paddingLeft: 0 }}>
            <Icon name="arrow-left" size={15} /> Back
          </button>
        )}
        <div className="resume-head">
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="obs-h1" style={{ margin: "var(--sp-4) 0 0" }}>{title}</h1>
            {sub && <p className="pdf-sub">{sub}</p>}
          </div>
          <div className="resume-actions">{actions}</div>
        </div>

        <div className={`resume-frame ${loaded ? "is-loaded" : ""}`}>
          <iframe src={`${src}#view=FitH&toolbar=0&navpanes=0`} title={`${title} (PDF)`} onLoad={() => setLoaded(true)} />
        </div>
        <p className="resume-fallback">
          PDF not showing? <a href={src} target="_blank" rel="noopener noreferrer">Open it directly</a>.
        </p>
      </section>
    </main>
  );
}

function Resume() {
  return (
    <PdfViewer
      eyebrow="Resume"
      title="Uday Chadha"
      src={RESUME_URL}
      actions={<>
        <a className="btn btn-primary" href={RESUME_URL} download="Uday-Chadha-Resume.pdf"><Icon name="download" /> Download PDF</a>
        <a className="btn btn-ghost" href={RESUME_URL} target="_blank" rel="noopener noreferrer">Open in new tab <Icon name="arrow-up-right" size={15} /></a>
      </>}
    />
  );
}

/* SmartEdge — our own hosted copy, so the paper stays readable even if the lab page moves. */
function Paper({ setRoute }) {
  const p = window.SMARTEDGE;
  return (
    <PdfViewer
      eyebrow="Published research · 2018"
      title={p.title}
      sub={`${p.authors} · ${p.venue}`}
      src={p.localPdf}
      onBack={() => setRoute("about")}
      actions={<a className="btn btn-primary" href={p.publisher} target="_blank" rel="noopener noreferrer">View on IEEE Xplore <Icon name="arrow-up-right" size={15} /></a>}
    />
  );
}

Object.assign(window, { PdfViewer, Resume, Paper });
