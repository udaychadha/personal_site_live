/* Chart — minimal editorial line+area chart (SVG).
   Reads theme tokens; animates the line on first reveal. */

function LineChart({ data, height = 240, label, unit = "", caption }) {
  const ref = useRef(null);
  const pathRef = useRef(null);
  const [w, setW] = useState(680);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const ro = new ResizeObserver((ents) => setW(ents[0].contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const padL = 44, padR = 18, padT = 18, padB = 30;
  const W = w, H = height;
  const xs = data.map(d => d.x), ys = data.map(d => d.y);
  const minY = Math.min(...ys), maxY = Math.max(...ys);
  const yLo = minY - (maxY - minY) * 0.12, yHi = maxY + (maxY - minY) * 0.12;
  const px = (i) => padL + (i / (data.length - 1)) * (W - padL - padR);
  const py = (v) => padT + (1 - (v - yLo) / (yHi - yLo)) * (H - padT - padB);

  const linePath = data.map((d, i) => `${i === 0 ? "M" : "L"} ${px(i).toFixed(1)} ${py(d.y).toFixed(1)}`).join(" ");
  const areaPath = `${linePath} L ${px(data.length - 1).toFixed(1)} ${(H - padB).toFixed(1)} L ${px(0).toFixed(1)} ${(H - padB).toFixed(1)} Z`;

  const gridVals = 4;
  const yTicks = Array.from({ length: gridVals + 1 }, (_, i) => yLo + (i / gridVals) * (yHi - yLo));

  useEffect(() => {
    const p = pathRef.current; if (!p) return;
    const len = p.getTotalLength();
    p.style.transition = "none";
    p.style.strokeDasharray = len; p.style.strokeDashoffset = len;
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) {
          requestAnimationFrame(() => {
            p.style.transition = "stroke-dashoffset 1100ms cubic-bezier(0.22,0.61,0.36,1)";
            p.style.strokeDashoffset = "0";
          });
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    io.observe(p);
    return () => io.disconnect();
  }, [w, height, JSON.stringify(data)]);

  const last = data[data.length - 1];

  return (
    <figure className="figure" ref={ref} style={{ margin: "0" }}>
      <div className="fig-frame" style={{ padding: "1.25rem 1.25rem 0.75rem" }}>
        {label && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem" }}>
            <span className="obs-label">{label}</span>
            <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", color: "var(--accent)" }}>
              {last.y}{unit}
            </span>
          </div>
        )}
        <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ display: "block", overflow: "visible" }}>
          <defs>
            <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {yTicks.map((v, i) => (
            <g key={i}>
              <line x1={padL} x2={W - padR} y1={py(v)} y2={py(v)} stroke="var(--grid-line)" strokeWidth="1" />
              <text x={padL - 8} y={py(v) + 3} textAnchor="end" fontFamily="var(--font-mono)" fontSize="10" fill="var(--fg-2)">
                {Math.round(v)}
              </text>
            </g>
          ))}
          {data.map((d, i) => (i % Math.ceil(data.length / 6) === 0 || i === data.length - 1) && (
            <text key={i} x={px(i)} y={H - padB + 18} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--fg-2)">
              {d.x}
            </text>
          ))}
          <path d={areaPath} fill="url(#areaFill)" />
          <path ref={pathRef} d={linePath} fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
          <circle cx={px(data.length - 1)} cy={py(last.y)} r="3.5" fill="var(--accent)" stroke="var(--bg-inset)" strokeWidth="2" />
        </svg>
      </div>
      {caption && <figcaption className="fig-cap">{caption}</figcaption>}
    </figure>
  );
}

window.LineChart = LineChart;
