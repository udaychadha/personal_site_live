/* app — content data, routing, theme persistence */

const WRITING = [
  { id: "pnp", date: "Nov 2026", title: "P = NP for software, and why new grads are forced into greenfield",
    titleHtml: 'P = NP for software, <em>and why new grads are forced into greenfield</em>',
    readtime: "7 min", topic: "Engineering", html: "pnp",
    excerpt: "Agents made the search nearly free. The human job collapsed into verification, and that split the junior market between brownfield and greenfield." },
];

function App() {
  const [route, setRoute] = useState("home");
  const [postId, setPostId] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem("obs-theme") || "night");
  const [accent, setAccent] = useState(() => { try { return localStorage.getItem("obs-accent-v2") || "mono"; } catch (e) { return "mono"; } });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("obs-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-accent", accent);
    try { localStorage.setItem("obs-accent-v2", accent); } catch (e) {}
  }, [accent]);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" }); }, [route, postId]);

  const openPost = (id) => { setPostId(id); setRoute("post"); };
  const post = WRITING.find((w) => w.id === postId);

  return (
    <div className="app">
      <Nav route={route} setRoute={setRoute} theme={theme} setTheme={setTheme} accent={accent} setAccent={setAccent} />
      {route === "home" && <Home setRoute={setRoute} openPost={openPost} writing={WRITING} />}
      {route === "writing" && <Writing writing={WRITING} openPost={openPost} />}
      {route === "post" && <Post post={post} setRoute={setRoute} />}
      {route === "about" && <About setRoute={setRoute} />}
      {route === "resume" && <Resume />}
      {route === "paper" && <Paper setRoute={setRoute} />}
      <Footer setRoute={setRoute} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
