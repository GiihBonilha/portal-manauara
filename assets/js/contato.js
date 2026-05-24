/**
 * contato.js - Lógica do Formulário de Contato
 * Gerencia a interação com o formulário de envio
 * de mensagens na página Fale Conosco.
 */

/* Aguarda o carregamento do DOM */
document.addEventListener('DOMContentLoaded', function () {
    /* Busca o formulário pelo ID */
    var form = document.getElementById('form-contato');

    /* Se o formulário existir na página */
    if (form) {
        /* Adiciona evento de envio */
        form.addEventListener('submit', function (e) {
            /* Impede o recarregamento padrão da página */
            e.preventDefault();

            /* Exibe mensagem de confirmação simulando o envio */
            alert('Obrigado por seu contato! Sua mensagem foi enviada com sucesso (simulação).');

            /* Limpa todos os campos do formulário */
            this.reset();
        });
    }
});
