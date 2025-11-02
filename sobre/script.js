function iniciarTarefa() {
    const inicio = Date.now();
    localStorage.setItem("inicioTarefa", inicio);
    window.open("../index.html"); // abre a página B
}

window.addEventListener("storage", (event) => {
    if (event.key === "fimTarefa") {
        const inicio = Number(localStorage.getItem("inicioTarefa"));
        const fim = Number(event.newValue);
        const duracao = ((fim - inicio) / 1000).toFixed(2);
        alert(`Tarefa durou ${duracao} segundos`);
    }
});