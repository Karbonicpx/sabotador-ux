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
        return;
    }
    
    let subtotal = 0;
    let html = '';
    
    cartItems.forEach(item => {
        const itemTotal = item.precoNum * item.quantidade;
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
                    <p>Quantidade: ${item.quantidade}</p>
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


function getThumbText(name) {
    const parts = name.split(' ');
    return (parts[0][0] + (parts[1]?.[0] || '')).toUpperCase();
}

function configurarMetodoPagamento() {
    const select = document.getElementById("metodoPagamento");
    const cartao = document.getElementById("pag-cartao");
    const pix = document.getElementById("pag-pix");
    const boleto = document.getElementById("pag-boleto");

    select.addEventListener("change", () => {
        cartao.classList.add("oculto");
        pix.classList.add("oculto");
        boleto.classList.add("oculto");

        if (select.value === "cartao") cartao.classList.remove("oculto");
        if (select.value === "pix") pix.classList.remove("oculto");
        if (select.value === "boleto") boleto.classList.remove("oculto");
    });
}

function formatCurrency(num) {
    return num.toFixed(2).replace('.', ',');
}

function escapeHtml(s) {
    return String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function confirmarCompra() {

    alert('Compra confirmada!');
    localStorage.removeItem('cartItems'); // Limpa o carrinho
    window.location.href = "../home/index.html"; // Volta para home
}