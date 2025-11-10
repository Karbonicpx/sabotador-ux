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
    img.style.width = this.largura;
    img.style.height = this.altura;

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
  largura: "1000px",
  altura: "500px",
  qtdPontos: 1
});

document.getElementById("banner-area").appendChild(meuBanner.render());

// =========================
// CARREGAR PRODUTOS DO JSON EXTERNO
// =========================

// Dados locais de fallback
const dadosJSON = {
  "dados": [
    {
      "nome": "Mouse Gamer Cobra",
      "descricao": "Alta precisão, RGB e 7200 DPI",
      "preco": "R$ 199,90",
      "imagem": "../images/Mouse Gamer.png",
      "categoria": "Mouse",
      "marca": "Redragon",
      "rgb": "Sim",
      "cor": "Preto",
      "avaliacao": 5
    },
    {
      "nome": "Headset Logitech G733",
      "descricao": "Som Surround e microfone com filtro de ruído",
      "preco": "R$ 749,90",
      "imagem": "../images/Headset Gamer.png",
      "categoria": "Fone",
      "marca": "Logitech",
      "rgb": "Sim",
      "cor": "Branco",
      "avaliacao": 4
    },
    {
      "nome": "Teclado Razer BlackWidow",
      "descricao": "Switch mecânico verde e iluminação RGB",
      "preco": "R$ 999,99",
      "imagem": "../images/Teclado Gamer.png",
      "categoria": "Teclado",
      "marca": "Razer",
      "rgb": "Sim",
      "cor": "Preto",
      "avaliacao": 5
    }
  ]
};

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

// =========================
// FUNÇÃO: RENDERIZAR PRODUTOS
// =========================
function renderizarProdutos(listaProdutos) {
  const produtosArea = document.createElement("div");
  produtosArea.classList.add("produtos");

  listaProdutos.forEach(item => {
    const card = new CardProduto(item);
    produtosArea.appendChild(card.render());
  });

  document.getElementById("produtos-area").appendChild(produtosArea);
}

const meuFooter = new Footer();
document.getElementById("footer").appendChild(meuFooter.render());

// =========================
// FUNÇÃO: login chato
// =========================
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
document.addEventListener('keydown', function(e) {
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

// Primeira vez que o usuário clica na região
searchBox.addEventListener("click", function () {
  if (!bannerActivated) {
    const rect = searchBox.getBoundingClientRect();

    spamBanner.style.width = rect.width + "px";
    spamBanner.style.top = rect.top + "px";
    spamBanner.style.left = rect.left + "px";
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


