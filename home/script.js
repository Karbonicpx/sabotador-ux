// =========================
// CONTROLE DE SABOTAGEM
// =========================

const modoSabotado = localStorage.getItem("modoSabotado") === "true";
const idMissao = localStorage.getItem("idMissao")
const overlayLogin = document.getElementById("overlay_login");
const overlayPopup = document.getElementById("overlay_popup");


if (!modoSabotado) {


  overlayLogin.style.display = "none";
  overlayPopup.style.display = "none";
} else {
  // Exibir login
  overlayLogin.style.display = "flex";

  // Popup aparece só depois do clique no search-box,
  // então deixamos ele invisível por padrão:
  overlayPopup.style.display = "none";

}




definirDescricao()


const descricaoArea = document.getElementById("descricao-area");
const eyeIcon = document.getElementById("eye-icon");

document.getElementById("descricao-toggle").addEventListener("click", () => {
  const visivel = descricaoArea.classList.contains("visible");

  if (visivel) {
    descricaoArea.classList.remove("visible");
    eyeIcon.src = "../images/eye-open.png";
  } else {
    descricaoArea.classList.add("visible");
    eyeIcon.src = "../images/eye-closed.png";
  }
});



// Tenta carregar do JSON externo (agora na pasta pai)
fetch("../produtos.json")
  .then(response => {
    if (!response.ok) throw new Error("Arquivo JSON não encontrado");
    return response.json();
  })
  .then(data => {
    renderizarProdutos(data.dados);
  })
  .catch(error => {
    console.warn("Usando dados locais por falha no JSON externo: ", error.message);
    renderizarProdutos(dadosJSON.dados);
  });


// Função para definir a descrição de tarefas na pagina home, de acordo com a missão selecionada no sobre
function definirDescricao() {
  const descricaoTexto = document.getElementById("descricao-tarefa");

  descricaoTexto.innerHTML =
    "<span class='titulo-tarefas'>Tarefas a fazer:</span><ul class='lista-tarefas'><li>Realizar Login;</li><li>Comprar 2 Mouses;</li><li>Comprar 3 teclados;</li><li>Finalizar o pagamento</li></ul>";
}

// =========================
// FUNÇÃO: RENDERIZAR PRODUTOS
// =========================
function renderizarProdutos(lista) {
  const grid = document.getElementById("produtos-grid");

  if (!grid) {
    console.error("Elemento #produtos-grid não encontrado!");
    return;
  }

  grid.innerHTML = "";

  if (lista.length === 0) {
    grid.innerHTML = "<p>Nenhum produto encontrado</p>";
    return;
  }
  //alterado para a home exibir menos itens de maneira mais aleatória
  const selecionados = [];

  const startRandom = Math.floor(Math.random() * 31);
  const start = lista.length > 0 ? startRandom % lista.length : 0;
  // 18 fica ok em desktops maximizados, e em telas mais estreitas serve para demonstrar a responsividade
  for (let i = start; selecionados.length < 18 && i < lista.length; i += 5) {
    selecionados.push(lista[i]);
  }

  selecionados.forEach(item => {
    const card = new CardProduto({
      nome: item.nome,
      descricao: item.descricao,
      preco: item.preco,
      imagem: "../images/Produtos/" + item.categoria + "/" + item.cor + ".png",
      categoria: item.categoria,
      marca: item.marca,
      rgb: item.rgb,
      cor: item.cor,
      avaliacao: item.avaliacao,
      largura: "180px",
      altura: "150px"
    });

    grid.appendChild(card.render());
  });

}


// // =========================
// // FUNÇÃO: login chato
// // =========================
const usuarioInput = document.getElementById('usuario');
const senhaInput = document.getElementById('senha');
const entrarBtn = document.getElementById('entrarBtn');
const msg = document.getElementById('msg');
const overlay = document.getElementById('overlay_login');
function tentarLogin() {
  const usuario = usuarioInput.value.trim();
  const senha = senhaInput.value.trim();

  if (usuario === "admin" && senha === "admin") {
    overlay.style.display = "none";
  } else {
    msg.textContent = "Tente aquele login padrão do seu roteador";
  }
}

entrarBtn.addEventListener('click', tentarLogin);

// Permitir tecla Enter
document.addEventListener('keydown', function (e) {
  if (e.key === "Enter") {
    tentarLogin();
  }
});

// =========================
// FUNÇÃO: popup chato
// =========================
const searchBox = document.getElementById("search-box");
const spamBanner = document.getElementById("spam-banner");
const overlay_popup = document.getElementById("overlay_popup");
const closeBtn = document.getElementById("close-banner");

let bannerActivated = false;

// Primeira vez que o usuário clica na região e se estiver no modo sabotado
searchBox.addEventListener("click", function () {
  if (!bannerActivated && modoSabotado === true) {
    const rect = searchBox.getBoundingClientRect();

    spamBanner.style.width = 1.5 * rect.width + "px";
    spamBanner.style.top = rect.top + "px";
    const bannerLeft = (window.innerWidth - 1.5 * rect.width) / 2;
    spamBanner.style.left = bannerLeft + "px";
    spamBanner.style.display = "flex";
    overlay_popup.style.display = "block";

    bannerActivated = true;
  }
});


spamBanner.addEventListener("click", function () {
  window.open("https://lista.mercadolivre.com.br/ratoeiras#D[A:ratoeiras]", "_blank");
  window.focus();
  closeBtn.style.display = "block";
});

closeBtn.addEventListener("click", function (event) {
  event.stopPropagation(); // não dispara o clique do banner
  spamBanner.style.display = "none";
  overlay_popup.style.display = "none";
});

// =========================
