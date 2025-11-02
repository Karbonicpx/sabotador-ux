// Reescrevendo classe
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
  
      const avaliacao = document.createElement("div");
      avaliacao.classList.add("avaliacao");
      avaliacao.textContent = "★".repeat(this.avaliacao);
  
      const icon = document.createElement("div");
      icon.classList.add("icon-carrinho");
      icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>';
  
      info.appendChild(h3);
      info.appendChild(pDesc);
      info.appendChild(pPreco);
      info.appendChild(avaliacao);
  
      card.appendChild(img);
      card.appendChild(info);
      card.appendChild(icon);
  
      return card;
    }
  }
  
  window.addEventListener("DOMContentLoaded", () => {
    let produtos = [];
  
    // Carrega os produtos do JSON
    fetch("produtos.json")
      .then(res => res.json())
      .then(data => {
        produtos = data.dados;
        renderizarProdutos(produtos);
      })
      .catch(err => console.error("Erro ao carregar produtos.json:", err));
  
    // Função que renderiza os produtos no grid
    function renderizarProdutos(lista) {
      const grid = document.getElementById("produtos-grid");
      grid.innerHTML = "";
  
      lista.forEach(item => {
        const card = new CardProduto({
          nome: item.nome,
          descricao: item.descricao,
          preco: item.preco,
          imagem: item.imagem,
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
  
    // -------------------------------
    // SISTEMA DE FILTROS E BUSCA
    // -------------------------------
    const filtros = {
      categoria: [],
      marca: [],
      rgb: [],
      cor: [],
      avaliacao: []
    };
  
    // Atualiza filtros ao clicar nos checkboxes
    document.querySelectorAll("input[type=checkbox]").forEach(input => {
      input.addEventListener("change", () => {
        const tipo = input.classList[0].split("-")[1];
        filtros[tipo] = Array.from(document.querySelectorAll(`.filtro-${tipo}:checked`)).map(i => i.value);
        aplicarFiltros();
      });
    });
  
    // Filtro de texto da barra de busca
    document.getElementById("searchBar").addEventListener("input", aplicarFiltros);
  
    function aplicarFiltros() {
      const busca = document.getElementById("searchBar").value.toLowerCase();
  
      const filtrados = produtos.filter(p => {
        const nomeMatch = p.nome.toLowerCase().includes(busca);
        const categoriaMatch = filtros.categoria.length ? filtros.categoria.includes(p.categoria) : true;
        const marcaMatch = filtros.marca.length ? filtros.marca.includes(p.marca) : true;
        const rgbMatch = filtros.rgb.length ? filtros.rgb.includes(p.rgb) : true;
        const corMatch = filtros.cor.length ? filtros.cor.includes(p.cor) : true;
        const avaliacaoMatch = filtros.avaliacao.length ? p.avaliacao >= Math.min(...filtros.avaliacao.map(Number)) : true;
  
        return nomeMatch && categoriaMatch && marcaMatch && rgbMatch && corMatch && avaliacaoMatch;
      });
  
      renderizarProdutos(filtrados);
    }
  });