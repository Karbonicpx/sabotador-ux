(() => {
  // ============================================
  // ESTADO GLOBAL E ELEMENTOS
  // ============================================
  const modoSabotado = localStorage.getItem("modoSabotado") === "true";

  const $ = (id) => document.getElementById(id);

  const overlayLogin = $("overlay_login");
  const overlayPopup = $("overlay_popup");



  const searchBox = $("search-box");
  const spamBanner = $("spam-banner");
  const closeBtn = $("close-banner");

  const produtosGrid = $("produtos-grid");

  let bannerActivated = false;

  function init() {
    configurarModoSabotado();
    carregarProdutos();
    configurarPopupChato();
  }

  function configurarModoSabotado() {
    loginRealizado = localStorage.getItem("loginRealizado") === "true";

    if (loginRealizado) {
      overlayLogin.style.display = "none";
      overlayPopup.style.display = "none";
      return;
    }

    if (!modoSabotado) {
      overlayLogin.style.display = "flex";
      overlayPopup.style.display = "none";
      return;
    }

    overlayLogin.style.display = "none";
    overlayPopup.style.display = "none";
  }

  // ============================================
  // PRODUTOS
  // ============================================
  function carregarProdutos() {
    fetch("../produtos.json")
      .then((r) => {
        if (!r.ok) throw new Error("JSON não encontrado");
        return r.json();
      })
      .then((data) => renderizarProdutos(data.dados))
      .catch(() => renderizarProdutos(dadosJSON?.dados ?? []));
  }

  function renderizarProdutos(lista) {
    if (!produtosGrid) return console.error("#produtos-grid não encontrado!");

    produtosGrid.innerHTML = "";

    if (!lista.length) {
      produtosGrid.innerHTML = "<p>Nenhum produto encontrado</p>";
      return;
    }

    const selecionados = [];
    const start = Math.floor(Math.random() * lista.length);

    for (let i = start; selecionados.length < 18 && i < lista.length; i += 5) {
      selecionados.push(lista[i]);
    }

    selecionados.forEach((item) => {
      const card = new CardProduto({
        nome: item.nome,
        descricao: item.descricao,
        preco: item.preco,
        imagem: `../images/Produtos/${item.categoria}/${item.cor}.png`,
        categoria: item.categoria,
        marca: item.marca,
        rgb: item.rgb,
        cor: item.cor,
        avaliacao: item.avaliacao,
        largura: "180px",
        altura: "150px",
      });

      produtosGrid.appendChild(card.render());
    });
  }



  // ============================================
  // POPUP / SPAM CHAT0
  // ============================================
  function configurarPopupChato() {
    searchBox.addEventListener("click", () => {
      if (!modoSabotado || bannerActivated) return;

      const rect = searchBox.getBoundingClientRect();
      posicionarBanner(rect);

      spamBanner.style.display = "flex";
      overlayPopup.style.display = "block";
      bannerActivated = true;
    });

    spamBanner.addEventListener("click", () => {
      window.open(
        "https://lista.mercadolivre.com.br/ratoeiras#D[A:ratoeiras]",
        "_blank"
      );
      closeBtn.style.display = "block";
    });

    closeBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      spamBanner.style.display = "none";
      overlayPopup.style.display = "none";
    });
  }

  function posicionarBanner(rect) {
    const largura = rect.width * 1.5;

    spamBanner.style.width = largura + "px";
    spamBanner.style.top = rect.top + "px";
    spamBanner.style.left = (window.innerWidth - largura) / 2 + "px";
  }


  init();
})();
