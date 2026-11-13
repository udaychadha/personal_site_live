/* Home — masthead + latest writing */

function Home({ setRoute, openPost, writing }) {
  const featured = writing.slice(0, 3);
  return (
    <main className="page">
      {/* MASTHEAD */}
      <section className="masthead">
        <h1 className="hero-name">Hi, I'm Uday.<br /><em>I just work here.</em></h1>
        <p className="hero-sub">
          Currently building DLCs for robots. Previously building Autopilot simulation at Tesla.
        </p>
        <div className="hero-actions">
          <Button icon="book-open" onClick={() => setRoute("writing")}>Read the writing</Button>
          <Button variant="ghost" iconRight="arrow-right" onClick={() => setRoute("about")}>About me</Button>
        </div>
      </section>

      {/* FEATURED WRITING */}
      <section className="section">
        <div className="section-head">
          <h2 className="section-title">Writing</h2>
          <button className="btn btn-quiet" onClick={() => setRoute("writing")}>All writing →</button>
        </div>
        <div className="entry-list">
          {featured.map((w) => {
            const Entry = w.url ? "a" : "article";
            return (
              <Entry key={w.id} className="entry" {...(w.url ? { href: w.url, target: "_blank", rel: "noopener noreferrer" } : { onClick: () => openPost(w.id) })}>
                <span className="entry-date">{w.date}</span>
                <div>
                  <h3 className="entry-title">{w.title}</h3>
                  <p className="entry-excerpt">{w.excerpt}</p>
                  {w.url && <div className="entry-meta" style={{ marginTop: "0.6rem" }}><Chip accent>{w.topic}</Chip><Chip>{w.readtime}</Chip></div>}
                </div>
                <span className="entry-arrow"><Icon name="arrow-up-right" size={18} /></span>
              </Entry>
            );
          })}
        </div>
      </section>

    </main>
  );
}

window.Home = Home;
