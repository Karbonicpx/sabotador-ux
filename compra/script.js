// Carrega os itens do carrinho na página de checkout
document.addEventListener('DOMContentLoaded', function () {
    carregarItensCarrinho();
    configurarMetodoPagamento();
});

function carregarItensCarrinho() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const orderItems = document.getElementById('order-items');

    if (cartItems.length === 0) {
        orderItems.innerHTML = '<p>Carrinho vazio</p>';
        document.getElementById('subtotal').textContent = 'R$ 0,00';
        document.getElementById('taxa-entrega').textContent = 'R$ 0,00';
        document.getElementById('total-pedido').textContent = 'R$ 0,00';
        return;
    }

    let subtotal = 0;
    let html = '';

    cartItems.forEach(item => {
        // Garante que o preço é um número válido
        const preco = parsePrice(item.precoNum || item.preco);
        const quantidade = item.quantidade || 1;
        const itemTotal = preco * quantidade;
        subtotal += itemTotal;

        // Gerar placeholder se não tiver imagem
        const thumbText = getThumbText(item.nome);

        html += `
            <div class="order-item">
                <div class="order-item-img">
                    ${item.imagem ?
                `<img src="${item.imagem}" onerror="this.style.display='none'; this.parentNode.innerHTML='<div class=&quot;img-placeholder&quot;>${thumbText}</div>'">` :
                `<div class="img-placeholder">${thumbText}</div>`
            }
                </div>
                <div class="order-item-content">
                    <p><strong>${escapeHtml(item.nome)}</strong></p>
                    <p>Quantidade: ${quantidade}</p>
                    <p class="order-item-price">R$ ${formatCurrency(itemTotal)}</p>
                    <p class="item-desc">${escapeHtml(item.descricao)}</p>
                </div>
            </div>
        `;
    });

    orderItems.innerHTML = html;

    const taxaEntrega = 8.00;
    const total = subtotal + taxaEntrega;

    document.getElementById('subtotal').textContent = `R$ ${formatCurrency(subtotal)}`;
    document.getElementById('taxa-entrega').textContent = `R$ ${formatCurrency(taxaEntrega)}`;
    document.getElementById('total-pedido').textContent = `R$ ${formatCurrency(total)}`;
}

// Função para converter qualquer formato de preço para número
function parsePrice(price) {
    // Se já é número, retorna diretamente
    if (typeof price === 'number' && !isNaN(price)) {
        return price;
    }

    // Se é string, faz a conversão
    if (typeof price === 'string') {
        const cleaned = price
            .replace('R$', '')
            .replace(/\s/g, '')
            .replace(/\./g, '')  // Remove pontos de milhar
            .replace(',', '.')   // Converte vírgula decimal para ponto
            .trim();

        const result = parseFloat(cleaned);
        return isNaN(result) ? 0 : result;
    }

    // Se não é número nem string, retorna 0
    return 0;
}

function getThumbText(name) {
    if (!name) return '??';
    const parts = name.split(' ');
    return (parts[0][0] + (parts[1]?.[0] || '')).toUpperCase();
}

function configurarMetodoPagamento() {
    const select = document.getElementById("metodoPagamento");
    const cartao = document.getElementById("pag-cartao");
    const pix = document.getElementById("pag-pix");
    const boleto = document.getElementById("pag-boleto");

    if (select && cartao && pix && boleto) {
        select.addEventListener("change", () => {
            cartao.classList.add("oculto");
            pix.classList.add("oculto");
            boleto.classList.add("oculto");

            if (select.value === "cartao") cartao.classList.remove("oculto");
            if (select.value === "pix") pix.classList.remove("oculto");
            if (select.value === "boleto") boleto.classList.remove("oculto");
        });
    }
}

function formatCurrency(num) {
    // Usa a função parsePrice para garantir que é número
    const numberValue = parsePrice(num);
    return numberValue.toFixed(2).replace('.', ',');
}

function escapeHtml(s) {
    if (!s) return '';
    return String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function confirmarCompra() {
    const modoSabotado = localStorage.getItem("modoSabotado") === "true";

    const produtos = JSON.parse(localStorage.getItem("cartItems")) || [];

    if (!produtos.length) {
        alert("Erro: produtos não encontrados.");
        return;
    }

    const STORAGE_KEY = "resultados";
    const resultadosSalvos =
        JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
            normal: {},
            sabotado: {}
        };

    const modoKey = modoSabotado ? "sabotado" : "normal";

    // =============================
    // MISSÃO 1 — CONTAGEM
    // =============================
    let respostaCorretaMissao1Normal = 5;
    let respostaCorretaMissao1Sabotado = 2;

    let respostaCorretaMissao;
    let respostaUsuarioMissao1;

    if (!modoSabotado) {
        respostaUsuarioMissao1 = localStorage.getItem("missao1_mouses_normal");
        respostaCorretaMissao = respostaCorretaMissao1Normal;


    } else {
        respostaUsuarioMissao1 = localStorage.getItem("missao1_mouses_sabotado");
        respostaCorretaMissao = respostaCorretaMissao1Sabotado;
    }

    resultadosSalvos[modoKey].missao1 = {
        respostaCorreta: respostaCorretaMissao,
        respostaUsuario: Number(respostaUsuarioMissao1),
        sucesso:
            Number(respostaUsuarioMissao1) === respostaCorretaMissao,
    };

    // =============================
    // MISSÃO 2 — ITENS NO CARRINHO
    // =============================

    const missoesStorage = JSON.parse(
        localStorage.getItem("missoesProdutos")
    );

    // lista de itens da missão de acordo com o modo
    const listaMissao = missoesStorage?.[modoKey] || [];

    const sucessoMissao2 = listaMissao.every(itemMissao => {
        const itemCarrinho = produtos.find(
            p => p.nome === itemMissao.nome
        );

        return itemCarrinho && itemCarrinho.quantidade >= itemMissao.quantidade;
    });

    resultadosSalvos[modoKey].missao2 = {
        sucesso: sucessoMissao2
    };

    // =============================
    // MISSÃO 3 — FORMA DE PAGAMENTO
    // =============================

    const formaPagamento = document.getElementById("metodoPagamento")?.value;
    if (!formaPagamento) {
        alert("Por favor, selecione uma forma de pagamento.");
        return;
    }
    const sucessoMissao3 = formaPagamento === "cartao";

    resultadosSalvos[modoKey].missao3 = {
        formaPagamento,
        sucesso: sucessoMissao3,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(resultadosSalvos));

    if (modoSabotado) {
        localStorage.setItem("fimTarefa2", Date.now());

    } else {
        localStorage.setItem("fimTarefa1", Date.now());
    }

    console.log("resultadosSalvos", resultadosSalvos);
    alert(
        resultadosSalvos[modoKey].missao1.sucesso &&
            resultadosSalvos[modoKey].missao2.sucesso &&
            resultadosSalvos[modoKey].missao3.sucesso
            ? "Compra finalizada com sucesso! Todas as missões concluídas ✅"
            : "Compra finalizada, mas uma ou mais missões falharam ❌"
    );

    window.close();
}


