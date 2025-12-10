const STORAGE_KEY = "resultados";

document.addEventListener("DOMContentLoaded", () => {
    const dados = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    console.log("dados", dados);
    renderModo("normal", dados.normal);
    renderModo("sabotado", dados.sabotado);
    carregarTempo("inicioTarefa1", "fimTarefa1", "time-normal");
    carregarTempo("inicioTarefa2", "fimTarefa2", "time-sabotado");
    document.getElementById("btn-voltar").addEventListener("click", () => {
        window.location.href = "../sobre/index.html";
    });
});

function renderModo(modo, dadosModo) {
    const container = document.getElementById(`resultados-${modo}`);

    if (!dadosModo) {
        container.innerHTML = "<p>Nenhum resultado encontrado.</p>";
        return;
    }

    Object.entries(dadosModo).forEach(([missaoKey, missao]) => {
        const card = document.createElement("div");
        card.classList.add(
            "card-missao",
            missao.sucesso ? "sucesso" : "fracasso"
        );

        let detalhes = "";

        if (missao.respostaCorreta !== undefined) {
            detalhes += `
        <div class="detalhes">
          Resposta correta: ${missao.respostaCorreta}<br>
          Sua resposta: ${missao.respostaUsuario}
        </div>
      `;
        }

        if (missao.formaPagamento) {
            detalhes += `
        <div class="detalhes">
          Forma de pagamento: ${missao.formaPagamento}
        </div>
      `;
        }

        card.innerHTML = `
      <div class="status">
        ${formatarMissao(missaoKey)} — 
        ${missao.sucesso ? "✅ Sucesso" : "❌ Fracasso"}
      </div>
      ${detalhes}
    `;

        container.appendChild(card);
    });
}


function carregarTempo(inicioKey, fimKey, elementId) {
    const inicio = Number(localStorage.getItem(inicioKey));
    const fim = Number(localStorage.getItem(fimKey));

    const elemento = document.getElementById(elementId);
    if (!elemento) return;

    // validações
    if (!inicio || !fim || fim < inicio) {
        elemento.textContent = "--:--";
        return;
    }

    const diferencaMs = fim - inicio;
    elemento.textContent = formatarTempo(diferencaMs);
}

function formatarTempo(ms) {
    const totalSegundos = Math.floor(ms / 1000);
    const minutos = Math.floor(totalSegundos / 60);
    const segundos = totalSegundos % 60;

    return `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
}

function formatarMissao(key) {
    return key.replace("missao", "Missão ");
}
