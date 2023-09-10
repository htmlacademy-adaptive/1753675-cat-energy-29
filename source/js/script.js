// Навигационное меню
const siteMenu = document.querySelector('.site-menu'),
      menuToggle = document.querySelector('.menu-toggle');

const addAnimation = () => {
  siteMenu.classList.add('site-menu--animated');
}

const clearNoJs = () => {
  siteMenu.classList.remove('site-menu--nojs');
  menuToggle.classList.remove('menu-toggle--nojs');
  siteMenu.classList.remove('site-menu--opened');
  setTimeout(addAnimation, 1000)
}

const toggleMenuFunc = () => {
  if (siteMenu.classList.contains('site-menu--opened')) {
    siteMenu.classList.toggle('site-menu--opened');
    menuToggle.classList.toggle("menu-toggle--opened");
  } else {
    siteMenu.classList.toggle('site-menu--opened');
    menuToggle.classList.toggle("menu-toggle--opened");
  }
}

clearNoJs();
menuToggle.addEventListener('click', toggleMenuFunc);
