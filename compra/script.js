// Carrega os itens do carrinho na página de checkout
document.addEventListener('DOMContentLoaded', function() {
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
    alert('Compra confirmada!');
    localStorage.removeItem('cartItems'); // Limpa o carrinho
    localStorage.removeItem('carrinho'); // Limpa também o carrinho original se existir
    window.location.href = "../home/index.html"; // Volta para home
}


const meuFooter = new Footer();
document.getElementById("footer").appendChild(meuFooter.render());