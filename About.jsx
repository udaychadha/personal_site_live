/* About — short bio, published research (SmartEdge) and who has built on it. */

const SMARTEDGE = {
  title: "SmartEdge: A Smart Contract for Edge Computing",
  authors: "Kwame-Lante Wright, Martin Martinez, Uday Chadha, Bhaskar Krishnamachari",
  venue: "IEEE iThings 2018 · Cybermatics Congress · pp. 1685–1690",
  summary: "An Ethereum smart contract that lets low-power IoT devices offload computation to more powerful edge nodes, with the contract tracking the work and settling payment, so devices can buy compute from each other without a trusted middleman.",
  publisher: "https://ieeexplore.ieee.org/document/8726601",   // where it's published
  doi: "https://doi.org/10.1109/Cybermatics_2018.2018.00281",
  localPdf: "assets/papers/smartedge-2018.pdf",                  // our own copy, in case the source moves
  labPdf: "https://anrg.usc.edu/www/papers/SmartEdge_BIoT2018.pdf",
  citedBy: "https://openalex.org/works?filter=cites:W2948993531&sort=cited_by_count:desc",
  citationCount: 39,
  citationsAsOf: "Nov 2026",
};

/* Selected works that cite SmartEdge (source: OpenAlex citation index). */
const CITED_BY = [
  { title: "Blockchain smart contracts: Applications, challenges, and future trends", venue: "Peer-to-Peer Networking and Applications", year: 2021, url: "https://doi.org/10.1007/s12083-021-01127-0" },
  { title: "BlockIoTIntelligence: A blockchain-enabled intelligent IoT architecture with AI", venue: "Future Generation Computer Systems", year: 2019, url: "https://doi.org/10.1016/j.future.2019.09.002" },
  { title: "Survey on blockchain based smart contracts: Applications, opportunities and challenges", venue: "Journal of Network and Computer Applications", year: 2020, url: "https://doi.org/10.1016/j.jnca.2020.102857" },
  { title: "PUFchain: A hardware-assisted blockchain for device and data security in the Internet of Everything", venue: "IEEE Consumer Electronics Magazine", year: 2020, url: "https://doi.org/10.1109/mce.2019.2953758" },
  { title: "Blockchain and edge computing–based architecture for participatory smart city applications", venue: "Concurrency and Computation: Practice and Experience", year: 2019, url: "https://doi.org/10.1002/cpe.5566" },
  { title: "Decentralized caching framework toward edge network based on blockchain", venue: "IEEE Internet of Things Journal", year: 2020, url: "https://doi.org/10.1109/jiot.2020.3003700" },
];

/* US patents that cite SmartEdge as prior art (verified on Google Patents). */
const PATENTS = [
  { title: "Edge computing platform supported by smart contract enabled blockchain network", venue: "US 11,763,332 B2 · Theta Labs, Inc.", year: 2023, url: "https://patents.google.com/patent/US11763332B2/en" },
  { title: "Edge computing platform supported by smart contract enabled blockchain network with off-chain solution verification", venue: "US 12,056,730 B2 · Theta Labs, Inc.", year: 2024, url: "https://patents.google.com/patent/US12056730B2/en" },
];

/* Follow-on work from the same USC lab that builds on SmartEdge. */
const BUILT_ON = [
  { title: "Enhancing support for machine learning and edge computing on an IoT data marketplace", venue: "AIChallengeIoT @ SenSys 2019 · USC", year: 2019, url: "https://doi.org/10.1145/3363347.3363364" },
  { title: "MOTIVE: Micropayments for trusted vehicular services", venue: "arXiv · USC", year: 2019, url: "https://doi.org/10.48550/arxiv.1904.01630" },
];

function RefList({ items }) {
  return (
    <div className="entry-list">
      {items.map((r) => (
        <a key={r.url} className="entry ref" href={r.url} target="_blank" rel="noopener noreferrer">
          <span className="entry-date">{r.year}</span>
          <div>
            <h4 className="ref-title">{r.title}</h4>
            <p className="ref-venue">{r.venue}</p>
          </div>
          <span className="entry-arrow"><Icon name="arrow-up-right" size={16} /></span>
        </a>
      ))}
    </div>
  );
}

