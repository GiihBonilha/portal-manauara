/**
 * contato.js - Lógica do Formulário de Contato
 * Gerencia a interação com o formulário de envio
 * de mensagens na página Fale Conosco.
 */

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("form-contato");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      alert(
        "Obrigado por seu contato! Sua mensagem foi enviada com sucesso (simulação).",
      );

      this.reset();
    });
  }
});
