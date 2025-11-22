

// Dados placheholder
const products = [
    {
        id: "p1",
        nome: "Mouse Gamer Cobra",
        descricao: "Alta precisão, RGB e 7200 DPI",
        preco: "R$ 199,90",
        precoNum: 199.90,
        imagem: "../images/Mouse Gamer.png", 
        categoria: "Mouse",
        marca: "Redragon",
        rgb: "Sim",
        cor: "Preto",
        avaliacao: 5,
        disponivel: 10,
        loja: "Produtos ⚡FULL"
    },
    {
        id: "p2",
        nome: "Luminária Noturna Touch",
        descricao: "Controle remoto, recarregável e luz regulável",
        preco: "R$ 55,99",
        precoNum: 55.99,
        imagem: "../images/Mouse Gamer.png",
        categoria: "Iluminação",
        marca: "FenshopVariedades",
        rgb: "Não",
        cor: "Amarelo",
        avaliacao: 4,
        disponivel: 50,
        loja: "Produtos de FENSHOPVARIEDADES"
    }
];

const area = document.getElementById('checkout-area');

function renderProducts() {
    area.innerHTML = "";
    products.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
          <div class="product-thumb">
            <img src="${p.imagem}" onerror="this.style.display='none'; this.parentNode.innerHTML='<div style=&quot;color:#999;font-weight:700&quot;>${getThumbText(p.nome)}</div>'">
          </div>
          <div class="product-info">
            <div class="product-name">${escapeHtml(p.nome)}</div>
            <div class="product-desc">${escapeHtml(p.descricao)}</div>
            </div>
            <div class="product-price">
                <div class="price">R$ ${formatCurrency(p.precoNum)}</div>
                <div class="qty" data-id="${p.id}">
                    <button data-action="dec">−</button>
                    <input type="text" value="${p.qtd || 1}" />
                    <button data-action="inc">+</button>
                </div>
            </div>
        `;
        area.appendChild(card);
    });

    document.querySelectorAll('.qty button').forEach(btn => {
        btn.addEventListener('click', e => {
            const card = e.target.closest('.qty');
            const input = card.querySelector('input');
            let val = parseInt(input.value) || 1;
            val += e.target.dataset.action === 'inc' ? 1 : -1;
            if (val < 1) val = 1;
            input.value = val;

            updateTotal();
        });
    });

    document.querySelectorAll('.qty input').forEach(inp => {
        inp.addEventListener('change', e => {
            let val = parseInt(e.target.value) || 1;
            if (val < 1) val = 1;
            e.target.value = val;
        });
    });
}

function formatCurrency(num) {
    return num.toFixed(2).replace('.', ',');
}

function getThumbText(name) {
    const parts = name.split(' ');
    return (parts[0][0] + (parts[1]?.[0] || '')).toUpperCase();
}

function escapeHtml(s) {
    return String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function updateTotal() {
    let total = 0;
    products.forEach(p => {
        const card = document.querySelector(`.qty[data-id="${p.id}"]`);
        const qty = parseInt(card.querySelector('input').value) || 1;
        total += p.precoNum * qty;
    });
    document.getElementById('summary-total').textContent = `R$ ${formatCurrency(total)}`;
}

renderProducts();

const meuFooter = new Footer();
document.getElementById("footer").appendChild(meuFooter.render());
updateTotal();


function finalizarTarefa() {
    // Coletar dados do carrinho
    const cartItems = [];
    
    products.forEach(p => {
        const card = document.querySelector(`.qty[data-id="${p.id}"]`);
        const qty = parseInt(card.querySelector('input').value) || 1;
        
        if (qty > 0) {
            cartItems.push({
                id: p.id,
                nome: p.nome,
                descricao: p.descricao,
                precoNum: p.precoNum,
                quantidade: qty,
                imagem: p.imagem  
            });
        }
    });
    
    // Salvar no localStorage para a página de checkout
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    const fim = Date.now();
    localStorage.setItem("fimTarefa", fim);
    
    // Redirecionar para a página de finalizacao
    window.location.href = "../compra/index.html";
}