const TESLA = [
  {
    id: "sim", title: "Training FSD on sim",
    url: "https://x.com/elonmusk/status/1643144343254110209",
    image: "assets/tesla-simulation-elon-musk-2023.png", width: 628, height: 337,
    alt: "Elon Musk's April 3, 2023 post describing how Tesla uses simulation to generate training examples for rare potential accidents.",
    caption: "This post describes the simulation and training-data work I contributed to at Tesla.",
    label: "Elon Musk · April 3, 2023",
  },
  {
    id: "park", title: "High-fidelity Park Assist",
    hero: "assets/tesla-park-assist-render.jpg",
    heroAlt: "A Model Y rendered in the high-fidelity Park Assist view, with nearby cars and cones reconstructed in 3D around it.",
    url: "https://x.com/Tesla/status/1743701415208403092",
    image: "assets/tesla-park-assist-2024.jpg", width: 1200, height: 633,
    alt: "Tesla's January 6, 2024 video of the touchscreen showing a 3D reconstruction of the parking lot around the car.",
    caption: "A 3D view of the world around the car while parking: nearby objects, barriers, vehicles and painted lines, modeled by a dedicated neural network. I worked on this.",
    label: "Tesla · January 6, 2024",
  },
];

function About({ setRoute }) {
  const p = SMARTEDGE;
  return (
    <main className="page page-narrow">
      <section className="section" style={{ paddingTop: "var(--sp-16)" }}>
        <Eyebrow>About</Eyebrow>
        <h1 className="about-lead" style={{ marginTop: "var(--sp-6)" }}>
          I'm Uday. <span className="muted">These days I'm building DLCs for robots. Previously, Autopilot simulation at Tesla.</span>
        </h1>

        <div className="obs-prose" style={{ marginTop: "var(--sp-8)" }}>
          <p>Back at USC, I coauthored SmartEdge, a paper on using smart contracts to let devices buy compute from each other at the edge.</p>
        </div>

        <div style={{ marginTop: "var(--sp-10)", display: "flex", gap: "var(--sp-3)", flexWrap: "wrap" }}>
          <Button icon="file-text" onClick={() => setRoute("resume")}>View resume</Button>
          <Button variant="ghost" icon="book-open" onClick={() => setRoute("writing")}>Read the writing</Button>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2 className="section-title">At Tesla</h2>
        </div>
        {TESLA.map((t) => (
          <article key={t.id} className="paper-card tesla-card">
            <span className="entry-date">Tesla · Autopilot</span>
            <h3 className="paper-title">{t.title}</h3>
            {t.hero && (
              <img className="tesla-hero" src={t.hero} alt={t.heroAlt} loading="lazy"
                onError={(e) => { e.currentTarget.style.display = "none"; }} />
            )}
            <figure className="proj-mention" style={{ marginTop: "var(--sp-4)" }}>
              <a className="proj-mention-image" href={t.url} target="_blank" rel="noopener noreferrer">
                <img src={t.image} alt={t.alt} width={t.width} height={t.height} loading="lazy" />
              </a>
              <figcaption>
                <p>{t.caption}</p>
                <a className="proj-mention-source" href={t.url} target="_blank" rel="noopener noreferrer">
                  {t.label} <span aria-hidden="true">↗</span>
                </a>
              </figcaption>
            </figure>
          </article>
        ))}
      </section>

      <section className="section">
        <div className="section-head">
          <h2 className="section-title">Published research</h2>
        </div>
        <article className="paper-card">
          <span className="entry-date">{p.venue}</span>
          <h3 className="paper-title">{p.title}</h3>
          <p className="paper-authors">{p.authors.split("Uday Chadha").map((part, i, arr) => (
            <React.Fragment key={i}>{part}{i < arr.length - 1 && <strong>Uday Chadha</strong>}</React.Fragment>
          ))}</p>
          <p className="paper-summary">{p.summary}</p>
          <div className="paper-actions">
            <a className="btn btn-primary" href={p.publisher} target="_blank" rel="noopener noreferrer">Read on IEEE Xplore <Icon name="arrow-up-right" size={15} /></a>
            <Button variant="ghost" icon="file-text" onClick={() => setRoute("paper")}>Read it here</Button>
          </div>
          <div className="paper-stat">
            <span className="paper-stat-n">{p.citationCount}</span>
            <span className="paper-stat-k">citations · <a href={p.citedBy} target="_blank" rel="noopener noreferrer">see all</a> · as of {p.citationsAsOf}</span>
          </div>
        </article>

        <h3 className="ref-head">Cited in industry patents</h3>
        <p className="ref-note">Theta Labs, the company behind the Theta Network and its EdgeCloud platform, cites SmartEdge as prior art in two granted US patents for its smart-contract edge computing platform.</p>
        <RefList items={PATENTS} />

        <h3 className="ref-head">Follow-on work</h3>
        <p className="ref-note">Later papers from the same USC lab that build on SmartEdge as prior work.</p>
        <RefList items={BUILT_ON} />

        <h3 className="ref-head">Cited by</h3>
        <p className="ref-note">A few of the most-cited papers that reference SmartEdge, including three widely read surveys of smart contracts and blockchain IoT.</p>
        <RefList items={CITED_BY} />
      </section>
    </main>
  );
}

Object.assign(window, { About, SMARTEDGE });
