// share.js - botao de copiar link

document.addEventListener('DOMContentLoaded', function() {
    var btn = document.getElementById('btn-copiar');
    if (!btn) return;

    btn.addEventListener('click', function() {
        navigator.clipboard.writeText(window.location.href).then(function() {
            btn.classList.add('copiado');
            btn.innerHTML = '✓';
            setTimeout(function() {
                btn.classList.remove('copiado');
                btn.innerHTML = '🔗';
            }, 2000);
        });
    });
});
