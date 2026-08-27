var revealEls = document.querySelectorAll('.reveal');

if (!('IntersectionObserver' in window)) {
  revealEls.forEach(function (el) {
    el.classList.add('is-revealed');
  });
} else {
  var revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

  revealEls.forEach(function (el) {
    revealObserver.observe(el);
  });
}
