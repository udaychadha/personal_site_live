/* MoonFigure — interactive moon-phase instrument.
   Drag the moon around its orbit (or use the slider) to change the phase.
   A homage to explorable figures; pure canvas 2D. */

const PHASE_NAMES = [
  [0.00, "New Moon"], [0.125, "Waxing Crescent"], [0.25, "First Quarter"],
  [0.375, "Waxing Gibbous"], [0.50, "Full Moon"], [0.625, "Waning Gibbous"],
  [0.75, "Last Quarter"], [0.875, "Waning Crescent"], [1.0, "New Moon"],
];
function phaseName(p) {
  let best = PHASE_NAMES[0];
  let bd = 1;
  for (const e of PHASE_NAMES) { const d = Math.abs(e[0] - p); if (d < bd) { bd = d; best = e; } }
  return best[1];
}

function readVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function MoonFigure({ height = 300 }) {
  const canvasRef = useRef(null);
  const [phase, setPhase] = useState(0.62);   // 0..1
  const draggingRef = useRef(false);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  const illum = (1 - Math.cos(phase * 2 * Math.PI)) / 2; // illuminated fraction 0..1

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const W = canvas.clientWidth, H = canvas.clientHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    const fg = readVar("--fg") || "#E9E9EC";
    const faint = readVar("--fg-3") || "#464C55";
    const accent = readVar("--accent") || "#E2A45C";
    const dark = readVar("--bg-2") || "#1C2027";
    const line = readVar("--grid-line") || "rgba(255,255,255,0.07)";

    const p = phaseRef.current;

    /* ---- left: the moon disk ---- */
    const mx = W * 0.30, my = H * 0.5, R = Math.min(W * 0.18, H * 0.36);
    // unlit disk
    ctx.beginPath(); ctx.arc(mx, my, R, 0, 2 * Math.PI);
    ctx.fillStyle = dark; ctx.fill();
    ctx.strokeStyle = line; ctx.lineWidth = 1; ctx.stroke();

    // lit region
    const a = p * 2 * Math.PI;
    const cos = Math.cos(a);
    ctx.save();
    ctx.beginPath(); ctx.arc(mx, my, R, 0, 2 * Math.PI); ctx.clip();
    // soft moon gradient for the lit part
    const grad = ctx.createRadialGradient(mx - R * 0.3, my - R * 0.3, R * 0.1, mx, my, R * 1.25);
    grad.addColorStop(0, "#FBF4E6"); grad.addColorStop(1, "#D9C9A8");
    ctx.fillStyle = grad;
    ctx.beginPath();
    if (p < 0.5) { ctx.arc(mx, my, R, -Math.PI / 2, Math.PI / 2, false); }
    else { ctx.arc(mx, my, R, Math.PI / 2, -Math.PI / 2, false); }
    const rx = R * Math.abs(cos);
    const counter = (p < 0.5) ? (cos > 0) : (cos < 0);
    ctx.ellipse(mx, my, rx, R, 0, Math.PI / 2, -Math.PI / 2, counter);
    ctx.closePath(); ctx.fill();

    // a few faint craters for character (only show where lit-ish)
    ctx.globalCompositeOperation = "multiply";
    const craters = [[-0.3, -0.2, 0.16], [0.25, 0.1, 0.12], [0.05, 0.4, 0.1], [0.4, -0.35, 0.08]];
    ctx.fillStyle = "rgba(150,130,100,0.28)";
    craters.forEach(([dx, dy, r]) => { ctx.beginPath(); ctx.arc(mx + dx * R, my + dy * R, r * R, 0, 2 * Math.PI); ctx.fill(); });
    ctx.restore();

    // accent rim on lit limb
    ctx.save();
    ctx.beginPath(); ctx.arc(mx, my, R + 0.5, 0, 2 * Math.PI); ctx.clip();
    ctx.restore();

    /* ---- right: top-down orbit diagram ---- */
    const ox = W * 0.74, oy = H * 0.5, orbitR = Math.min(W * 0.16, H * 0.34);
    // sunlight from the right (arrows)
    ctx.strokeStyle = accent; ctx.globalAlpha = 0.5; ctx.lineWidth = 1.2;
    for (let i = -2; i <= 2; i++) {
      const yy = oy + i * (orbitR * 0.55);
      ctx.beginPath(); ctx.moveTo(ox + orbitR * 1.7, yy); ctx.lineTo(ox + orbitR * 1.15, yy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(ox + orbitR * 1.15, yy); ctx.lineTo(ox + orbitR * 1.28, yy - 4); ctx.moveTo(ox + orbitR * 1.15, yy); ctx.lineTo(ox + orbitR * 1.28, yy + 4); ctx.stroke();
    }
    ctx.globalAlpha = 1;
    // orbit ring
    ctx.beginPath(); ctx.arc(ox, oy, orbitR, 0, 2 * Math.PI);
    ctx.strokeStyle = line; ctx.lineWidth = 1; ctx.setLineDash([3, 4]); ctx.stroke(); ctx.setLineDash([]);
    // earth
    ctx.beginPath(); ctx.arc(ox, oy, 7, 0, 2 * Math.PI); ctx.fillStyle = fg; ctx.fill();
    // moon position: phase 0 (new) = between earth & sun = right side (angle 0)
    const ang = -p * 2 * Math.PI; // travel counter-clockwise as phase increases
    const px = ox + Math.cos(ang) * orbitR, py = oy + Math.sin(ang) * orbitR;
    // moon dot — lit half facing sun (right)
    ctx.beginPath(); ctx.arc(px, py, 7, 0, 2 * Math.PI); ctx.fillStyle = dark; ctx.fill();
    ctx.strokeStyle = faint; ctx.stroke();
    ctx.save(); ctx.beginPath(); ctx.arc(px, py, 7, -Math.PI / 2, Math.PI / 2); ctx.clip();
    ctx.beginPath(); ctx.arc(px, py, 7, 0, 2 * Math.PI); ctx.fillStyle = "#F3E8CF"; ctx.fill(); ctx.restore();
    // grab halo
    ctx.beginPath(); ctx.arc(px, py, 13, 0, 2 * Math.PI); ctx.strokeStyle = accent; ctx.globalAlpha = draggingRef.current ? 0.9 : 0.4; ctx.lineWidth = 1.5; ctx.stroke(); ctx.globalAlpha = 1;
  }, []);

  useEffect(() => { draw(); }, [phase, draw]);
  useEffect(() => {
    const onResize = () => draw();
    window.addEventListener("resize", onResize);
    // redraw on theme change
    const obs = new MutationObserver(() => draw());
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => { window.removeEventListener("resize", onResize); obs.disconnect(); };
  }, [draw]);

  const pointerToPhase = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const W = rect.width, H = rect.height;
    const ox = W * 0.74, oy = H * 0.5;
    const x = e.clientX - rect.left - ox, y = e.clientY - rect.top - oy;
    let ang = Math.atan2(y, x);          // -π..π
    let p = (-ang) / (2 * Math.PI);      // invert (we drew with -p)
    p = ((p % 1) + 1) % 1;
    setPhase(p);
  };
  const onDown = (e) => { draggingRef.current = true; pointerToPhase(e); e.currentTarget.setPointerCapture(e.pointerId); };
  const onMove = (e) => { if (draggingRef.current) pointerToPhase(e); };
  const onUp = (e) => { draggingRef.current = false; draw(); };

  return (
    <div className="fig-frame fig-ticks">
      <div className="fig-row">
        <div className="fig-readout">
          <div>
            <div className="k">Phase</div>
            <div className="v">{phaseName(phase)}</div>
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            <div className="k">Illuminated</div>
            <div className="v" style={{ color: "var(--accent)" }}>{Math.round(illum * 100)}%</div>
          </div>
        </div>
        <canvas
          ref={canvasRef}
          className="fig-canvas"
          style={{ width: "100%", height: height + "px", flex: 1 }}
          onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}
        />
      </div>
      <input className="obs-range" type="range" min="0" max="1" step="0.001" value={phase}
        onChange={(e) => setPhase(parseFloat(e.target.value))} style={{ marginTop: "1.25rem" }} aria-label="Moon phase" />
      <div className="fig-hint"><Icon name="move" size={13} /> Drag the moon along its orbit — or scrub the dial</div>
    </div>
  );
}

window.MoonFigure = MoonFigure;
