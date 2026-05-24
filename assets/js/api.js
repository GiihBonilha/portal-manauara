/**
 * api.js - Gerenciamento de Dados Externos (APIs)
 * Contém as funções responsáveis por buscar dados reais
 * e simulados para os widgets de utilidade pública do portal.
 */

/* Objeto de configuração com as URLs das APIs utilizadas */
var API_CONFIG = {
    /* API Open-Meteo configurada com coordenadas de Manaus (-3.119, -60.0217) */
    /* Retorna temperatura atual, umidade e código meteorológico */
    WEATHER_URL: 'https://api.open-meteo.com/v1/forecast?latitude=-3.119&longitude=-60.0217&current=temperature_2m,relative_humidity_2m,weather_code&timezone=auto'
};

/**
 * Busca dados climáticos reais de Manaus via Open-Meteo (gratuito, sem chave).
 * Retorna um objeto com temperatura, condição textual e ícone emoji.
 */
async function fetchManausWeather() {
    try {
        /* Faz a requisição HTTP para a API de clima */
        var response = await fetch(API_CONFIG.WEATHER_URL);

        /* Se a resposta não for bem-sucedida, lança um erro */
        if (!response.ok) throw new Error('Falha na requisição do clima');

        /* Converte a resposta JSON em objeto JavaScript */
        var data = await response.json();

        /* Arredonda a temperatura para inteiro */
        var temp = Math.round(data.current.temperature_2m);

        /* Obtém o código meteorológico WMO da API */
        var code = data.current.weather_code;

        /* Valores padrão para condição e ícone */
        var condition = 'Limpo';
        var icon = '☀️';

        /* Traduz o código numérico em ícone e texto em português */
        if (code >= 1 && code <= 3) {
            icon = '⛅';
            condition = 'Parcialmente Nublado';
        } else if (code >= 45 && code <= 48) {
            icon = '🌫️';
            condition = 'Nevoeiro';
        } else if (code >= 51 && code <= 67) {
            icon = '🌧️';
            condition = 'Chuva Leve';
        } else if (code >= 71 && code <= 82) {
            icon = '🌨️';
            condition = 'Chuva Forte';
        } else if (code >= 95) {
            icon = '⛈️';
            condition = 'Tempestade';
        }

        /* Retorna os dados formatados */
        return {
            temp: temp,
            condition: condition,
            icon: icon
        };
    } catch (error) {
        /* Em caso de erro, exibe no console e retorna dados de fallback */
        console.error('Erro ao buscar clima, usando dados simulados:', error);
        return {
            temp: 31,
            condition: 'Nublado',
            icon: '☁️'
        };
    }
}

/**
 * Busca o nível do Rio Negro a partir de um arquivo JSON local.
 * O arquivo assets/data/river.json pode ser atualizado manualmente
 * sem necessidade de alterar o código-fonte.
 */
async function fetchRiverLevel() {
    try {
        /* Tenta buscar o arquivo JSON a partir do diretório relativo */
        var response = await fetch('../assets/data/river.json');

        /* Se não encontrar, tenta a partir da raiz do projeto */
        if (!response.ok) {
            var rootResponse = await fetch('assets/data/river.json');
            if (!rootResponse.ok) throw new Error('Dados do rio não encontrados');
            var data = await rootResponse.json();
            return {
                level: data.river_level,
                status: data.status,
                date: data.last_update
            };
        }

        /* Converte o JSON em objeto */
        var data = await response.json();

        /* Retorna os dados formatados conforme esperado pelo main.js */
        return {
            level: data.river_level,
            status: data.status,
            date: data.last_update
        };
    } catch (error) {
        /* Se tudo falhar, retorna valores fixos de segurança */
        console.error('Erro ao ler dados do rio, usando fallback:', error);
        return {
            level: 26.50,
            status: 'Estável',
            date: '18/05/2026'
        };
    }
}
