/**
 * noticia.js - Sistema de Templates Dinâmicos
 * Carrega o conteúdo HTML de uma notícia específica
 * dentro da página mestre (noticia-interna.html)
 * usando o parâmetro ?id= da URL.
 */

document.addEventListener("DOMContentLoaded", function () {
  var params = new URLSearchParams(window.location.search);

  var noticiaId = params.get("id");

  var container = document.getElementById("noticia-content");

  /* Se não houver ID na URL, exibe mensagem de erro */
  if (!noticiaId) {
    container.innerHTML =
      "<h2>Notícia não encontrada.</h2>" +
      '<p>Por favor, volte para a <a href="../index.html">página inicial</a>.</p>';
    return;
  }

  var path = "./noticias/" + noticiaId + ".html";

  /* Faz a requisição para buscar o conteúdo da notícia */
  fetch(path)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Notícia não encontrada");
      }
      /* Converte a resposta em texto (HTML puro) */
      return response.text();
    })
    .then(function (html) {
      container.innerHTML = html;

      var titleElement = container.querySelector(".article-title");

      if (titleElement) {
        document.title = titleElement.innerText + " - Portal Manauara";
      }
    })
    .catch(function (error) {
      console.error("Erro ao carregar a notícia:", error);
      container.innerHTML =
        "<h2>Erro ao carregar a notícia.</h2>" +
        "<p>O conteúdo pode ter sido removido ou o link está incorreto.</p>";
    });
});
