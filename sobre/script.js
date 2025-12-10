document.addEventListener("DOMContentLoaded", () => {


    const btnIniciar = document.getElementById("btn-iniciar-teste");
    const modal = document.getElementById("modal-teste");

    const fase1 = document.querySelector('[data-fase="1"]');
    const fase2 = document.querySelector('[data-fase="2"]');

    btnIniciar.addEventListener("click", () => {
        modal.classList.remove("hidden");
        iniciarFase1();
    });

    btnFase1 = document.getElementById("btn-fase-1");
    btnFase1.addEventListener("click", () => {
        iniciarTarefaNormal();
    });
    btnFase2 = document.getElementById("btn-fase-2");
    btnFase2.addEventListener("click", () => {
        iniciarTarefaSabotada();
    });

    window.addEventListener("storage", (event) => {
        if (event.key === "fimTarefa1") {
            concluirFase1();
        }

        if (event.key === "fimTarefa2") {
            concluirFase2();
        }
    });

    function iniciarFase1() {
        setModoSabotagem(true);
        localStorage.setItem("inicioTarefa1", Date.now());
    }

    function concluirFase1() {
        fase1.classList.add("hidden");
        fase2.classList.remove("hidden");

        setModoSabotagem(true);
        localStorage.setItem("inicioTarefa2", Date.now());
    }

    function concluirFase2() {
        modal.classList.add("hidden");
        // Redireciona para a página de resultados
        window.location.href = "../resultado/index.html";
    }
});

function setModoSabotagem(isSabotado) {
    localStorage.setItem("modoSabotado", isSabotado ? "true" : "false");
}


let intervaloTempo = null;


function iniciarTarefaNormal() {
    iniciarTarefa({
        keyInicio: "inicioTarefa1",
        tempoElementId: "tempoTarefa1",
        sabotado: false,
        iniciarTimer: true
    });
}

function iniciarTarefaSabotada() {
    iniciarTarefa({
        keyInicio: "inicioTarefa2",
        tempoElementId: "tempoTarefa2",
        sabotado: true,
        iniciarTimer: true
    });
}


function iniciarTarefa({ keyInicio, tempoElementId, sabotado, iniciarTimer }) {
    salvarInicio(keyInicio);
    setModoSabotagem(sabotado);
    resetarTempo(tempoElementId);
    resetarLocalStorageParaTarefa();
    console.log("Tarefa iniciada:", keyInicio, "Sabotado:", sabotado);
    if (iniciarTimer) {
        iniciarCronometro(keyInicio, tempoElementId);
    } else {
        pararCronometro();
    }

}

function resetarLocalStorageParaTarefa() {
    localStorage.removeItem("carrinho");
    localStorage.removeItem("loginRealizado");
    localStorage.removeItem("missao1_mouses_normal");
    localStorage.removeItem("missao1_mouses_sabotado");
}


function iniciarCronometro(keyInicio, tempoElementId) {
    pararCronometro();
    console.log("Iniciando cronômetro para", keyInicio);
    intervaloTempo = setInterval(() => {
        const inicio = obterInicio(keyInicio);
        if (!inicio) return;

        atualizarTempo(tempoElementId, Date.now() - inicio);
    }, 1000);
}

function pararCronometro() {
    if (intervaloTempo) {
        clearInterval(intervaloTempo);
        intervaloTempo = null;
    }
}


function salvarInicio(key) {
    localStorage.setItem(key, Date.now());
}

function obterInicio(key) {
    return Number(localStorage.getItem(key));
}

function resetarTempo(elementId) {
    const el = document.getElementById(elementId);
    if (el) el.textContent = "00:00";
}

function atualizarTempo(elementId, milissegundos) {
    const el = document.getElementById(elementId);
    if (!el) return;

    const segundosTotais = Math.floor(milissegundos / 1000);
    const minutos = Math.floor(segundosTotais / 60)
        .toString()
        .padStart(2, "0");
    const segundos = (segundosTotais % 60)
        .toString()
        .padStart(2, "0");

    el.textContent = `${minutos}:${segundos}`;
}
const STORAGE_KEY_MISSAO = "missoesProdutos";

function carregarProdutos() {
    console.log("Carregando produtos para missão...");

    // Se já existe no localStorage, usa direto
    const missoesSalvas = localStorage.getItem(STORAGE_KEY_MISSAO);
    if (missoesSalvas) {
        const { sabotado, normal } = JSON.parse(missoesSalvas);
        renderizarProdutosMissao("lista-missao-sabotada", sabotado);
        renderizarProdutosMissao("lista-missao-normal", normal);
        return;
    }

    fetch("../produtos.json")
        .then(res => {
            if (!res.ok) throw new Error("JSON não encontrado");
            return res.json();
        })
        .then(data => {
            const produtos = data.dados;

            // Embaralha produtos
            const embaralhados = [...produtos].sort(() => Math.random() - 0.5);

            const produtosSabotado = embaralhados
                .slice(0, 3)
                .map(produto => ({
                    ...produto,
                    quantidade: getRandomInt(1, 5)
                }));

            const produtosNormal = embaralhados
                .slice(3, 6)
                .map(produto => ({
                    ...produto,
                    quantidade: getRandomInt(1, 5)
                }));

            // Salva no localStorage
            localStorage.setItem(
                STORAGE_KEY_MISSAO,
                JSON.stringify({
                    sabotado: produtosSabotado,
                    normal: produtosNormal
                })
            );

            renderizarProdutosMissao("lista-missao-sabotada", produtosSabotado);
            renderizarProdutosMissao("lista-missao-normal", produtosNormal);
        })
        .catch(err => console.error("Erro ao carregar produtos:", err));
}
function renderizarProdutosMissao(elementId, produtos) {
    const ul = document.getElementById(elementId);
    if (!ul) return;

    ul.innerHTML = "";

    produtos.forEach(produto => {
        const li = document.createElement("li");
        li.textContent = `${produto.nome} – Quantidade: ${produto.quantidade} – Preço: ${produto.preco}`;
        ul.appendChild(li);
    });
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.addEventListener("storage", (event) => {
    if (event.key !== "fimTarefa") return;

    const inicio = obterInicio("inicioTarefa2");
    if (!inicio) return;

    const duracao = Number(event.newValue) - inicio;
    atualizarTempo("tempoTarefa2", duracao);
    pararCronometro();
});


carregarProdutos();