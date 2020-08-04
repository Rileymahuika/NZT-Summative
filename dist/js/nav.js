const El_burgerBtn = document.querySelector('.menu-btn');
const El_nav = document.querySelector('.nav');
const hideModifier = 'nav--hidden';

El_burgerBtn.addEventListener('click', function () {
  El_nav.classList.toggle(hideModifier);
});