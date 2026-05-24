/**
 * main.js - Lógica Principal da Página Inicial
 * Gerencia a inicialização dos widgets, newsletter
 * e filtros da agenda cultural do Portal Manauara.
 */

document.addEventListener("DOMContentLoaded", function () {
  console.log("Portal Manauara iniciado!");

  /* Inicializa os widgets de clima e rio no topo */
  initWidgets();
  /* Configura a interatividade do formulário de newsletter */
  initNewsletter();
  /* Configura os filtros da agenda cultural */
  initAgenda();
});

/**
 * Inicializa os widgets de utilidade pública (clima e rio)
 * Busca dados das APIs e preenche os elementos no cabeçalho.
 */
async function initWidgets() {
  var weatherEl = document.getElementById("weather-widget");
  var riverEl = document.getElementById("river-level-widget");

  if (weatherEl && typeof fetchManausWeather === "function") {
    var weatherData = await fetchManausWeather();

    if (weatherData) {
      weatherEl.innerHTML =
        weatherData.icon + " " + weatherData.temp + "°C Manaus";
    }
  }

  if (riverEl && typeof fetchRiverLevel === "function") {
    var riverData = await fetchRiverLevel();

    if (riverData) {
      riverEl.innerHTML =
        "💧 Rio Negro: " + riverData.level + "m (" + riverData.status + ")";
    }
  }
}

/**
 * Configura o comportamento do formulário de newsletter.
 * Captura o envio, exibe feedback e limpa o campo.
 */
function initNewsletter() {
  var form = document.querySelector(".newsletter-form");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var email = form.querySelector("input").value;

      alert(
        "Obrigado! O e-mail " +
          email +
          " foi cadastrado para receber o Café com Tucumã.",
      );

      form.reset();
    });
  }
}

/**
 * Implementa o sistema de filtros da Agenda Cultural.
 * Permite ao usuário mostrar apenas eventos de uma categoria.
 */
function initAgenda() {
  var filters = document.querySelectorAll(".filter-btn");

  var cards = document.querySelectorAll(".agenda-card");

  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filters.forEach(function (f) {
        f.classList.remove("active");
      });

      btn.classList.add("active");

      var filter = btn.getAttribute("data-filter");

      cards.forEach(function (card) {
        if (
          filter === "todos" ||
          card.getAttribute("data-category") === filter
        ) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}
