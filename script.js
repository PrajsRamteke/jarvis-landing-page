/* ═══════════════════════════════════════════════════════════
   JARVIS.sys — landing interactions
   boot · rain · typed terminal · glitch · scramble · reveal
   copy · magnetic buttons · custom cursor · easter egg
   ═══════════════════════════════════════════════════════════ */

"use strict";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ── lucide icons ─────────────────────────────────────────── */
if (window.lucide) lucide.createIcons();

/* ── boot preloader ───────────────────────────────────────── */
(() => {
  const boot = document.getElementById("boot");
  const log = document.getElementById("boot-log");
  const lines = [
    "JARVIS BIOS v2.4 — harness-agent core",
    "MEM CHECK ............................ 64K OK",
    "mounting /dev/brain .................. OK",
    "loading tool router .................. OK",
    "arming agents [coding|reverse_eng] ... OK",
    "linking MCP bus ...................... OK",
    "phosphor display ..................... CALIBRATED",
    "",
    "> ALL SYSTEMS NOMINAL. ENTERING.",
  ];

  let dead = false;
  const finish = () => {
    if (dead) return;
    dead = true;
    boot.classList.add("done");
    document.querySelectorAll(".hero .reveal, .hero-title").forEach((el, i) => {
      setTimeout(() => el.classList.add("in"), 120 * i);
    });
    setTimeout(() => boot.remove(), 700);
  };

  if (reduceMotion) return finish();

  let i = 0;
  const tick = () => {
    if (dead) return;
    if (i >= lines.length) return setTimeout(finish, 350);
    log.textContent += lines[i++] + "\n";
    setTimeout(tick, 90 + Math.random() * 110);
  };
  tick();

  window.addEventListener("keydown", finish, { once: true });
  boot.addEventListener("click", finish, { once: true });
  setTimeout(finish, 4000); // hard cap
})();

/* ── matrix rain ──────────────────────────────────────────── */
(() => {
  const canvas = document.getElementById("rain");
  if (reduceMotion) return;
  const ctx = canvas.getContext("2d");
  const glyphs = "アィゥエオカキクケコサシスセソ01<>/\\{}[]$#@¥+*=";
  let cols, drops, fontSize = 14;

  const size = () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    cols = Math.floor(canvas.width / fontSize);
    drops = Array.from({ length: cols }, () => Math.floor(Math.random() * -50));
  };
  size();
  addEventListener("resize", size);

  const phosphor = () =>
    getComputedStyle(document.documentElement).getPropertyValue("--ph").trim();

  let last = 0;
  const draw = (t) => {
    requestAnimationFrame(draw);
    if (t - last < 50) return; // ~20fps, deliberately chunky
    last = t;
    ctx.fillStyle = "rgba(0, 0, 0, 0.09)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = fontSize + "px monospace";
    for (let i = 0; i < cols; i++) {
      const ch = glyphs[Math.floor(Math.random() * glyphs.length)];
      const y = drops[i] * fontSize;
      ctx.fillStyle = Math.random() > 0.975 ? "#ffffff" : phosphor();
      ctx.globalAlpha = Math.random() * 0.5 + 0.15;
      ctx.fillText(ch, i * fontSize, y);
      ctx.globalAlpha = 1;
      if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  };
  requestAnimationFrame(draw);
})();

/* ── typed terminal demo (looping scenarios) ─────────────── */
(() => {
  const body = document.getElementById("term-body");
  if (!body) return;

  // [cssClass, text, charDelayMs]
  const scenarios = [
    [
      ["t-ps", "$ ", 0], ["t-cmd", "jarvis\n", 70],
      ["t-sys", "◤ JARVIS v2.4 — harness agent online\n", 8],
      ["t-sys", "› provider: anthropic · model: sonnet-4-6\n\n", 8],
      ["t-ps", "you ▸ ", 0], ["t-cmd", "refactor the auth module and run the tests\n", 38],
      ["t-sys", "jarvis ▸ scanning repo ... 42 files indexed\n", 10],
      ["t-ok", "  ⚙ read_bundle(auth/) ............ ✓\n", 10],
      ["t-ok", "  ⚙ edit_file(oauth_flow.py) ...... ✓\n", 10],
      ["t-ok", "  ⚙ shell(pytest -q) .............. ✓ 18 passed\n", 10],
      ["t-warn", "done in 12.4s — anything else?\n", 16],
    ],
    [
      ["t-ps", "you ▸ ", 0], ["t-cmd", "what changed in this repo today?\n", 38],
      ["t-ok", "  ⚙ shell(git log --since=midnight) ✓\n", 10],
      ["t-sys", "jarvis ▸ 3 commits — new model added,\n", 12],
      ["t-sys", "clipboard themes enhanced, null-safety fix\n", 12],
      ["t-warn", "want a summary as a markdown report?\n", 16],
    ],
    [
      ["t-ps", "you ▸ ", 0], ["t-cmd", "open figma and screenshot my dashboard\n", 38],
      ["t-ok", "  ⚙ mac.launch_app(Figma) ........ ✓\n", 10],
      ["t-ok", "  ⚙ mac.read_ui() ................ ✓\n", 10],
      ["t-ok", "  ⚙ mac.screenshot() ............. ✓ saved\n", 10],
      ["t-sys", "jarvis ▸ ~/Desktop/dashboard.png ready\n", 12],
      ["t-warn", "I also noticed 2 detached frames. fix?\n", 16],
    ],
  ];

  const caret = () => {
    const c = document.createElement("span");
    c.className = "t-caret";
    return c;
  };

  let s = 0;
  async function play() {
    body.textContent = "";
    let cur = caret();
    body.appendChild(cur);

    for (const [cls, text, delay] of scenarios[s]) {
      const span = document.createElement("span");
      span.className = cls;
      body.insertBefore(span, cur);
      if (reduceMotion || delay === 0) {
        span.textContent = text;
      } else {
        for (const ch of text) {
          span.textContent += ch;
          await new Promise((r) => setTimeout(r, delay + Math.random() * delay));
        }
      }
    }
    await new Promise((r) => setTimeout(r, 3200));
    s = (s + 1) % scenarios.length;
    play();
  }
  play();
})();

