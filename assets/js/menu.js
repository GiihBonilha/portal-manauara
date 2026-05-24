/**
 * menu.js - Controle do Menu Mobile
 * Gerencia o comportamento do menu hambúrguer
 * em dispositivos móveis com acessibilidade ARIA.
 */

document.addEventListener("DOMContentLoaded", function () {
  var mobileToggle = document.querySelector(".mobile-toggle");

  var navMenu = document.querySelector(".nav-menu");

  /* Verifica se ambos existem na página atual */
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");

      mobileToggle.classList.toggle("open");

      var expanded =
        mobileToggle.getAttribute("aria-expanded") === "true" || false;

      /* Inverte o estado para tecnologias assistivas */
      mobileToggle.setAttribute("aria-expanded", !expanded);
    });
  }
});
