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
