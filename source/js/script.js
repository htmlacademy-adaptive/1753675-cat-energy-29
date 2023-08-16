const siteMenu = document.querySelector('.site-menu'),
      menuToggle = document.querySelector('.menu-toggle');


siteMenu.classList.remove('site-menu--opened');

menuToggle.addEventListener('click', () => {
  if (siteMenu.classList.contains('site-menu--opened')) {
    siteMenu.classList.add('site-menu--closed');
    siteMenu.classList.remove('site-menu--opened');
    menuToggle.classList.remove("menu-toggle--opened");
  } else {
    siteMenu.classList.remove('site-menu--closed');
    siteMenu.classList.add('site-menu--opened');
    menuToggle.classList.add("menu-toggle--opened");
  }
})
