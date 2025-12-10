// ==============================
// Footer
// ==============================

class Footer {
  render() {
    const footer = document.createElement("footer");
    footer.className = "footer";

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

// ==============================
// CardProduto
// ==============================

class CardProduto {
  constructor(dados) {
    Object.assign(this, dados);
    this.imagem = `/images/Produtos/${this.categoria}/${this.cor}.png`;
  }

  render() {
    const card = document.createElement("div");
    card.className = "card";

    card.append(
      this._criarImagem(),
      this._criarInfo(),
      this._criarIconCarrinho(),
      this._criarIconMarca()
    );

    return card;
  }

  _criarImagem() {
    const img = document.createElement("img");
    img.src = this.imagem;
    img.alt = this.nome;
    return img;
  }

  _criarInfo() {
    const info = document.createElement("div");
    info.className = "info";

    info.innerHTML = `
      <h3>${this.nome}</h3>
      <p class="descricao">${this.descricao}</p>
      <p class="preco">${this.preco}</p>
      <div class="avaliacao">${"★".repeat(this.avaliacao)}</div>
    `;

    return info;
  }

  _criarIconCarrinho() {
    const icon = document.createElement("div");
    icon.className = "icon-carrinho";
    icon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
           viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
    `;

    let podeClicar = true;

    icon.addEventListener("click", () => {
      if (!podeClicar) return;

      podeClicar = false;
      this._adicionarAoCarrinho();

      setTimeout(() => (podeClicar = true), 500);
    });

    return icon;
  }

  _criarIconMarca() {
    const icon = document.createElement("div");
    icon.className = "icon-brand";
    icon.innerHTML = `
      <img src="/images/Produtos/Marcas/${this.marca}.png" 
           alt="Marca ${this.marca}">
    `;
    return icon;
  }

  _adicionarAoCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const modoSabotado = localStorage.getItem("modoSabotado") === "true";

    const produtoExistente = carrinho.find(
      (item) => item.nome === this.nome
    );

    if (!produtoExistente) {
      carrinho.push({ ...this, quantidade: 1 });
    } else if (!modoSabotado) {
      produtoExistente.quantidade += 1;
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    if (!modoSabotado) {
      this._mostrarFeedback();
    }
  }

  _mostrarFeedback() {
    const feedback = document.createElement("div");
    feedback.textContent = "Produto adicionado!";
    feedback.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #4CAF50;
      color: #fff;
      padding: 10px 20px;
      border-radius: 5px;
      z-index: 1000;
      transform: translateY(0);
      transition: transform 1.2s ease;
    `;

    document.body.appendChild(feedback);

    setTimeout(() => (feedback.style.transform = "translateY(-150%)"), 50);
    setTimeout(() => feedback.remove(), 1000);
  }
}
(() => {
  // ==============================
  // Pesquisa
  // ==============================

  // coloque evento de pesquisar no search-box e buscarBtn
  // faça uma veritifação se existe os elementos na página antes de adicionar os eventos

  const searchBox = document.getElementById("search-box");
  const buscarBtn = document.getElementById("buscarBtn");

  if (searchBox) {
    searchBox.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        pesquisar();
      }
    });
  }

  if (buscarBtn) {
    buscarBtn.addEventListener("click", () => {
      pesquisar();
    });
  }

  function pesquisar() {
    const termo = document.getElementById("search-box").value.trim();
    if (!termo) return;

    window.location.href = `../search/index.html?busca=${encodeURIComponent(
      termo
    )}`;
  }

  // ==============================
  // Footer
  // ==============================

  const meuFooter = new Footer();

  const footer = document.getElementById("footer");

  if (footer)
    footer.appendChild(meuFooter.render());

  function definirDescricao() {
    const descricaoTexto = document.getElementById("descricao-tarefa");
    if (!descricaoTexto) return;

    const modoSabotado = localStorage.getItem("modoSabotado") === "true";

    descricaoTexto.innerHTML = `
    <span class="titulo-tarefas">Missão:</span>
    <ol class="lista-tarefas">
      <li>
        Verifique quantos mouses da <strong>Logitech</strong> possuem preço superior a 
        <strong>R$ 200,00</strong>.
        <div class="input-missao">
          <label for="qtd-mouses">Quantidade encontrada:</label>
          <input 
            type="number" 
            id="qtd-mouses" 
            min="0"
            placeholder="Ex: 3"
          />
        </div>
      </li>

      <li>
        Realize a compra da seguinte lista:
        <ul>
          <li>Mouse — 2 unidades</li>
          <li>Teclado — 3 unidades</li>
          <li>Headset — 1 unidade</li>
        </ul>
      </li>

      <li>
        Finalize a compra utilizando <strong>cartão de crédito</strong>.
      </li>
    </ol>
  `;

    configurarInputMissao(modoSabotado);
  }
  function configurarInputMissao(modoSabotado) {
    const input = document.getElementById("qtd-mouses");
    if (!input) return;

    const storageKey = modoSabotado
      ? "missao1_mouses_sabotado"
      : "missao1_mouses_normal";

    const valorSalvo = localStorage.getItem(storageKey);
    if (valorSalvo !== null) {
      input.value = valorSalvo;
    }

    input.addEventListener("change", () => {
      localStorage.setItem(storageKey, input.value);
    });
  }


  function configurarDescricaoToggle() {
    const descricaoArea = document.getElementById("descricao-area");
    const eyeIcon = document.getElementById("eye-icon");
    const descricaoToggle = document.getElementById("descricao-toggle");

    if (!descricaoToggle || !descricaoArea || !eyeIcon) return;

    descricaoToggle.addEventListener("click", () => {
      const aberta = descricaoArea.classList.toggle("visible");
      eyeIcon.src = aberta
        ? "../images/eye-closed.png"
        : "../images/eye-open.png";
    });
  }


  function init() {
    definirDescricao();
    configurarDescricaoToggle();
  }

  init();

})();