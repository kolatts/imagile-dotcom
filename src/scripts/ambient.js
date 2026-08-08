// Ambient particle layer for hero sections: sparse drifting points plus an
// occasional "survey ping" at a grid intersection, styled like measurement
// marks rather than generic sparkle/bokeh. Canvas-based so it stays cheap
// and never touches layout. Fully skipped under prefers-reduced-motion, and
// paused via IntersectionObserver whenever its canvas is off-screen.

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const canvases = document.querySelectorAll('canvas[data-ambient]');

if (canvases.length && !reduceMotion.matches) {
  const GRID_SIZE = 24; // must match --grid-size in global.css
  const MAX_POINTS = 34;
  const AREA_PER_POINT = 9000; // px^2 -- caps density on very large heroes

  const readColors = () => {
    const styles = getComputedStyle(document.documentElement);
    return {
      ink: styles.getPropertyValue('--color-ink').trim() || '#17191b',
      accent: styles.getPropertyValue('--color-accent').trim() || '#e85d04',
    };
  };
  let colors = readColors();
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    colors = readColors();
  });

  class AmbientField {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.points = [];
      this.ping = null;
      this.nextPingAt = 0;
      this.running = false;
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.resize();

      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) this.start();
            else this.stop();
          }
        },
        { threshold: 0 }
      );
      this.observer.observe(canvas);

      let resizeTimer;
      window.addEventListener(
        'resize',
        () => {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(() => this.resize(), 200);
        },
        { passive: true }
      );
    }

    resize() {
      const rect = this.canvas.parentElement.getBoundingClientRect();
      this.width = rect.width;
      this.height = rect.height;
      this.canvas.width = this.width * this.dpr;
      this.canvas.height = this.height * this.dpr;
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

      const target = Math.min(MAX_POINTS, Math.round((this.width * this.height) / AREA_PER_POINT));
      this.points = Array.from({ length: target }, () => this.spawnPoint());
    }

    spawnPoint() {
      const angle = Math.random() * Math.PI * 2;
      const speed = 3 + Math.random() * 5; // px per second, deliberately slow
      return {
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: Math.random() < 0.5 ? 1 : 1.6,
        baseAlpha: 0.1 + Math.random() * 0.16,
        accent: Math.random() < 0.12,
        wobble: Math.random() * Math.PI * 2,
      };
    }

    scheduleNextPing(now) {
      this.nextPingAt = now + 4000 + Math.random() * 3500;
    }

    maybeStartPing(now) {
      if (this.ping || now < this.nextPingAt) return;
      const cols = Math.max(1, Math.floor(this.width / GRID_SIZE));
      const rows = Math.max(1, Math.floor(this.height / GRID_SIZE));
      this.ping = {
        x: Math.round(Math.random() * cols) * GRID_SIZE,
        y: Math.round(Math.random() * rows) * GRID_SIZE,
        start: now,
        duration: 1600,
      };
    }

    step(now, dt) {
      const { ctx } = this;
      ctx.clearRect(0, 0, this.width, this.height);

      for (const p of this.points) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.wobble += dt * 0.6;

        if (p.x < -4) p.x = this.width + 4;
        if (p.x > this.width + 4) p.x = -4;
        if (p.y < -4) p.y = this.height + 4;
        if (p.y > this.height + 4) p.y = -4;

        const flicker = 0.75 + Math.sin(p.wobble) * 0.25;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.accent ? colors.accent : colors.ink;
        ctx.globalAlpha = p.baseAlpha * flicker;
        ctx.fill();
      }

      this.maybeStartPing(now);
      if (this.ping) {
        const elapsed = now - this.ping.start;
        const t = elapsed / this.ping.duration;
        if (t >= 1) {
          this.ping = null;
          this.scheduleNextPing(now);
        } else {
          const radius = 3 + t * 16;
          const alpha = (1 - t) * 0.5;
          ctx.beginPath();
          ctx.arc(this.ping.x, this.ping.y, radius, 0, Math.PI * 2);
          ctx.strokeStyle = colors.accent;
          ctx.globalAlpha = alpha;
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(this.ping.x, this.ping.y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = colors.accent;
          ctx.globalAlpha = Math.min(1, (1 - t) * 0.9 + 0.1);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
    }

    start() {
      if (this.running) return;
      this.running = true;
      let last = performance.now();
      this.scheduleNextPing(last);
      const loop = (now) => {
        if (!this.running) return;
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        this.step(now, dt);
        this.frame = requestAnimationFrame(loop);
      };
      this.frame = requestAnimationFrame(loop);
    }

    stop() {
      this.running = false;
      if (this.frame) cancelAnimationFrame(this.frame);
    }
  }

  canvases.forEach((canvas) => new AmbientField(canvas));
}
