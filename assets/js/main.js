/**
 * main.js - Lógica Principal da Página Inicial
 * Gerencia a inicialização dos widgets, newsletter
 * e filtros da agenda cultural do Portal Manauara.
 */

/* Aguarda o carregamento completo do HTML antes de executar */
document.addEventListener('DOMContentLoaded', function () {
    /* Mensagem de confirmação no console do desenvolvedor */
    console.log('Portal Manauara iniciado!');

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
    /* Seleciona os elementos HTML dos widgets */
    var weatherEl = document.getElementById('weather-widget');
    var riverEl = document.getElementById('river-level-widget');

    /* Se o widget de clima existir e a função de API estiver disponível */
    if (weatherEl && typeof fetchManausWeather === 'function') {
        /* Busca os dados reais do clima */
        var weatherData = await fetchManausWeather();

        /* Se retornou dados, insere no HTML com ícone e temperatura */
        if (weatherData) {
            weatherEl.innerHTML = weatherData.icon + ' ' + weatherData.temp + '°C Manaus';
        }
    }

    /* Se o widget do rio existir e a função de API estiver disponível */
    if (riverEl && typeof fetchRiverLevel === 'function') {
        /* Busca os dados do nível do rio */
        var riverData = await fetchRiverLevel();

        /* Se retornou dados, insere formatado com emoji e status */
        if (riverData) {
            riverEl.innerHTML = '💧 Rio Negro: ' + riverData.level + 'm (' + riverData.status + ')';
        }
    }
}

/**
 * Configura o comportamento do formulário de newsletter.
 * Captura o envio, exibe feedback e limpa o campo.
 */
function initNewsletter() {
    /* Busca o formulário de newsletter na página */
    var form = document.querySelector('.newsletter-form');

    /* Se o formulário existir, adiciona o evento de envio */
    if (form) {
        form.addEventListener('submit', function (e) {
            /* Impede o recarregamento padrão da página */
            e.preventDefault();

            /* Captura o e-mail digitado pelo usuário */
            var email = form.querySelector('input').value;

            /* Exibe mensagem de confirmação */
            alert('Obrigado! O e-mail ' + email + ' foi cadastrado para receber o Café com Tucumã.');

            /* Limpa os campos do formulário */
            form.reset();
        });
    }
}

/**
 * Implementa o sistema de filtros da Agenda Cultural.
 * Permite ao usuário mostrar apenas eventos de uma categoria.
 */
function initAgenda() {
    /* Seleciona todos os botões de filtro */
    var filters = document.querySelectorAll('.filter-btn');

    /* Seleciona todos os cards de evento */
    var cards = document.querySelectorAll('.agenda-card');

    /* Para cada botão, adiciona a funcionalidade de clique */
    filters.forEach(function (btn) {
        btn.addEventListener('click', function () {
            /* Remove o destaque visual de todos os botões */
            filters.forEach(function (f) {
                f.classList.remove('active');
            });

            /* Destaca apenas o botão clicado */
            btn.classList.add('active');

            /* Obtém a categoria que deve ser exibida */
            var filter = btn.getAttribute('data-filter');

            /* Percorre os cards decidindo quais mostrar ou esconder */
            cards.forEach(function (card) {
                if (filter === 'todos' || card.getAttribute('data-category') === filter) {
                    /* Exibe o card */
                    card.style.display = 'flex';
                } else {
                    /* Esconde o card */
                    card.style.display = 'none';
                }
            });
        });
    });
}
