
window.addEventListener("DOMContentLoaded", () => {
  let produtos = [];
  fetch("../produtos.json")
    .then(res => {
      if (!res.ok) {
        throw new Error(`Erro HTTP! status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      produtos = data.dados;

      // CORREÇÃO: Ajustar caminhos das imagens
      produtos = produtos.map(produto => ({
        ...produto,
        imagem: produto.imagem.replace("images/", "../images/")
      }));
      const busca = getParametro("busca");
      if (busca) {
        const input = document.getElementById("searchBar");
        input.value = busca;
        aplicarFiltros();
      } else {
        renderizarProdutos(produtos);
      }
    })
    .catch(err => {
      console.error("Erro ao carregar produtos.json:", err);
    });

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

    lista.forEach(item => {
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

  // Sistema de filtros
  const filtros = {
    categoria: [],
    marca: [],
    rgb: [],
    cor: [],
    avaliacao: []
  };

  document.querySelectorAll("input[type=checkbox]").forEach(input => {
    input.addEventListener("change", () => {
      const tipo = input.classList[0].split("-")[1];
      filtros[tipo] = Array.from(document.querySelectorAll(`.filtro-${tipo}:checked`)).map(i => i.value);
      aplicarFiltros();
    });
  });

  document.getElementById("searchBar").addEventListener("input", aplicarFiltros);

  function aplicarFiltros() {
    const busca = document.getElementById("searchBar").value.toLowerCase();

    const filtrados = produtos.filter(p => {
      const nomeMatch = p.nome.toLowerCase().includes(busca);

      const categoriaMatch = filtros.categoria.length ? filtros.categoria.includes(p.categoria) : true;
      const marcaMatch = filtros.marca.length ? filtros.marca.includes(p.marca) : true;
      const rgbMatch = filtros.rgb.length ? filtros.rgb.includes(p.rgb) : true;
      const corMatch = filtros.cor.length ? filtros.cor.includes(p.cor) : true;

      let avaliacaoMatch = true;
      if (filtros.avaliacao.length) {
        const avalSelecionadas = filtros.avaliacao.map(Number); // ['5','4'] -> [5,4]
        avaliacaoMatch = avalSelecionadas.includes(Number(p.avaliacao));
      }
      return nomeMatch && categoriaMatch && marcaMatch && rgbMatch && corMatch && avaliacaoMatch;
    });

    renderizarProdutos(filtrados);
  }


  function getParametro(nome) {
    const params = new URLSearchParams(window.location.search);
    return params.get(nome);
  }

  // Toggle filtros
  const btnToggleFiltros = document.getElementById("toggle-filtros");
  const painelFiltros = document.getElementById("filtros");
  btnToggleFiltros.addEventListener("click", () => {
    painelFiltros.classList.toggle("hidden");
  });

  // Adiciona evento para quando a tela for redimensionada 
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      painelFiltros.classList.remove("hidden");
    }

    if (window.innerWidth <= 768) {
      painelFiltros.classList.add("hidden");
    }
  });

});


