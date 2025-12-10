window.addEventListener("DOMContentLoaded", () => {
  /* =========================
     CONFIGURAÇÃO GLOBAL
  ========================== */
  const sabotado = localStorage.getItem("modoSabotado") === "true";

  if (window.innerWidth <= 768) {
    document.getElementById("filtros").classList.add("hidden");
  }

  let produtos = [];

  const filtros = {
    categoria: [],
    marca: [],
    rgb: [],
    cor: [],
    avaliacao: []
  };

  /* =========================
     ELEMENTOS DOM
  ========================== */
  const searchBar = document.getElementById("searchBar");
  const gridProdutos = document.getElementById("produtos-grid");

  const precoMinInput = document.getElementById("preco-min");
  const precoMaxInput = document.getElementById("preco-max");
  const precoRange = document.getElementById("preco-range");
  const precoRangeValor = document.getElementById("preco-range-valor");

  const painelFiltros = document.getElementById("filtros");
  const btnToggleFiltros = document.getElementById("toggle-filtros");

  /* =========================
     FETCH PRODUTOS
  ========================== */
  fetch("../produtos.json")
    .then(res => {
      if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);
      return res.json();
    })
    .then(data => {
      produtos = data.dados.map(produto => ({
        ...produto,
        imagem: produto.imagem.replace("images/", "../images/")
      }));

      const buscaURL = getParametro("busca");
      if (buscaURL) {
        searchBar.value = buscaURL;
        aplicarFiltros();
      } else {
        renderizarProdutos(produtos);
      }
    })
    .catch(err => console.error("Erro ao carregar produtos:", err));

  function renderizarProdutos(lista) {
    if (!gridProdutos) return;

    gridProdutos.innerHTML = "";

    if (!lista.length) {
      gridProdutos.innerHTML = "<p>Nenhum produto encontrado</p>";
      return;
    }

    lista.forEach(item => {
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
        altura: "150px"
      });

      gridProdutos.appendChild(card.render());
    });
  }

  function aplicarFiltros() {
    let busca = searchBar.value.toLowerCase();

    if (sabotado) {
      delayArtificial(200);
      if (busca.length > 5) busca = busca.slice(0, 5);
    }

    const precoMin = Number(precoMinInput.value) || 0;
    const precoMax = Number(precoMaxInput.value) || Infinity;

    const filtrados = produtos.filter(produto => {
      const nomeMatch = produto.nome.toLowerCase().includes(busca);

      const categoriaMatch = filtros.categoria.length
        ? filtros.categoria.includes(produto.categoria)
        : true;

      const marcaMatch = filtros.marca.length
        ? filtros.marca.includes(produto.marca)
        : true;

      const rgbMatch = filtros.rgb.length
        ? filtros.rgb.includes(produto.rgb)
        : true;

      const corMatch = filtros.cor.length
        ? filtros.cor.includes(produto.cor)
        : true;

      const avaliacaoMatch = filtros.avaliacao.length
        ? filtros.avaliacao.map(Number).includes(Number(produto.avaliacao))
        : true;

      const precoProduto = parsePreco(produto.preco);
      const precoMatch = precoProduto >= precoMin && precoProduto <= precoMax;

      return (
        nomeMatch &&
        categoriaMatch &&
        marcaMatch &&
        rgbMatch &&
        corMatch &&
        avaliacaoMatch &&
        precoMatch
      );
    });

    renderizarProdutos(filtrados);
  }

  document.querySelectorAll("input[type=checkbox]").forEach(input => {
    input.addEventListener("change", () => {
      const tipoAtual = input.classList[0].split("-")[1];

      filtros[tipoAtual] = Array.from(
        document.querySelectorAll(`.filtro-${tipoAtual}:checked`)
      ).map(i => i.value);

      if (sabotado) {
        delayArtificial(300);

        Object.keys(filtros).forEach(tipo => {
          if (tipo !== tipoAtual) {
            filtros[tipo] = [];

            document
              .querySelectorAll(`.filtro-${tipo}`)
              .forEach(cb => (cb.checked = false));
          }
        });
      }

      aplicarFiltros();
    });
  });

  searchBar.addEventListener("input", aplicarFiltros);

  configurarPreco();

  function configurarPreco() {
    precoRange.value = 2000;

    if (sabotado) {
      precoRange.min = 1;
      precoRange.max = 10_000_000_000;
      precoRange.value = 10000;

      precoMinInput.style.display = "none";
      precoMaxInput.style.display = "none";
      document.getElementById("span-price").style.display = "none";
    }

    atualizarTexto(precoRange.value);

    precoRange.addEventListener("input", () => {
      precoMaxInput.value = precoRange.value;
      atualizarTexto(precoRange.value);
      aplicarFiltros();
    });

    precoMinInput.addEventListener("change", normalizarValores);
    precoMaxInput.addEventListener("change", normalizarValores);
  }

  function normalizarValores() {
    const PRECO_MIN = Number(precoRange.min);
    const PRECO_MAX = Number(precoRange.max);

    let min = Number(precoMinInput.value) || PRECO_MIN;
    let max = Number(precoMaxInput.value) || precoRange.value;

    if (min < PRECO_MIN) min = PRECO_MIN;
    if (max > PRECO_MAX) max = PRECO_MAX;
    if (min > max) min = max;

    precoMinInput.value = min;
    precoMaxInput.value = max;
    precoRange.value = max;

    atualizarTexto(max);
    aplicarFiltros();
  }

  function atualizarTexto(valor) {
    precoRangeValor.textContent = valor;
  }


  btnToggleFiltros.addEventListener("click", () => {
    painelFiltros.classList.toggle("hidden");
  });

  window.addEventListener("resize", () => {
    painelFiltros.classList.toggle("hidden", window.innerWidth <= 768);
  });

  /* =========================
     UTILITÁRIOS
  ========================== */
  function parsePreco(valor) {
    return Number(
      valor
        .replace("R$", "")
        .replace(".", "")
        .replace(",", ".")
        .trim()
    );
  }

  function getParametro(nome) {
    return new URLSearchParams(window.location.search).get(nome);
  }

  function delayArtificial(ms) {
    const inicio = Date.now();
    while (Date.now() - inicio < ms) { }
  }
});
