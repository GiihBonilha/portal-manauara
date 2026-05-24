/**
 * menu.js - Controle do Menu Mobile
 * Gerencia o comportamento do menu hambúrguer
 * em dispositivos móveis com acessibilidade ARIA.
 */

/* Aguarda o carregamento do DOM */
document.addEventListener('DOMContentLoaded', function () {
    /* Seleciona o botão de 3 barrinhas (hambúrguer) */
    var mobileToggle = document.querySelector('.mobile-toggle');

    /* Seleciona a lista de links do menu */
    var navMenu = document.querySelector('.nav-menu');

    /* Verifica se ambos existem na página atual */
    if (mobileToggle && navMenu) {
        /* Adiciona evento de clique no botão */
        mobileToggle.addEventListener('click', function () {
            /* Alterna a classe 'active' no menu (mostra/esconde) */
            navMenu.classList.toggle('active');

            /* Alterna a classe 'open' no botão (útil para animações) */
            mobileToggle.classList.toggle('open');

            /* Gerenciamento de acessibilidade ARIA */
            /* Verifica o estado atual do atributo aria-expanded */
            var expanded = mobileToggle.getAttribute('aria-expanded') === 'true' || false;

            /* Inverte o estado para tecnologias assistivas */
            mobileToggle.setAttribute('aria-expanded', !expanded);
        });
    }
});
