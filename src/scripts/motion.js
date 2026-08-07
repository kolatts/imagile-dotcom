// Shared scroll motion: subtle parallax on [data-parallax] elements and a
// reveal-on-scroll for [data-reveal] elements. One listener, one observer,
// used site-wide instead of per-component scripts. Fully inert under
// prefers-reduced-motion — this check happens once, up front, and nothing
// below runs if it's set.

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (!reduceMotion.matches) {
  const parallaxItems = Array.from(document.querySelectorAll('[data-parallax]'));

  if (parallaxItems.length) {
    let ticking = false;
    const updateParallax = () => {
      const scrollY = window.scrollY;
      for (const item of parallaxItems) {
        const speed = Number(item.dataset.parallax || 0);
        item.style.setProperty('--parallax-y', `${scrollY * speed}px`);
      }
      ticking = false;
    };
    updateParallax();
    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(updateParallax);
        }
      },
      { passive: true }
    );
  }

  const revealItems = document.querySelectorAll('[data-reveal]');
  if (revealItems.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }
} else {
  document.querySelectorAll('[data-reveal]').forEach((item) => item.classList.add('is-visible'));
}
