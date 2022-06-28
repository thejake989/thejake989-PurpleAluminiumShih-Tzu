const hiddenMenu = document.getElementById("hidden-menu");

function hamburgerOpenHandler() {
  hiddenMenu.style.right = 0;
}

function hamburgerCloseHandler() {
  hiddenMenu.style.right = "-100%";
}

document
  .getElementById("burger-toggle")
  .addEventListener("click", hamburgerOpenHandler);

document
  .getElementById("menu-close-btn")
  .addEventListener("click", hamburgerCloseHandler);
