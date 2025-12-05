// =========================
// CLASSE: Footer
// =========================

class Footer {
  constructor() {}

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

// =========================
// CLASSE: CardProduto
// =========================

class CardProduto {
  constructor({
    nome,
    descricao,
    preco,
    imagem,
    categoria,
    marca,
    rgb,
    cor,
    avaliacao,
  }) {
    this.nome = nome;
    this.descricao = descricao;
    this.preco = preco;
    this.imagem = "/images/Produtos/" + categoria + "/" + cor + ".png";
    this.categoria = categoria;
    this.marca = marca;
    this.rgb = rgb;
    this.cor = cor;
    this.avaliacao = avaliacao;
  }

  render() {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = this.imagem;

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

    const avaliacao = document.createElement("div");
    avaliacao.classList.add("avaliacao");
    avaliacao.textContent = "★".repeat(this.avaliacao);

    const icon = document.createElement("div");
    icon.classList.add("icon-carrinho");
    icon.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>';

    const icon_brand = document.createElement("div");
    icon_brand.classList.add("icon-brand");
    const caminhoBrandIcon = "/images/Produtos/Marcas/" + this.marca + ".png";
    icon_brand.innerHTML = `
      <img src="${caminhoBrandIcon}" 
      alt="Ícone da Marca">`;

    // cooldown para evitar múltiplos cliques rápidos
    let podeClicar = true;

    // Event Listener para adicionar ao carrinho
    icon.addEventListener("click", () => {
      if (!podeClicar) return;

      podeClicar = false;
      this.adicionarAoCarrinho();

      setTimeout(() => {
        podeClicar = true;
      }, 500);
    });

    info.appendChild(h3);
    info.appendChild(pDesc);
    info.appendChild(pPreco);
    info.appendChild(avaliacao);

    card.appendChild(img);
    card.appendChild(info);
    card.appendChild(icon);
    card.appendChild(icon_brand);

    return card;
  }

  adicionarAoCarrinho() {
    // Recupera o carrinho atual do localStorage ou cria um array vazio
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const modoSabotado = localStorage.getItem("modoSabotado");

    // Cria o objeto produto com todas as informações
    const produto = {
      nome: this.nome,
      descricao: this.descricao,
      preco: this.preco,
      imagem: this.imagem,
      categoria: this.categoria,
      marca: this.marca,
      rgb: this.rgb,
      cor: this.cor,
      avaliacao: this.avaliacao,
    };

    // Verifica se o produto já existe no carrinho
    /*
    alterei a checagem
    o ideal era ter id no json, mas esqueci na construção inicial.
    a combinação dos atributos garante unicidade (nome foi gerado a partir deles)
    alterei aqui para não causar problemas em outras partes do código
    */
    const produtoExistente = carrinho.find(
      (item) => item.nome === produto.nome
    );

    if (!produtoExistente) {
      // Se não existe, joga o produto no carrinho
      carrinho.push(produto);
    } else if (modoSabotado === "false") {
      produtoExistente.quantidade = (produtoExistente.quantidade || 1) + 1;
    } //só altera a quantidade no modo normal

    // Salva no localStorage
    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    // Feedback visual apenas no modo normal
    if (modoSabotado === "false") {
      this.mostrarFeedback();
    }

    console.log("Produto adicionado ao carrinho:", produto);
  }

  mostrarFeedback() {
    // Feedback visual simples
    const feedback = document.createElement("div");
    feedback.textContent = "Produto adicionado!";
    feedback.style.position = "fixed";
    feedback.style.top = "20px";
    feedback.style.right = "20px";
    feedback.style.background = "#4CAF50";
    feedback.style.color = "white";
    feedback.style.padding = "10px 20px";
    feedback.style.borderRadius = "5px";
    feedback.style.zIndex = "1000";
    feedback.style.transform = "translateY(0)";
    feedback.style.transition = "transform 1.2s ease"; // animação suave

    document.body.appendChild(feedback);

    setTimeout(() => {
      feedback.style.transform = "translateY(-150%)";
    }, 50);
    // Remove o feedback após 2 segundos //alterado para 1
    setTimeout(() => {
      document.body.removeChild(feedback);
    }, 1000);
  }
}
function pesquisar() {
  const termo = document.getElementById("search-box").value.trim();
  if (termo) {
    window.location.href = `../search/index.html?busca=${encodeURIComponent(
      termo
    )}`;
  }
}
