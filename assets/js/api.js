// api.js - busca dados de clima e nivel do rio pra exibir no header

var API_CONFIG = {
    WEATHER_URL: 'https://api.open-meteo.com/v1/forecast?latitude=-3.119&longitude=-60.0217&current=temperature_2m,relative_humidity_2m,weather_code&timezone=auto',
    RIVER_API_URL: 'https://telemetriaws1.ana.gov.br/ServiceANA.asmx/DadosHidrometeorologicos',
    RIVER_STATION_CODE: '14990000'
};

// clima de manaus via open-meteo (gratuito, sem chave)
async function fetchManausWeather() {
    try {
        var response = await fetch(API_CONFIG.WEATHER_URL);
        if (!response.ok) throw new Error('Falha no clima');

        var data = await response.json();
        var temp = Math.round(data.current.temperature_2m);
        var code = data.current.weather_code;

        var condition = 'Limpo';
        var icon = '☀️';

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

        return { temp: temp, condition: condition, icon: icon };
    } catch (error) {
        console.error('Erro no clima:', error);
        return { temp: 31, condition: 'Nublado', icon: '☁️' };
    }
}

// nivel do rio negro - tenta a API da ANA primeiro, se nao der usa o JSON local
async function fetchRiverLevel() {
    // tentativa 1: API da ANA (tempo real)
    try {
        var hoje = new Date();
        var ontem = new Date(hoje);
        ontem.setDate(ontem.getDate() - 1);

        var dataFim = hoje.toLocaleDateString('pt-BR');
        var dataInicio = ontem.toLocaleDateString('pt-BR');

        var url = API_CONFIG.RIVER_API_URL
            + '?codEstacao=' + API_CONFIG.RIVER_STATION_CODE
            + '&dataInicio=' + dataInicio
            + '&dataFim=' + dataFim;

        // timeout de 5s pra nao travar
        var controller = new AbortController();
        var timeoutId = setTimeout(function() { controller.abort(); }, 5000);

        var response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!response.ok) throw new Error('API ANA fora');

        var xmlText = await response.text();
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(xmlText, 'text/xml');

        var registros = xmlDoc.getElementsByTagName('DadosHidrometeorologicos');

        if (registros.length > 0) {
            var ultimo = registros[registros.length - 1];
            var cota = ultimo.getElementsByTagName('Nivel');

            if (cota.length > 0 && cota[0].textContent) {
                var nivelCm = parseFloat(cota[0].textContent);
                var nivelM = (nivelCm / 100).toFixed(2);

                var status = 'Estável';
                if (registros.length >= 2) {
                    var penultimo = registros[registros.length - 2];
                    var cotaAnt = penultimo.getElementsByTagName('Nivel');
                    if (cotaAnt.length > 0 && cotaAnt[0].textContent) {
                        var nivelAnt = parseFloat(cotaAnt[0].textContent);
                        if (nivelCm > nivelAnt) status = 'Subindo';
                        else if (nivelCm < nivelAnt) status = 'Descendo';
                    }
                }

                return { level: parseFloat(nivelM), status: status, date: hoje.toLocaleDateString('pt-BR') };
            }
        }
        throw new Error('Sem dados na ANA');

    } catch (error) {
        console.warn('ANA indisponivel, usando JSON local');
    }

    // tentativa 2: JSON local
    try {
        var response = await fetch('../assets/data/river.json');
        if (!response.ok) {
            var rootResponse = await fetch('assets/data/river.json');
            if (!rootResponse.ok) throw new Error('JSON nao encontrado');
            var data = await rootResponse.json();
            return { level: data.river_level, status: data.status, date: data.last_update };
        }
        var data = await response.json();
        return { level: data.river_level, status: data.status, date: data.last_update };
    } catch (error) {
        console.error('JSON tambem falhou:', error);
    }

    // fallback fixo
    return { level: 26.50, status: 'Estável', date: new Date().toLocaleDateString('pt-BR') };
}
