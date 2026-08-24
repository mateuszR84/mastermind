var backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', function () {
  backToTop.classList.toggle('is-visible', window.scrollY > 600);
});

backToTop.addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
