/***********************
 * CAROUSEL (safe)
 ***********************/
try {
  document.querySelectorAll('.carousel-container').forEach((carouselContainer) => {
    const images = carouselContainer.querySelectorAll('.carousel img');
    const leftArrow = carouselContainer.querySelector('.left-arrow');
    const rightArrow = carouselContainer.querySelector('.right-arrow');
    const dots = carouselContainer.querySelectorAll('.scrollbar .dot');
    let currentIndex = 0;

    if (!images || images.length === 0) return;

    function hideAll() {
      images.forEach((img) => (img.style.display = 'none'));
      if (dots && dots.length) dots.forEach((d) => d.classList.remove('active'));
    }

    function showIndex(idx) {
      if (!images || images.length === 0) return;
      hideAll();
      currentIndex = ((idx % images.length) + images.length) % images.length;
      images[currentIndex].style.display = 'block';
      if (dots && dots[currentIndex]) dots[currentIndex].classList.add('active');
    }

    function showNextImage() { showIndex(currentIndex + 1); }
    function showPreviousImage() { showIndex(currentIndex - 1); }

    if (leftArrow) leftArrow.addEventListener('click', (e) => { e.preventDefault(); showPreviousImage(); });
    if (rightArrow) rightArrow.addEventListener('click', (e) => { e.preventDefault(); showNextImage(); });

    if (dots && dots.length) {
      dots.forEach((dot, i) => dot.addEventListener('click', (e) => { e.preventDefault(); showIndex(i); }));
    }

    showIndex(0);
  });
} catch (e) {
  console.warn('Carousel init error (ignored):', e);
}

/***********************
 * FULLSCREEN OVERLAY (safe)
 ***********************/
try {
  const fullscreenOverlay = document.getElementById('fullscreenOverlay');
  const fullscreenImage = document.getElementById('fullscreenImage');

  if (fullscreenOverlay && fullscreenImage) {
    const galleryImages = document.querySelectorAll('.gallery-image');
    galleryImages.forEach((image) => {
      image.addEventListener('click', () => {
        fullscreenImage.src = image.src;
        fullscreenOverlay.style.display = 'flex';
      });
    });

    fullscreenOverlay.addEventListener('click', () => {
      fullscreenOverlay.style.display = 'none';
    });
  }
} catch (e) {
  console.warn('Fullscreen overlay init error (ignored):', e);
}

/***********************
 * NEKO (mouse-following cat)
 ***********************/
