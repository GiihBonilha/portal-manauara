/**
 * noticia.js - Sistema de Templates Dinâmicos
 * Carrega o conteúdo HTML de uma notícia específica
 * dentro da página mestre (noticia-interna.html)
 * usando o parâmetro ?id= da URL.
 */

/* Executa após o carregamento do DOM */
document.addEventListener('DOMContentLoaded', function () {
    /* Lê os parâmetros da URL (ex: ?id=eleicoes-2026) */
    var params = new URLSearchParams(window.location.search);

    /* Obtém o valor do parâmetro 'id' */
    var noticiaId = params.get('id');

    /* Seleciona o container onde o conteúdo será inserido */
    var container = document.getElementById('noticia-content');

    /* Se não houver ID na URL, exibe mensagem de erro */
    if (!noticiaId) {
        container.innerHTML = '<h2>Notícia não encontrada.</h2>' +
            '<p>Por favor, volte para a <a href="../index.html">página inicial</a>.</p>';
        return;
    }

    /* Monta o caminho relativo para o arquivo HTML da notícia */
    var path = './noticias/' + noticiaId + '.html';

    /* Faz a requisição para buscar o conteúdo da notícia */
    fetch(path)
        .then(function (response) {
            /* Se a resposta não for bem-sucedida, lança erro */
            if (!response.ok) {
                throw new Error('Notícia não encontrada');
            }
            /* Converte a resposta em texto (HTML puro) */
            return response.text();
        })
        .then(function (html) {
            /* Insere o conteúdo HTML no container da página */
            container.innerHTML = html;

            /* Busca o título da notícia recém-carregada */
            var titleElement = container.querySelector('.article-title');

            /* Atualiza o título da aba do navegador se encontrou o título */
            if (titleElement) {
                document.title = titleElement.innerText + ' - Portal Manauara';
            }
        })
        .catch(function (error) {
            /* Exibe erro no console e mensagem visual para o usuário */
            console.error('Erro ao carregar a notícia:', error);
            container.innerHTML = '<h2>Erro ao carregar a notícia.</h2>' +
                '<p>O conteúdo pode ter sido removido ou o link está incorreto.</p>';
        });
});
