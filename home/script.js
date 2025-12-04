// =========================
// CONTROLE DE SABOTAGEM
// =========================

const modoSabotado = localStorage.getItem("modoSabotado") === "true";
const idMissao = localStorage.getItem("idMissao")
const overlayLogin = document.getElementById("overlay_login");
const overlayPopup = document.getElementById("overlay_popup");

// Se o site NÃO está sabotado, esconder login e popup
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


// =========================
// CLASSE: Banner
// =========================
class Banner {
  constructor({ imagem, largura = "800px", altura = "250px", qtdPontos = 3 }) {
    this.imagem = imagem;
    this.largura = largura;
    this.altura = altura;
    this.qtdPontos = qtdPontos;
  }

  render() {
    const section = document.createElement("section");
    section.classList.add("banner");

    const img = document.createElement("img");
    img.src = this.imagem;
    //img.style.width = this.largura;
    //img.style.height = this.altura;


    const dots = document.createElement("div");
    dots.classList.add("dots");

    for (let i = 0; i < this.qtdPontos; i++) {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");
      dots.appendChild(dot);
    }

    section.appendChild(img);
    section.appendChild(dots);

    return section;
  }
}




// =========================
// GERAR CONTEÚDO NA PÁGINA
// =========================

// Banner usando imagem local
const meuBanner = new Banner({
  imagem: "../images/Banner Produtos.png",
  largura: "100%",
  altura: "auto",
  qtdPontos: 4
});

document.getElementById("banner-area").appendChild(meuBanner.render());


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


const meuFooter = new Footer();
document.getElementById("footer").appendChild(meuFooter.render());

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

// Ao clicar no banner -> abre o "link de spam"
spamBanner.addEventListener("click", function () {
  window.open("https://lista.mercadolivre.com.br/ratoeiras#D[A:ratoeiras]", "_blank");
  window.focus();
  closeBtn.style.display = "block";
});

// Ao clicar no X -> fecha e nunca mais mostra
closeBtn.addEventListener("click", function (event) {
  event.stopPropagation(); // não dispara o clique do banner
  spamBanner.style.display = "none";
  overlay_popup.style.display = "none";
});




// =========================
