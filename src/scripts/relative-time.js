// Progressive enhancement: post cards render an absolute date server-side;
// this swaps in a relative phrasing ("3 weeks ago") at view time, so the
// archive reads as a moving stream and can't go stale between static
// builds. The absolute date is preserved in the title attribute.

const MS = { day: 86400000 };

function phrase(then) {
  const days = Math.floor((Date.now() - then.getTime()) / MS.day);
  if (days < 0) return null;
  if (days === 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 14) return `${days} days ago`;
  if (days < 60) return `${Math.round(days / 7)} weeks ago`;
  if (days < 700) return `${Math.round(days / 30.4)} months ago`;
  return `${Math.round(days / 365.25)} years ago`;
}

document.querySelectorAll('time[data-relative]').forEach((el) => {
  const then = new Date(el.getAttribute('datetime'));
  if (Number.isNaN(then.getTime())) return;
  const rel = phrase(then);
  if (!rel) return;
  el.title = el.textContent;
  el.textContent = rel;
});
