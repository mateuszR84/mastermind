var form = document.querySelector('.contact-form');
var successMsg = document.getElementById('kontakt-dziekujemy');
var errorMsg = document.getElementById('kontakt-blad');
var submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  successMsg.classList.remove('is-visible');
  errorMsg.classList.remove('is-visible');
  submitBtn.disabled = true;

  fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: { Accept: 'application/json' }
  })
    .then(function (response) {
      if (response.ok) {
        form.reset();
        successMsg.classList.add('is-visible');
      } else {
        errorMsg.classList.add('is-visible');
      }
    })
    .catch(function () {
      errorMsg.classList.add('is-visible');
    })
    .finally(function () {
      submitBtn.disabled = false;
    });
});
