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
    constructor({ nome, descricao, preco, imagem, categoria, marca, rgb, cor, avaliacao, largura = "200px", altura = "150px" }) {
      this.nome = nome;
      this.descricao = descricao;
      this.preco = preco;
      this.imagem = imagem;
      this.categoria = categoria;
      this.marca = marca;
      this.rgb = rgb;
      this.cor = cor;
      this.avaliacao = avaliacao;
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

// =========================
// CARREGAR PRODUTOS DO JSON EXTERNO
// =========================

fetch("produtos.json")
.then(response => {
  if (!response.ok) throw new Error("Arquivo JSON não encontrado");
  return response.json();
})
.then(data => {
  renderizarProdutos(data.dados);
})
.catch(error => {
  console.warn(" Usando dados locais por falha no JSON externo: ", error.message);
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
  document.getElementById("produtos-area").appendChild(produtosArea);
}
  