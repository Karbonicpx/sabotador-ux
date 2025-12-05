// Carrega os itens reais do carrinho
let products = JSON.parse(localStorage.getItem("carrinho")) || [];

const area = document.getElementById('checkout-area');

function renderProducts() {
    area.innerHTML = "";

    // Adiciona IDs únicos se não existirem e garante a propriedade quantidade
    products = products.map((p, index) => {
        return {
            ...p,
            id: p.id || `p${index + 1}`, // Garante que tem ID
            quantidade: p.quantidade || 1 // Garante que tem quantidade
        };
    });

    products.forEach(p => {
        const sabotado = localStorage.getItem("modoSabotado") === "true";
        const card = document.createElement('div');
        card.className = 'product-card';

        card.innerHTML = `
          <button class="delete-btn" data-id="${p.id}">×</button>
          
          <div class="product-thumb">
            <img src="${p.imagem}" 
                 onerror="this.style.display='none'; this.parentNode.innerHTML='<div style=&quot;color:#999;font-weight:700&quot;>${getThumbText(p.nome)}</div>'">
          </div>

          <div class="product-info">
            <div class="product-name">${escapeHtml(p.nome)}</div>
            <div class="product-desc">${escapeHtml(p.descricao)}</div>
          </div>

          <div class="product-price">
              <div class="price">R$ ${formatCurrency(p.preco)}</div>

              <div class="qty" data-id="${p.id}">
                  <button data-action="dec">−</button>
                  <input type="text" value="${p.quantidade}" ${sabotado ? 'readonly' : ''}/>
                  <button data-action="inc">+</button>
              </div>
          </div>
        `;

        area.appendChild(card);
    });

    // Mostra o valor total da compra
    updateTotal();

    // Eventos dos botões + e -
    document.querySelectorAll('.qty button').forEach(btn => {
        btn.addEventListener('click', e => {
            const card = e.target.closest('.qty');
            const input = card.querySelector('input');
            let val = parseInt(input.value) || 1;

            val += e.target.dataset.action === 'inc' ? 1 : -1;
            if (val < 1) val = 1;
            input.value = val;

            updateQtyInCart(card.dataset.id, val);
            updateTotal();
        });
    });

    // Evento de alteração manual
    document.querySelectorAll('.qty input').forEach(inp => {
        inp.addEventListener('change', e => {
            let val = parseInt(e.target.value) || 1;
            if (val < 1) val = 1;
            e.target.value = val;

            const id = e.target.closest('.qty').dataset.id;
            updateQtyInCart(id, val);
            updateTotal();
        });
    });

    // Eventos dos botões de excluir
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            const productId = e.target.dataset.id;
            removeFromCart(productId);
        });
    });
}

// Remove produto do carrinho
function removeFromCart(productId) {
    const modoSabotado = localStorage.getItem("modoSabotado");
    if (modoSabotado === "true"||confirm('Tem certeza que deseja remover este produto do carrinho?')) {
        // Remove do array products
        products = products.filter(p => p.id !== productId);
        
        // Atualiza o localStorage
        localStorage.setItem("carrinho", JSON.stringify(products));
        
        // Re-renderiza os produtos
        renderProducts();
        updateTotal();
        
    // Mostra mensagem de feedback no modo normal        
    if(modoSabotado === "false")
    {
      showMessage('Produto removido do carrinho!');
    }
        
    }
}

// Função para mostrar mensagem de feedback
function showMessage(message) {
    // Remove mensagem anterior se existir
    const existingMessage = document.querySelector('.feedback-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageEl = document.createElement('div');
    messageEl.className = 'feedback-message';
    messageEl.textContent = message;
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 12px 20px;
        border-radius: 5px;
        z-index: 1000;
        font-family: Arial, sans-serif;
    `;
    messageEl.style.transform = "translateY(0)";
    messageEl.style.transition = "transform 1.2s ease"; // animação suave

    document.body.appendChild(messageEl);
    
    setTimeout(() => {
      messageEl.style.transform = "translateY(-150%)";
    }, 200);
    setTimeout(() => {
        if (messageEl.parentNode) {
            messageEl.remove();
        }
    }, 1500);//alterado
}

// Atualiza quantidade no localStorage
function updateQtyInCart(productId, newQty) {
    // Atualiza no array products
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
        products[productIndex].quantidade = newQty;

        // Salva o array products atualizado no localStorage
        const carrinhoAtualizado = products.map(p => ({
            nome: p.nome,
            descricao: p.descricao,
            preco: p.preco, // Mantém o preço original
            imagem: p.imagem,
            categoria: p.categoria,
            marca: p.marca,
            rgb: p.rgb,
            cor: p.cor,
            avaliacao: p.avaliacao,
            quantidade: p.quantidade,
            id: p.id // Mantém o ID
        }));

        localStorage.setItem("carrinho", JSON.stringify(carrinhoAtualizado));
        
        // Atualiza também o visual da quantidade no card
        const input = document.querySelector(`.qty[data-id="${productId}"] input`);
        if (input) {
            input.value = newQty;
        }
    }
}

function formatCurrency(num) {
    // Se for string, remove "R$" e converte vírgula para ponto
    if (typeof num === 'string') {
        num = num.replace('R$', '').replace(/\./g, '').replace(',', '.').trim();
    }
    return parseFloat(num).toFixed(2).replace('.', ',');
}

function getThumbText(name) {
    const parts = name.split(' ');
    return (parts[0][0] + (parts[1]?.[0] || '')).toUpperCase();
}

function escapeHtml(s) {
    return String(s)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;');
}

// Calcula o total real do carrinho
function updateTotal() {
    let total = 0;

    products.forEach(p => {
        const precoNumerico = parsePrice(p.preco);
        const quantidade = p.quantidade || 1;
        total += precoNumerico * quantidade;
    });

    const totalElement = document.getElementById('summary-total');

    totalElement.textContent = `R$ ${formatCurrency(total)}`;
}


// Função para converter preço string para número
function parsePrice(priceString) {
    if (typeof priceString === 'number') {
        return priceString;
    }
    
    // Remove "R$", espaços, pontos (milhar) e converte vírgula (decimal) para ponto
    const cleaned = priceString
        .replace('R$', '')
        .replace(/\s/g, '')
        .replace(/\./g, '')
        .replace(',', '.')
        .trim();
    
    return parseFloat(cleaned) || 0;
}

function finalizarTarefa() {
    if (products.length === 0) {
        alert("Seu carrinho está vazio. Adicione produtos antes de finalizar a compra.");
        return;
    }
    
    // Pega os dados já atualizados do array products
    const updatedCartItems = products.map(p => ({
        id: p.id,
        nome: p.nome,
        descricao: p.descricao,
        preco: p.preco,
        precoNum: parsePrice(p.preco), // Converte para número
        quantidade: p.quantidade || 1,
        imagem: p.imagem,
        categoria: p.categoria,
        marca: p.marca,
        cor: p.cor
    }));
    
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    
    const fim = Date.now();
    localStorage.setItem("fimTarefa", fim);
    
    window.location.href = "../compra/index.html";
}

// Renderiza tudo
renderProducts();

const meuFooter = new Footer();
document.getElementById("footer").appendChild(meuFooter.render());