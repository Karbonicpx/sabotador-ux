
window.addEventListener("DOMContentLoaded", () => {
  let produtos = [];

  console.log("Iniciando carregamento...");

  // CORREÇÃO: Caminho correto para a pasta search
  fetch("../produtos.json")
    .then(res => {
      if (!res.ok) {
        throw new Error(`Erro HTTP! status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      console.log("Dados carregados com sucesso:", data.dados.length, "produtos");
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
      // Carregar dados de fallback
      carregarDadosFallback();
    });

  function carregarDadosFallback() {
    console.log("Carregando dados de fallback...");
    const dadosFallback = {
      "dados": [
        {
          "nome": "Mouse Gamer Cobra (Teste)",
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
          "nome": "Headset Logitech G733 (Teste)",
          "descricao": "Som Surround e microfone com filtro de ruído",
          "preco": "R$ 749,90",
          "imagem": "../images/Headset Gamer.png",
          "categoria": "Fone",
          "marca": "Logitech",
          "rgb": "Sim",
          "cor": "Branco",
          "avaliacao": 4
        }
      ]
    };
    produtos = dadosFallback.dados;
    renderizarProdutos(produtos);
  }

  function renderizarProdutos(lista) {
    const grid = document.getElementById("produtos-grid");
    console.log("Grid encontrado:", grid);

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
        imagem: "../images/Produtos/"+item.categoria+"/"+item.cor+".png",
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

    console.log("Produtos renderizados:", lista.length);
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
  const meuFooter = new Footer();
  document.getElementById("footer").appendChild(meuFooter.render());


  function getParametro(nome) {
    const params = new URLSearchParams(window.location.search);
    return params.get(nome);
  }
});


