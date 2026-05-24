// search.js - redireciona pra pagina de resultados

document.addEventListener("DOMContentLoaded", function () {
  var input = document.getElementById("search-input");
  var btn = document.getElementById("search-btn");
  if (!input || !btn) return;

  function buscar() {
    var termo = input.value.trim();
    if (!termo) return;

    var naRaiz = !window.location.pathname.includes("/pages/");
    var prefixo = naRaiz ? "pages/" : "";
    window.location.href =
      prefixo + "resultados.html?q=" + encodeURIComponent(termo);
  }

  btn.addEventListener("click", buscar);
  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      buscar();
    }
  });
});
