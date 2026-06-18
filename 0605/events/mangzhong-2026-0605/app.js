/* ─────────────────────────────────────────────────────────────
   順事 · 芒種  ·  PUREMOSA × NO6 Wagyu Formula
   Behaviour layer — ported from the React/Babel prototype to
   dependency-free vanilla JS (no CDN React, no in-browser Babel).
   Theme is fixed to the design's defaults: jade · noon.
   ───────────────────────────────────────────────────────────── */
(function () {
  "use strict";

  /* ===========================================================
     1 · Fluid canvas background
     Six soft radial blobs drifting in sine waves (screen blend)
     over an edge-anchored base wash, plus a slow particle layer.
     =========================================================== */
  function initBackground() {
    var canvas = document.getElementById("bg-canvas");
    var pcanvas = document.getElementById("bg-particles");
    if (!canvas || !pcanvas) return;
    var ctx = canvas.getContext("2d");
    var pctx = pcanvas.getContext("2d");

    var W = 0, H = 0, DPR = 1;
    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * DPR; canvas.height = H * DPR;
      pcanvas.width = W * DPR; pcanvas.height = H * DPR;
      // Reset before scaling so repeated resizes don't compound the transform.
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.scale(DPR, DPR);
      pctx.setTransform(1, 0, 0, 1, 0, 0); pctx.scale(DPR, DPR);
    }
    resize();
    window.addEventListener("resize", resize);

    // jade · noon palette
    var palette = ["#0D8B7D", "#1FA89A", "#67D7D1", "#F6E27A", "#9FE7D7"];

    // Blobs — anchored near the edges so the mid-viewport text band stays clean.
    var anchors = [
      [0.18, 0.22], [0.82, 0.18], [0.10, 0.78],
      [0.88, 0.82], [0.50, 0.05], [0.50, 0.95]
    ];
    var blobs = [];
    for (var i = 0; i < 6; i++) {
      var a = anchors[i % anchors.length];
      blobs.push({
        baseX: a[0], baseY: a[1],
        ampX: 0.08 + Math.random() * 0.14,
        ampY: 0.06 + Math.random() * 0.12,
        speedX: 0.00005 + Math.random() * 0.00012,
        speedY: 0.00005 + Math.random() * 0.00012,
        phaseX: Math.random() * Math.PI * 2,
        phaseY: Math.random() * Math.PI * 2,
        radius: 0.32 + Math.random() * 0.28,
        color: palette[i % palette.length],
        opacity: 0.28 + Math.random() * 0.22
      });
    }

    // Slow drifting dust particles
    var particles = [];
    for (var p = 0; p < 30; p++) {
      particles.push({
        x: Math.random(), y: Math.random(),
        vx: (Math.random() - 0.5) * 0.00006,
        vy: -0.00002 - Math.random() * 0.00006,
        r: 0.5 + Math.random() * 1.8,
        a: 0.15 + Math.random() * 0.55,
        phase: Math.random() * Math.PI * 2
      });
    }

    function toRgba(hex, alpha) {
      var c = hex.replace("#", "");
      return "rgba(" + parseInt(c.substring(0, 2), 16) + "," +
        parseInt(c.substring(2, 4), 16) + "," +
        parseInt(c.substring(4, 6), 16) + "," + alpha + ")";
    }

    var start = performance.now();
    function draw(now) {
      var t = now - start;

      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "source-over";

      // Base wash — anchored above the viewport, not at its centre.
      var baseGrad = ctx.createRadialGradient(
        W * 0.5, H * -0.1, 0, W * 0.5, H * -0.1, Math.max(W, H) * 0.95
      );
      baseGrad.addColorStop(0, palette[0] + "44");
      baseGrad.addColorStop(0.5, palette[0] + "1A");
      baseGrad.addColorStop(1, "rgba(7,30,28,.0)");
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, W, H);

      // Blobs
      ctx.globalCompositeOperation = "screen";
      for (var b = 0; b < blobs.length; b++) {
        var bl = blobs[b];
        var cx = (bl.baseX + Math.sin(t * bl.speedX + bl.phaseX) * bl.ampX) * W;
        var cy = (bl.baseY + Math.cos(t * bl.speedY + bl.phaseY) * bl.ampY) * H;
        var r = bl.radius * Math.max(W, H);
        var grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        grad.addColorStop(0, toRgba(bl.color, bl.opacity));
        grad.addColorStop(0.5, toRgba(bl.color, bl.opacity * 0.35));
        grad.addColorStop(1, toRgba(bl.color, 0));
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Particles
      pctx.clearRect(0, 0, W, H);
      pctx.globalCompositeOperation = "screen";
      for (var q = 0; q < particles.length; q++) {
        var pa = particles[q];
        pa.x += pa.vx;
        pa.y += pa.vy;
        if (pa.y < -0.05) { pa.y = 1.05; pa.x = Math.random(); }
        if (pa.x < -0.05) pa.x = 1.05;
        if (pa.x > 1.05) pa.x = -0.05;
        var sway = Math.sin(t * 0.0008 + pa.phase) * 0.003;
        var x = (pa.x + sway) * W;
        var y = pa.y * H;
        var alpha = pa.a * (0.6 + 0.4 * Math.sin(t * 0.001 + pa.phase));
        var g = pctx.createRadialGradient(x, y, 0, x, y, pa.r * 6);
        g.addColorStop(0, "rgba(255,242,178," + alpha + ")");
        g.addColorStop(1, "rgba(255,242,178,0)");
        pctx.fillStyle = g;
        pctx.beginPath();
        pctx.arc(x, y, pa.r * 6, 0, Math.PI * 2);
        pctx.fill();
      }

      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
  }

  /* ===========================================================
     2 · Floating bamboo leaves — SVG layer with sine-drift +
     scroll parallax.
     =========================================================== */
  function initLeaves() {
    var root = document.getElementById("leaves-layer");
    if (!root) return;

    var style = document.createElement("style");
    style.textContent =
      "@keyframes leafFadeIn{from{opacity:0}to{opacity:var(--leaf-op,0.2)}}";
    document.head.appendChild(style);

    var NS = "http://www.w3.org/2000/svg";
    var PATHS = [
      "M 0 50 Q 30 20 60 10 Q 80 5 100 0 Q 70 30 40 50 Q 20 60 0 50 Z",
      "M 0 60 Q 20 30 50 15 Q 75 6 100 0 Q 95 12 60 35 Q 30 55 0 60 Z"
    ];

    for (var i = 0; i < 16; i++) {
      var size = 120 + Math.random() * 220;
      var color = i % 3 === 0 ? "#9FE7D7" : i % 3 === 1 ? "#F6E27A" : "#67D7D1";

      var svg = document.createElementNS(NS, "svg");
      svg.setAttribute("class", "leaf");
      svg.setAttribute("width", size);
      svg.setAttribute("height", size * 0.6);
      svg.setAttribute("viewBox", "0 0 100 60");
      svg.dataset.speed = 0.15 + Math.random() * 0.25;
      svg.dataset.ampx = 8 + Math.random() * 24;
      svg.dataset.ampy = 6 + Math.random() * 16;
      svg.dataset.phase = Math.random() * Math.PI * 2;
      svg.dataset.rot = Math.random() * 360;
      svg.dataset.scale = 0.6 + Math.random() * 0.9;
      svg.dataset.parx = -0.05 - Math.random() * 0.15;
      svg.style.top = "0";
      svg.dataset.basey = Math.random();
      svg.style.left = Math.random() * 100 + "%";
      svg.style.setProperty("--leaf-op", 0.08 + Math.random() * 0.22);
      svg.style.animation =
        "leafFadeIn 2s " + (Math.random() * 2.5) + "s var(--ease-out) forwards";
      svg.style.filter = "blur(" + (0.6 + Math.random() * 2) + "px)";

      var defs = document.createElementNS(NS, "defs");
      var grad = document.createElementNS(NS, "linearGradient");
      grad.setAttribute("id", "leaf-g-" + i);
      grad.setAttribute("x1", "0%"); grad.setAttribute("y1", "0%");
      grad.setAttribute("x2", "100%"); grad.setAttribute("y2", "100%");
      var s1 = document.createElementNS(NS, "stop");
      s1.setAttribute("offset", "0%");
      s1.setAttribute("stop-color", color);
      s1.setAttribute("stop-opacity", "0.9");
      var s2 = document.createElementNS(NS, "stop");
      s2.setAttribute("offset", "100%");
      s2.setAttribute("stop-color", color);
      s2.setAttribute("stop-opacity", "0.2");
      grad.appendChild(s1); grad.appendChild(s2);
      defs.appendChild(grad);

      var path = document.createElementNS(NS, "path");
      path.setAttribute("d", PATHS[i % PATHS.length]);
      path.setAttribute("fill", "url(#leaf-g-" + i + ")");

      svg.appendChild(defs);
      svg.appendChild(path);
      root.appendChild(svg);
    }

    var scrollY = window.scrollY;
    window.addEventListener("scroll", function () {
      scrollY = window.scrollY;
    }, { passive: true });

    var leaves = Array.prototype.slice.call(root.querySelectorAll(".leaf"));
    var start = performance.now();
    function tick(now) {
      var t = (now - start) / 1000;
      // Wrap range — leaves cycle through it instead of being pushed off the top
      // by scroll parallax. margin ≥ tallest rendered leaf so the wrap stays
      // off-screen and is therefore invisible.
      var margin = 340;
      var range = window.innerHeight + margin * 2;
      for (var j = 0; j < leaves.length; j++) {
        var el = leaves[j], d = el.dataset;
        var speed = +d.speed;
        var x = Math.sin(t * speed + +d.phase) * +d.ampx;
        var raw = +d.basey * range
                + scrollY * +d.parx
                + Math.cos(t * speed * 0.7 + +d.phase) * +d.ampy;
        var y = ((raw % range) + range) % range - margin;
        var r = +d.rot + Math.sin(t * speed * 0.5 + +d.phase) * 6;
        el.style.transform =
          "translate3d(" + x + "px," + y + "px,0) rotate(" + r + "deg) scale(" + d.scale + ")";
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ===========================================================
     3 · 24 solar-terms wheel
     Labels are static; on scroll-into-view a gold light-arc
     sweeps from 夏至 (45°) clockwise 345° to rest at 芒種,
     blooming each term it passes.
     =========================================================== */
  function el(tag, attrs) {
    var node = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (var k in attrs) {
      if (Object.prototype.hasOwnProperty.call(attrs, k)) {
        node.setAttribute(k, attrs[k]);
      }
    }
    return node;
  }

  function initTermsWheel() {
    var wrap = document.getElementById("terms-wheel");
    if (!wrap) return;

    var TERMS = [
      "立春", "雨水", "驚蟄", "春分", "清明", "穀雨",
      "立夏", "小滿", "芒種", "夏至", "小暑", "大暑",
      "立秋", "處暑", "白露", "秋分", "寒露", "霜降",
      "立冬", "小雪", "大雪", "冬至", "小寒", "大寒"
    ];
    var RADIUS = 200, INNER = 130, CURRENT = 8;
    var GOLD = "#F6E27A", GOLD_GLOW = "#FFF2B2", IVORY = "#FBF7EE";
    var IVORY_DIM = "rgba(251,247,238,.82)", TICK_DIM = "rgba(246,241,231,.32)";
    var FONT_TC = "'Taipei Sans TC Beta', 'PingFang TC', sans-serif";
    var FONT_EN = "'BC Novatica', 'Helvetica Neue', sans-serif";

    var svg = el("svg", { viewBox: "-260 -260 520 520" });

    // Gradient defs for the sweep
    var defs = el("defs", {});
    var lg = el("linearGradient", { id: "sweepGrad", x1: "0%", y1: "50%", x2: "100%", y2: "50%" });
    lg.appendChild(el("stop", { offset: "0%", "stop-color": "rgba(246,226,122,0)" }));
    lg.appendChild(el("stop", { offset: "60%", "stop-color": "rgba(246,226,122,.3)" }));
    lg.appendChild(el("stop", { offset: "100%", "stop-color": "rgba(246,226,122,1)" }));
    var rg = el("radialGradient", { id: "sweepFan", cx: "0%", cy: "50%", r: "100%" });
    rg.appendChild(el("stop", { offset: "0%", "stop-color": "rgba(246,226,122,.35)" }));
    rg.appendChild(el("stop", { offset: "55%", "stop-color": "rgba(246,226,122,.12)" }));
    rg.appendChild(el("stop", { offset: "100%", "stop-color": "rgba(246,226,122,0)" }));
    defs.appendChild(lg); defs.appendChild(rg);
    svg.appendChild(defs);

    // Hairline rings
    svg.appendChild(el("circle", { r: RADIUS + 26, fill: "none", stroke: "rgba(246,241,231,.22)", "stroke-width": "0.6" }));
    svg.appendChild(el("circle", { r: RADIUS - 6, fill: "none", stroke: "rgba(246,241,231,.18)", "stroke-width": "0.5" }));
    svg.appendChild(el("circle", { r: INNER, fill: "none", stroke: "rgba(246,226,122,.35)", "stroke-width": "0.6" }));
    svg.appendChild(el("circle", { r: INNER - 38, fill: "none", stroke: "rgba(246,226,122,.22)", "stroke-width": "0.5" }));

    // 24 terms — static labels, scale/glow updated as the sweep passes.
    for (var i = 0; i < 24; i++) {
      var angle = (i / 24) * Math.PI * 2 - Math.PI / 2;
      var x = Math.cos(angle) * RADIUS, y = Math.sin(angle) * RADIUS;
      var xT = Math.cos(angle) * (INNER + 28), yT = Math.sin(angle) * (INNER + 28);
      var x1 = Math.cos(angle) * (INNER + 58), y1 = Math.sin(angle) * (INNER + 58);
      var isCur = i === CURRENT;
      var rot = (i / 24) * 360;
      var g = el("g", {});

      g.appendChild(el("line", {
        "class": "term-tick", "data-i": i,
        x1: x1, y1: y1, x2: x, y2: y,
        stroke: isCur ? GOLD : TICK_DIM, "stroke-width": isCur ? 1.8 : 0.6
      }));

      var labelG = el("g", { transform: "translate(" + xT + " " + yT + ") rotate(" + rot + ")" });
      var text = el("text", {
        "class": "term-label", "data-i": i, "data-rot": rot,
        "text-anchor": "middle", "font-family": FONT_TC,
        "font-size": isCur ? 22 : 17, fill: isCur ? GOLD : IVORY_DIM,
        "font-weight": isCur ? 500 : 300, "letter-spacing": "2",
        "dominant-baseline": "middle"
      });
      text.style.transform = "rotate(" + (-rot) + "deg) scale(1)";
      text.style.transformBox = "fill-box";
      text.style.transformOrigin = "center";
      text.textContent = TERMS[i];
      labelG.appendChild(text);
      g.appendChild(labelG);

      if (isCur) {
        var pulse = el("circle", { cx: x, cy: y, r: 5, fill: GOLD });
        pulse.appendChild(el("animate", { attributeName: "r", values: "4;9;4", dur: "2.4s", repeatCount: "indefinite" }));
        pulse.appendChild(el("animate", { attributeName: "opacity", values: "1;.35;1", dur: "2.4s", repeatCount: "indefinite" }));
        g.appendChild(pulse);
        g.appendChild(el("circle", { cx: x, cy: y, r: 3, fill: GOLD_GLOW }));
      } else {
        g.appendChild(el("circle", {
          "class": "term-litdot", "data-i": i, cx: x, cy: y, r: 0, fill: GOLD, opacity: 0
        }));
      }
      svg.appendChild(g);
    }

    // Sweep arc — parked at 夏至 (45°), dim until triggered.
    var sweepG = el("g", { id: "sweep-g", transform: "rotate(45)" });
    sweepG.style.opacity = ".4";
    sweepG.style.transition = "opacity .6s";
    sweepG.appendChild(el("path", {
      d: "M 0 0 L " + (RADIUS - 4) + " -10 A " + (RADIUS - 4) + " " + (RADIUS - 4) +
        " 0 0 1 " + (RADIUS - 4) + " 10 Z",
      fill: "url(#sweepFan)"
    }));
    sweepG.appendChild(el("line", {
      x1: 0, y1: 0, x2: RADIUS - 4, y2: 0,
      stroke: "url(#sweepGrad)", "stroke-width": "1.6", "stroke-linecap": "round"
    }));
    var sweepDot = el("circle", { cx: RADIUS - 4, cy: 0, r: 4, fill: GOLD });
    sweepDot.appendChild(el("animate", { attributeName: "r", values: "3;6;3", dur: "1.4s", repeatCount: "indefinite" }));
    sweepG.appendChild(sweepDot);
    sweepG.appendChild(el("circle", { cx: RADIUS - 4, cy: 0, r: 2, fill: GOLD_GLOW }));
    svg.appendChild(sweepG);

    // Centre mark
    var centre = el("g", {});
    centre.appendChild(el("circle", { r: 66, fill: "rgba(7,30,28,.55)", stroke: "rgba(246,226,122,.45)", "stroke-width": "0.6" }));
    centre.appendChild(el("circle", { r: 60, fill: "none", stroke: "rgba(246,226,122,.18)", "stroke-width": "0.5", "stroke-dasharray": "2 4" }));
    var c1 = el("text", { x: 0, y: -12, "text-anchor": "middle", "font-family": FONT_EN, "font-style": "italic", "font-size": 13, fill: GOLD, "letter-spacing": "3" });
    c1.textContent = "MANGZHONG";
    var c2 = el("text", { x: 0, y: 20, "text-anchor": "middle", "font-family": FONT_TC, "font-size": 28, fill: IVORY, "letter-spacing": "8", "font-weight": "300" });
    c2.textContent = "芒 種";
    var c3 = el("text", { x: 0, y: 44, "text-anchor": "middle", "font-family": FONT_EN, "font-style": "italic", "font-size": 10, fill: "rgba(251,247,238,.65)", "letter-spacing": "3" });
    c3.textContent = "9 of 24 · Jun 5";
    centre.appendChild(c1); centre.appendChild(c2); centre.appendChild(c3);
    svg.appendChild(centre);

    wrap.appendChild(svg);

    var labels = Array.prototype.slice.call(wrap.querySelectorAll(".term-label"));
    var ticks = Array.prototype.slice.call(wrap.querySelectorAll(".term-tick"));
    var litdots = Array.prototype.slice.call(wrap.querySelectorAll(".term-litdot"));

    // Angular distance (0-180°) between the sweep and a term.
    function diffAt(idx, sweepAngle) {
      var termAngle = (idx / 24) * 360 - 90;
      var d = ((sweepAngle - termAngle) % 360 + 360) % 360;
      return d > 180 ? 360 - d : d;
    }

    function render(sweepAngle) {
      sweepG.setAttribute("transform", "rotate(" + sweepAngle + ")");

      for (var a = 0; a < labels.length; a++) {
        var t = labels[a];
        var ti = +t.dataset.i, rot = +t.dataset.rot;
        var d = diffAt(ti, sweepAngle);
        var scale = d < 16 ? 1 + (1 - d / 16) * 0.6 : 1;
        var glow = d < 22 ? 1 - d / 22 : 0;
        var isCur = ti === CURRENT;
        var lit = scale > 1.001 || isCur;
        t.style.transform = "rotate(" + (-rot) + "deg) scale(" + scale + ")";
        t.setAttribute("fill", lit ? GOLD : IVORY_DIM);
        t.setAttribute("font-weight", isCur || lit ? 500 : 300);
        t.style.filter = glow > 0
          ? "drop-shadow(0 0 " + (8 * glow) + "px rgba(246,226,122," + (0.7 * glow) + "))"
          : "none";
      }

      for (var b = 0; b < ticks.length; b++) {
        var ln = ticks[b];
        var li = +ln.dataset.i;
        var lIsCur = li === CURRENT;
        var ld = diffAt(li, sweepAngle);
        var lScale = ld < 16 ? 1 + (1 - ld / 16) * 0.6 : 1;
        var lLit = lScale > 1.001 || lIsCur;
        ln.setAttribute("stroke", lLit ? GOLD : TICK_DIM);
        ln.setAttribute("stroke-width", lIsCur ? 1.8 : lLit ? 1.2 : 0.6);
      }

      for (var c = 0; c < litdots.length; c++) {
        var dot = litdots[c];
        var dd = diffAt(+dot.dataset.i, sweepAngle);
        var dScale = dd < 16 ? 1 + (1 - dd / 16) * 0.6 : 1;
        var dGlow = dd < 22 ? 1 - dd / 22 : 0;
        if (dScale > 1.001) {
          dot.setAttribute("r", 2 + dGlow * 3);
          dot.setAttribute("opacity", dGlow);
        } else {
          dot.setAttribute("r", 0);
          dot.setAttribute("opacity", 0);
        }
      }
    }

    var played = false;
    var obs = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting || played) return;
      played = true;
      obs.disconnect();
      sweepG.style.opacity = "1";
      var startAngle = 45, endAngle = 30 + 360, duration = 7200;
      var t0 = performance.now();
      function step(now) {
        var prog = Math.min(1, (now - t0) / duration);
        var eased = 1 - Math.pow(1 - prog, 3); // ease-out cubic
        render(startAngle + (endAngle - startAngle) * eased);
        if (prog < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }, { threshold: 0.35 });
    obs.observe(wrap);
  }

  /* ===========================================================
     4 · Live countdown to 2026/6/5 19:00 (Taipei)
     =========================================================== */
  function initCountdown() {
    var target = new Date("2026-06-05T19:00:00+08:00").getTime();
    var dEl = document.getElementById("cd-days");
    var hEl = document.getElementById("cd-hours");
    var mEl = document.getElementById("cd-mins");
    var sEl = document.getElementById("cd-secs");
    if (!dEl) return;

    function pad(n) { return String(n).padStart(2, "0"); }
    function update() {
      var diff = Math.max(0, target - Date.now());
      var days = Math.floor(diff / 86400000); diff -= days * 86400000;
      var hours = Math.floor(diff / 3600000); diff -= hours * 3600000;
      var mins = Math.floor(diff / 60000); diff -= mins * 60000;
      var secs = Math.floor(diff / 1000);
      dEl.textContent = pad(days);
      hEl.textContent = pad(hours);
      mEl.textContent = pad(mins);
      sEl.textContent = pad(secs);
    }
    update();
    setInterval(update, 1000);
  }

  /* ===========================================================
     5 · Nav — glass background appears after scrolling past 80px
     =========================================================== */
  function initNav() {
    var nav = document.getElementById("nav");
    if (!nav) return;
    function onScroll() {
      nav.classList.toggle("scrolled", window.scrollY > 80);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ===========================================================
     6 · Notes — collapsible cards
     =========================================================== */
  function initNotes() {
    var cards = document.querySelectorAll(".note-card");
    for (var i = 0; i < cards.length; i++) {
      (function (card) {
        var head = card.querySelector(".note-head");
        if (!head) return;
        function toggle() {
          var open = card.classList.toggle("open");
          head.setAttribute("aria-expanded", open ? "true" : "false");
        }
        head.addEventListener("click", toggle);
        // Keyboard support — the head is a role="button", so Enter/Space activate it.
        head.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
            e.preventDefault();
            toggle();
          }
        });
      })(cards[i]);
    }
  }

  /* =========================================================== */
  initBackground();
  initLeaves();
  initTermsWheel();
  initCountdown();
  initNav();
  initNotes();
})();