/* ── glitch bursts on titles ──────────────────────────────── */
(() => {
  if (reduceMotion) return;
  const targets = document.querySelectorAll(".glitch");
  setInterval(() => {
    const el = targets[Math.floor(Math.random() * targets.length)];
    if (!el) return;
    el.classList.add("zap");
    setTimeout(() => el.classList.remove("zap"), 380);
  }, 2600);
})();

/* ── scramble-decode section titles ───────────────────────── */
const scramble = (el) => {
  const target = el.dataset.scramble;
  if (!target || reduceMotion) return;
  const pool = "█▓▒░<>/\\#@$%&*+=ABCDEF0123456789";
  let frame = 0;
  const total = target.length * 3 + 12;
  const step = () => {
    el.textContent = target
      .split("")
      .map((ch, i) => {
        if (ch === " ") return " ";
        if (frame / 3 > i) return ch;
        return pool[Math.floor(Math.random() * pool.length)];
      })
      .join("");
    if (frame++ < total) requestAnimationFrame(step);
    else el.textContent = target;
  };
  step();
};

/* ── scroll reveal (rect-check: robust everywhere) ────────── */
(() => {
  let pending = [...document.querySelectorAll(".reveal")];
  const check = () => {
    if (!pending.length) return;
    const limit = innerHeight * 0.92;
    pending = pending.filter((el) => {
      const r = el.getBoundingClientRect();
      if (r.top > limit || r.bottom < 0) return true;
      el.classList.add("in");
      if (el.dataset.scramble) scramble(el);
      return false;
    });
  };
  let raf = 0;
  const onScroll = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(check);
  };
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll, { passive: true });
  addEventListener("load", check);
  check();
})();

/* ── copy to clipboard ────────────────────────────────────── */
(() => {
  const toast = document.getElementById("toast");
  let timer;
  document.querySelectorAll(".code").forEach((block) => {
    const btn = block.querySelector(".copy");
    if (!btn) return;
    btn.addEventListener("click", async () => {
      const cmd = block.dataset.cmd || block.innerText;
      try {
        await navigator.clipboard.writeText(cmd);
      } catch {
        const ta = document.createElement("textarea");
        ta.value = cmd;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
      }
      btn.classList.add("ok");
      btn.innerHTML = '<i data-lucide="check"></i>';
      lucide.createIcons();
      toast.classList.add("show");
      clearTimeout(timer);
      timer = setTimeout(() => {
        toast.classList.remove("show");
        btn.classList.remove("ok");
        btn.innerHTML = '<i data-lucide="copy"></i>';
        lucide.createIcons();
      }, 1800);
    });
  });
})();

/* ── magnetic buttons ─────────────────────────────────────── */
(() => {
  if (reduceMotion || matchMedia("(pointer: coarse)").matches) return;
  document.querySelectorAll("[data-magnetic]").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transition = "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)";
      el.style.transform = "";
      setTimeout(() => (el.style.transition = ""), 400);
    });
  });
})();

/* ── spotlight glow follows cursor inside steps ───────────── */
(() => {
  document.querySelectorAll(".step").forEach((step) => {
    step.addEventListener("mousemove", (e) => {
      const r = step.getBoundingClientRect();
      step.style.setProperty("--mx", e.clientX - r.left + "px");
      step.style.setProperty("--my", e.clientY - r.top + "px");
    });
  });
})();

/* ── custom cursor ────────────────────────────────────────── */
(() => {
  const cur = document.getElementById("cursor");
  if (!cur || matchMedia("(pointer: coarse)").matches) return;
  let x = innerWidth / 2, y = innerHeight / 2, tx = x, ty = y;

  addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; });

  document.querySelectorAll("[data-hover], a, button").forEach((el) => {
    el.addEventListener("mouseenter", () => cur.classList.add("hot"));
    el.addEventListener("mouseleave", () => cur.classList.remove("hot"));
  });

  const loop = () => {
    x += (tx - x) * 0.35;
    y += (ty - y) * 0.35;
    cur.style.left = x + "px";
    cur.style.top = y + "px";
    requestAnimationFrame(loop);
  };
  loop();
})();

/* ── amber mode toggle + "JARVIS" easter egg ──────────────── */
(() => {
  const html = document.documentElement;
  const flip = () => {
    html.dataset.mode = html.dataset.mode === "amber" ? "phosphor" : "amber";
    const t = document.getElementById("mode-toggle");
    t.querySelector("span").textContent =
      html.dataset.mode === "amber" ? "PHOSPHOR" : "AMBER";
    // full-screen glitch flash on theme swap
    document.querySelectorAll(".glitch").forEach((el) => {
      el.classList.add("zap");
      setTimeout(() => el.classList.remove("zap"), 380);
    });
  };

  document.getElementById("mode-toggle").addEventListener("click", flip);

  // type J-A-R-V-I-S anywhere
  const secret = "jarvis";
  let buf = "";
  addEventListener("keydown", (e) => {
    if (e.target.matches("input, textarea")) return;
    buf = (buf + e.key.toLowerCase()).slice(-secret.length);
    if (buf === secret) {
      flip();
      buf = "";
    }
  });
})();
