/**
 * search.js
 * Sistema de busca do Portal Manauara.
 * Pesquisa nos títulos e descrições das notícias cadastradas
 * e redireciona o usuário para a notícia correspondente.
 */

document.addEventListener('DOMContentLoaded', () => {
    /* Seleciona os elementos do formulário de busca */
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');

    /* Se os elementos não existirem na página, não faz nada */
    if (!searchInput || !searchBtn) return;

    /* Base de dados local com todas as notícias do portal */
    /* Cada objeto contém: id (usado na URL), título e palavras-chave */
    const noticias = [
        {
            id: 'eleicoes-2026',
            titulo: 'Eleições 2026: A Disputa pelo Governo do Amazonas Toma Forma',
            palavras: 'eleições política governo amazonas wilson lima omar aziz david almeida candidatos'
        },
        {
            id: 'transito-constantino',
            titulo: 'Trânsito intenso na Constantino Nery após acidente',
            palavras: 'trânsito acidente constantino nery avenida congestionamento carros'
        },
        {
            id: 'opera-teatro',
            titulo: 'Ópera no Teatro Amazonas: temporada 2026',
            palavras: 'ópera teatro amazonas cultura música espetáculo arte'
        },
        {
            id: 'porao-alemao',
            titulo: 'Show: Porão do Alemão Rock Bar',
            palavras: 'show rock bar porão alemão música banda ponta negra'
        },
        {
            id: 'circuito-tambaqui',
            titulo: 'Circuito do Tambaqui celebra a culinária amazônica',
            palavras: 'tambaqui gastronomia comida peixe mercado adolpho lisboa culinária'
        },
        {
            id: 'obras-jorge-teixeira',
            titulo: 'Obras de revitalização avançam no bairro Jorge Teixeira',
            palavras: 'obras asfalto bairro jorge teixeira zona leste prefeitura infraestrutura'
        },
        {
            id: 'policia-centro',
            titulo: 'Polícia reforça patrulhamento no Centro de Manaus',
            palavras: 'polícia segurança centro patrulhamento furtos operação pm'
        },
        {
            id: 'vacinacao-manaus',
            titulo: 'Campanha de vacinação atinge meta em Manaus',
            palavras: 'vacinação vacina saúde campanha semsa ubs gripe'
        },
        {
            id: 'flutuantes-taruma',
            titulo: '5 Melhores flutuantes para visitar no Tarumã',
            palavras: 'flutuantes tarumã lazer rio praia balneário turismo'
        },
        {
            id: 'plano-diretor',
            titulo: 'CMM debate novo plano diretor de Manaus',
            palavras: 'câmara municipal plano diretor vereadores zoneamento urbano legislativo'
        }
    ];

    /**
     * Função que executa a busca.
     * Compara o termo digitado com o título e as palavras-chave de cada notícia.
     * Se encontrar resultado, redireciona para a notícia.
     * Se não encontrar, mostra um alerta amigável.
     */
    function executarBusca() {
        /* Pega o texto digitado, remove espaços extras e converte para minúsculas */
        const termo = searchInput.value.trim().toLowerCase();

        /* Se o campo estiver vazio, avisa o usuário */
        if (!termo) {
            alert('Digite um termo para buscar.');
            return;
        }

        /* Filtra as notícias que contêm o termo no título ou nas palavras-chave */
        const resultados = noticias.filter(noticia => {
            const tituloLower = noticia.titulo.toLowerCase();
            const palavrasLower = noticia.palavras.toLowerCase();
            return tituloLower.includes(termo) || palavrasLower.includes(termo);
        });

        /* Se encontrou resultados, redireciona para o primeiro (mais relevante) */
        if (resultados.length > 0) {
            /* Detecta se estamos na raiz ou dentro de /pages/ pelo caminho atual */
            const estaNaRaiz = !window.location.pathname.includes('/pages/');
            const prefixo = estaNaRaiz ? 'pages/' : '';
            window.location.href = `${prefixo}noticia-interna.html?id=${resultados[0].id}`;
        } else {
            /* Se não encontrou, mostra mensagem amigável */
            alert(`Nenhuma notícia encontrada para "${searchInput.value}". Tente termos como: eleições, trânsito, teatro, tambaqui, vacinação...`);
        }
    }

    /* Evento de clique no botão de busca */
    searchBtn.addEventListener('click', executarBusca);

    /* Evento de tecla Enter no campo de busca */
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            executarBusca();
        }
    });
});