(function () {
  const SPRITE_SETS = {
    idle: [[-3, -3]],
    alert: [[-7, -3]],
    scratchSelf: [[-5, 0], [-6, 0], [-7, 0]],
    scratchWallN: [[0, 0], [0, -1]],
    scratchWallS: [[-7, -1], [-6, -2]],
    scratchWallE: [[-2, -2], [-2, -3]],
    scratchWallW: [[-4, 0], [-4, -1]],
    tired: [[-3, -2]],
    sleeping: [[-2, 0], [-2, -1]],
    N: [[-1, -2], [-1, -3]],
    NE: [[0, -2], [0, -3]],
    E: [[-3, 0], [-3, -1]],
    SE: [[-5, -1], [-5, -2]],
    S: [[-6, -3], [-7, -2]],
    SW: [[-5, -3], [-6, -1]],
    W: [[-4, -2], [-4, -3]],
    NW: [[-1, 0], [-1, -1]],
  };

  let el, cfg, rafId, lastTs;
  let frameCount = 0, idleTime = 0, idleAnim = null, idleAnimFrame = 0;
  let nekoX = 32, nekoY = 32, mouseX = 0, mouseY = 0;

  function setSprite(name, frame) {
    if (!el) return;
    const s = SPRITE_SETS[name][frame % SPRITE_SETS[name].length];
    el.style.backgroundPosition = `${s[0] * cfg.frame}px ${s[1] * cfg.frame}px`;
  }

  function resetIdle() { idleAnim = null; idleAnimFrame = 0; }

  function idle() {
    idleTime += 1;
    if (idleTime > 10 && Math.floor(Math.random() * 200) === 0 && idleAnim == null) {
      const choices = ["sleeping", "scratchSelf"];
      if (nekoX < cfg.frame) choices.push("scratchWallW");
      if (nekoY < cfg.frame) choices.push("scratchWallN");
      if (nekoX > window.innerWidth - cfg.frame) choices.push("scratchWallE");
      if (nekoY > window.innerHeight - cfg.frame) choices.push("scratchWallS");
      idleAnim = choices[Math.floor(Math.random() * choices.length)];
    }

    switch (idleAnim) {
      case "sleeping":
        if (idleAnimFrame < 8) { setSprite("tired", 0); break; }
        setSprite("sleeping", Math.floor(idleAnimFrame / 4));
        if (idleAnimFrame > 192) resetIdle();
        break;
      case "scratchWallN":
      case "scratchWallS":
      case "scratchWallE":
      case "scratchWallW":
      case "scratchSelf":
        setSprite(idleAnim, idleAnimFrame);
        if (idleAnimFrame > 9) resetIdle();
        break;
      default:
        setSprite("idle", 0);
        return;
    }
    idleAnimFrame += 1;
  }

  function tick() {
    frameCount += 1;
    const dx = nekoX - mouseX, dy = nekoY - mouseY;
    const dist = Math.hypot(dx, dy);

    if (dist < cfg.speed || dist < cfg.followDistance) { idle(); return; }

    idleAnim = null; idleAnimFrame = 0;

    if (idleTime > 1) {
      setSprite("alert", 0);
      idleTime = Math.min(idleTime, 7) - 1;
      return;
    }

    let dir = "";
    dir += (dy / dist > 0.5) ? "N" : "";
    dir += (dy / dist < -0.5) ? "S" : "";
    dir += (dx / dist > 0.5) ? "W" : "";
    dir += (dx / dist < -0.5) ? "E" : "";
    setSprite(dir, frameCount);

    nekoX -= (dx / dist) * cfg.speed;
    nekoY -= (dy / dist) * cfg.speed;

    const pad = cfg.frame / 2;
    nekoX = Math.min(Math.max(pad, nekoX), window.innerWidth - pad);
    nekoY = Math.min(Math.max(pad, nekoY), window.innerHeight - pad);

    el.style.left = (nekoX - pad) + "px";
    el.style.top = (nekoY - pad) + "px";
  }

  function loop(ts) {
    if (!el) return;
    if (!lastTs) lastTs = ts;
    if (ts - lastTs > cfg.frameMs) { lastTs = ts; tick(); }
    rafId = requestAnimationFrame(loop);
  }

  function onMouseMove(e) { mouseX = e.clientX; mouseY = e.clientY; }

  function create() {
    el = document.createElement("div");
    el.id = cfg.id;
    el.setAttribute("aria-hidden", "true");
    Object.assign(el.style, {
      width: cfg.frame + "px",
      height: cfg.frame + "px",
      position: "fixed",
      pointerEvents: "none",
      imageRendering: "pixelated",
      left: (nekoX - cfg.frame / 2) + "px",
      top: (nekoY - cfg.frame / 2) + "px",
      zIndex: String(cfg.zIndex),
      backgroundImage: `url(${cfg.spriteURL})`,
      backgroundRepeat: "no-repeat",
      transform: "translateZ(0)",
    });
    document.body.appendChild(el);
  }

  function destroy() {
    if (rafId) cancelAnimationFrame(rafId), rafId = null;
    window.removeEventListener("mousemove", onMouseMove);
    if (el && el.isConnected) el.remove();
    el = null;
  }

  function start(options) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    cfg = Object.assign({
      id: "oneko",
      spriteURL: "",
      frame: 32,
      speed: 10,
      frameMs: 100,
      followDistance: 48,
      zIndex: 2147483647
    }, options || {});
    if (!cfg.spriteURL) { console.error("[Neko] Missing spriteURL"); return; }

    frameCount = 0; idleTime = 0; idleAnim = null; idleAnimFrame = 0;
    nekoX = cfg.frame; nekoY = cfg.frame; mouseX = nekoX; mouseY = nekoY;

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    create();
    rafId = requestAnimationFrame(loop);
  }

  window.Neko = { start, stop: destroy, isRunning: () => !!el };
})();

/* Start Neko (absolute image path so it works from any page) */
if (!window.Neko?.isRunning?.()) {
  Neko.start({
    spriteURL: "/images/neko.png"
    // optional: speed: 8, frameMs: 80, zIndex: 999999
  });
}
