/* Writing — essay index + the reading view (Post) */

function Writing({ writing, openPost }) {
  return (
    <main className="page page-narrow">
      <section className="section" style={{ paddingTop: "var(--sp-16)" }}>
        <Eyebrow>The notebook</Eyebrow>
        <h1 className="obs-h1" style={{ margin: "var(--sp-4) 0 var(--sp-6)" }}>Writing</h1>
        <p className="obs-prose" style={{ marginBottom: "var(--sp-12)" }}>
          One published paper, and a few drafts I'm still working on.
        </p>
        <div className="entry-list">
          {writing.map((w) => {
            const Entry = w.url ? "a" : "article";
            return (
              <Entry key={w.id} className="entry" {...(w.url ? { href: w.url, target: "_blank", rel: "noopener noreferrer" } : { onClick: () => openPost(w.id) })}>
                <span className="entry-date">{w.date}</span>
                <div>
                  <h3 className="entry-title">{w.title}</h3>
                  <p className="entry-excerpt">{w.excerpt}</p>
                  {w.authors && <p className="entry-excerpt">{w.authors}</p>}
                  <div className="entry-meta" style={{ marginTop: "0.6rem" }}>
                    <Chip>{w.readtime}</Chip>
                    {w.topic && <Chip accent>{w.topic}</Chip>}
                  </div>
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

function Post({ post, setRoute }) {
  if (!post) return null;
  if (post.html) return <HtmlPost post={post} setRoute={setRoute} />;
  return (
    <main className="page">
      <article className="post">
        <header className="post-header">
          <button className="btn btn-quiet" onClick={() => setRoute("writing")} style={{ marginBottom: "var(--sp-6)", paddingLeft: 0 }}>
            <Icon name="arrow-left" size={15} /> Back to writing
          </button>
          <div className="post-byline">
            <span>{post.date}</span><span>·</span><span>{post.readtime}</span>{post.topic && <><span>·</span><span>{post.topic}</span></>}
          </div>
          <h1 className="post-title">{post.title}</h1>
        </header>

        <div className="post-body">
          <div className="obs-prose dropcap">
            <p>{post.body[0]}</p>
          </div>

          {post.figure === "moon" && (
            <figure className="figure">
              <MoonFigure height={240} />
              <figcaption className="fig-cap">{post.figureCaption || "Drag the figure to explore the state change."}</figcaption>
            </figure>
          )}

          <div className="obs-prose">
            {post.body.slice(1, 3).map((para, i) => <p key={i}>{para}</p>)}
            <h2 className="obs-h2">{post.sectionTitle || "The part everyone skips"}</h2>
            {post.body.slice(3, 5).map((para, i) => <p key={i}>{para}</p>)}
          </div>

          {post.chart && (
            <figure className="figure">
              <LineChart
                label={post.chart.label}
                unit={post.chart.unit}
                data={post.chart.data}
                caption={post.chart.caption}
              />
            </figure>
          )}

          <div className="obs-prose">
            {post.body.slice(5).map((para, i) => <p key={i}>{para}</p>)}
            <blockquote>{post.pull}</blockquote>
          </div>
        </div>
      </article>
    </main>
  );
}

/* Posts authored as static HTML (figures and all) — body lives in posts/<name>.js */
function HtmlPost({ post, setRoute }) {
  const body = (window.POST_HTML || {})[post.html] || "";
  /* Post-specific figure scripts (animations, tooltips); cleanup stops them on navigate-away. */
  useEffect(() => {
    const init = (window.POST_INIT || {})[post.html];
    const cleanup = init ? init() : null;
    return () => { if (typeof cleanup === "function") cleanup(); };
  }, [post.html]);
  return (
    <main className="page">
      <article className="post">
        <header className="post-header">
          <button className="btn btn-quiet" onClick={() => setRoute("writing")} style={{ marginBottom: "var(--sp-6)", paddingLeft: 0 }}>
            <Icon name="arrow-left" size={15} /> Back to writing
          </button>
          <div className="post-byline">
            <span>{post.date}</span><span>·</span><span>{post.readtime}</span>{post.topic && <><span>·</span><span>{post.topic}</span></>}
          </div>
          {post.titleHtml
            ? <h1 className="post-title essay-title" dangerouslySetInnerHTML={{ __html: post.titleHtml }} />
            : <h1 className="post-title">{post.title}</h1>}
        </header>
        <div className="essay" dangerouslySetInnerHTML={{ __html: body }} />
      </article>
    </main>
  );
}

Object.assign(window, { Writing, Post, HtmlPost });
