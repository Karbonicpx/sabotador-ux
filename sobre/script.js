document.addEventListener("DOMContentLoaded", () => {
    const btnNormal = document.getElementById("btn-normal");
    const btnSabotado = document.getElementById("btn-sabotado");

    btnNormal.addEventListener("click", () => {
        iniciarTarefaNormal();
    });

    btnSabotado.addEventListener("click", () => {
        iniciarTarefaSabotada();
    });
});


let intervaloTempo;

function iniciarTarefaSabotada() {
    const inicio = Date.now();
    localStorage.setItem("inicioTarefa2", inicio);
    setModoSabotagem(true)



    const time = document.getElementById("tempoTarefa2");
    time.textContent = "00:00";


    if (intervaloTempo) clearInterval(intervaloTempo);

    intervaloTempo = setInterval(() => {
        const agora = Date.now();
        const inicioSalvo = Number(localStorage.getItem("inicioTarefa2"));

        const decorrido = Math.floor((agora - inicioSalvo) / 1000);
        const minutos = Math.floor(decorrido / 60).toString().padStart(2, "0");
        const segundos = (decorrido % 60).toString().padStart(2, "0");

        time.textContent = `${minutos}:${segundos}`;
    }, 1000);
}

function iniciarTarefaNormal() {
    const inicio = Date.now();
    localStorage.setItem("inicioTarefa1", inicio);
    setModoSabotagem(false)



    const time = document.getElementById("tempoTarefa1");
    time.textContent = "00:00";

}

window.addEventListener("storage", (event) => {
    if (event.key === "fimTarefa") {
        const inicio = Number(localStorage.getItem("inicioTarefa2"));
        const fim = Number(event.newValue);
        const duracao = ((fim - inicio) / 1000).toFixed(2);
        const time = document.getElementById("tempoTarefa2");

        const minutes = Math.floor(duracao / 60).toString().padStart(2, '0');
        const seconds = (duracao % 60).toFixed(0).toString().padStart(2, '0');
        time.textContent = `${minutes}:${seconds}`;
        if (intervaloTempo) clearInterval(intervaloTempo);
    }
});

function setModoSabotagem(isSabotado) {
    localStorage.setItem("modoSabotado", isSabotado ? "true" : "false");
}