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
// CLASSE: CardProduto
// =========================
class CardProduto {
  constructor({ nome, descricao, preco, imagem, largura = "200px", altura = "150px" }) {
    this.nome = nome;
    this.descricao = descricao;
    this.preco = preco;
    this.imagem = imagem;
    this.largura = largura;
    this.altura = altura;
  }

  render() {
    const card = document.createElement("div");
    card.classList.add("card");
    card.style.width = this.largura;

    const img = document.createElement("img");
    img.src = this.imagem;
    img.style.height = this.altura;

    const info = document.createElement("div");
    info.classList.add("info");

    const h3 = document.createElement("h3");
    h3.textContent = this.nome;

    const pDesc = document.createElement("p");
    pDesc.classList.add("descricao");
    pDesc.textContent = this.descricao;

    const pPreco = document.createElement("p");
    pPreco.classList.add("preco");
    pPreco.textContent = this.preco;

    const icon = document.createElement("div");
    icon.classList.add("icon-carrinho");
    icon.innerHTML = '<img src="images/checkout_add.png" alt="Carrinho de Compras" />';

    info.appendChild(h3);
    info.appendChild(pDesc);
    info.appendChild(pPreco);

    card.appendChild(img);
    card.appendChild(info);
    card.appendChild(icon);

    return card;
  }
}

// =========================
// CLASSE: Footer
// =========================

class Footer {
  constructor() {
  }

  render() {
    const footer = document.createElement("footer");
    footer.classList.add("footer");

    footer.innerHTML = `
      <div class="footer-links">
        <a href="#">Condições de Uso</a> |
        <a href="#">Notificação de Privacidade</a> |
        <a href="#">Cookies</a> |
        <a href="#">Anúncios Baseados em Interesses</a>
      </div>

      <div class="footer-company">
        © 2021–2025 Loja.com, Inc. ou suas afiliadas
      </div>

      <div class="footer-company">
        Loja Serviços de Varejo do Brasil Ltda. | CNPJ 00.000.000/0000-00
      </div>

      <div class="footer-address">
        Av. Beco Logoali, 1008, Torre E, 18º andar - Tão Tão Distante CEP: 04543-011 |
        <a href="#">Fale conosco</a> |
        <a href="mailto:ajuda-loja@loja.com.br">ajuda-loja@loja.com.br</a>
      </div>
    `;

    return footer;
  }
}

// Exemplo de uso:
document.addEventListener("DOMContentLoaded", function () {
  const footer = new Footer();
  document.body.appendChild(footer.render());
});


// =========================
// GERAR CONTEÚDO NA PÁGINA
// =========================

// Banner usando imagem local
const meuBanner = new Banner({
  imagem: "images/Banner Produtos.png",
  largura: "1000px",
  altura: "500px",
  qtdPontos: 1
});

document.getElementById("banner-area").appendChild(meuBanner.render());

// Produtos usando imagens locais
const produtos = [
  new CardProduto({
    nome: "Mouse Gamer",
    descricao: "Alta precisão e RGB",
    preco: "R$ 199,90",
    imagem: "images/Mouse Gamer.png"
  }),
  new CardProduto({
    nome: "Headset Gamer",
    descricao: "Som Surround 7.1",
    preco: "R$ 349,99",
    imagem: "images/Headset Gamer.png"
  }),
  new CardProduto({
    nome: "Teclado Gamer",
    descricao: "Mecânico e RGB",
    preco: "R$ 299,99",
    imagem: "images/Teclado Gamer.png"
  })
];

const produtosArea = document.createElement("div");
produtosArea.classList.add("produtos");

produtos.forEach(p => produtosArea.appendChild(p.render()));

document.getElementById("produtos-area").appendChild(produtosArea);

const meuFooter = new Footer();
document.getElementById("footer").appendChild(meuFooter.render());


function finalizarTarefa() {
  localStorage.setItem("fimTarefa", Date.now());
  window.close();
}
