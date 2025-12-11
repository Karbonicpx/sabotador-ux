#  Sabotador UX — Plataforma de Pesquisa em Experiência do Usuário

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Pesquisa-Experimental-blue?style=for-the-badge" alt="Pesquisa em UX">
</p>

---

##  Visão Geral
<div align="center">
**Sabotador UX** é um projeto feito por Nicolas Almeida, Juliano Hiroi e Victor Coelho, na Faculdade UTFPR - Curitiba, destinado a trabalho entregue à disciplina Padrões Web, consistindo de uma plataforma de pesquisa projetada para quantificar o impacto do design da experiência do usuário (UX) na eficiência de conclusão de tarefas. A plataforma apresenta:
</div>

---


- **Duas fases distintas**: Fase 1 (UX Boa) vs Fase 2 (UX Ruim)
- **Missões cronometradas**: Tarefas específicas de e-commerce para completar
- **Mecânicas de sabotagem**: Falhas de design intencionais na Fase 2
- **Cronometragem de tempo**: Compare tempos de conclusão entre fases
- **Instruções de missão**: Diretrizes claras de tarefas para participantes

A plataforma simula um site de e-commerce funcional com falhas de UX intencionais para medir como um design ruim afeta o desempenho do usuário, níveis de frustração e taxas de conclusão de tarefas.

---

##  Sistema de Missões

Cada fase contém um conjunto de missões semelhantes, como:

- **Comprar item X em Y quantidades**  
- **Verificar quantidade do item Z na página**
- **Finalizar a compra**  

O tempo de execução é cronometrado para comparação entre a Fase 1 (UX boa) e Fase 2 (UX sabotada).

---

## 📸 Screenshots

### 📄 Página Sobre
| Desktop | Mobile |
|---------|--------|
| ![Sobre Desktop](https://github.com/user-attachments/assets/7fecb372-c2d9-48e1-aac4-b4931778d5b8) | ![Sobre Mobile](https://github.com/user-attachments/assets/727079cb-fe81-43e9-8c20-75206a23958d) |

### 🕹️ Fases do Experimento
| Fase 1 (UX Boa) | Fase 2 (UX Ruim) |
|-----------------|------------------|
| ![Fase 1](https://github.com/user-attachments/assets/29ee1147-05cc-4e21-a9c2-5498cab91f20) | ![Fase 2](https://github.com/user-attachments/assets/5d11aed4-15a1-4d23-9568-97d47ca7bffb) |

### 🏠 Página Inicial
| Desktop | Mobile |
|---------|--------|
| ![Home Desktop](https://github.com/user-attachments/assets/93edf2e0-82ad-4dab-b22f-221a41bbf5b1) | ![Home Mobile](https://github.com/user-attachments/assets/9b3e1092-61cd-4361-bb29-981fe5ac42e1) |

### 👁 Botão de Instruções
![Botão Instruções](https://github.com/user-attachments/assets/3ca95389-acc6-45b0-8382-801b55bd015b)

### 🔍 Página de Busca
| Desktop | Mobile |
|---------|--------|
| ![Search Desktop](https://github.com/user-attachments/assets/aec417b3-988f-4832-8daa-ab42e7ea7324) | ![Search Mobile](https://github.com/user-attachments/assets/15e3608a-3556-42c3-ae3b-183ae73f40c0) |

### 🛒 Processo de Compra
| Checkout Desktop | Checkout Mobile | Confirmação Desktop | Confirmação Mobile |
|------------------|-----------------|---------------------|-------------------|
| ![Checkout Desktop](https://github.com/user-attachments/assets/df9c3db3-314e-4777-9bd7-6511ec51cb75) | ![Checkout Mobile](https://github.com/user-attachments/assets/ed1208ec-6003-4bf4-8147-e0d50c326289) | ![Finalização Desktop](https://github.com/user-attachments/assets/fd7e9fd7-d2d4-4d84-85f4-34eea733c433) | ![Finalização Mobile](https://github.com/user-attachments/assets/3d080eb9-9ce7-4246-a089-f24814ab92cc) |

---

## 🔥 Sabotagens de UX Implementadas (Fase 2)

### 🔔 1. Pop-up Obrigatório
Usuário precisa fechar manualmente antes de continuar.  
![Pop-up](https://github.com/user-attachments/assets/09cfe878-7c40-4ed0-a17b-e326f61bde69)

### 🎚️ 2. Filtros Quebrados
- Apenas 1 filtro pode ser selecionado por vez
- Filtro de preço completamente inutilizável  
![Filtros](https://github.com/user-attachments/assets/1f7bc45b-87c6-4f92-b1f7-5c0c4699c290)

### 🛒 3. Sem Feedback ao Adicionar ao Carrinho
O usuário não recebe nenhuma confirmação visual quando adiciona itens ao carrinho.

### 🔐 4. Login Obrigatório Após Adicionar Produtos
![Login](https://github.com/user-attachments/assets/2fffefa8-bc26-4b43-babe-3fcf0af6ab1b)

### 🧹 5. Carrinho é Esvaziado Após Login
![Carrinho apagado](https://github.com/user-attachments/assets/ede9f63e-7496-40ac-9850-62f9bb5be32b)

### ➖➕ 6. Botões de Quantidade Bugados
- Botão "–" diminui em **0.3 unidades**
- Botão "+" aumenta em **0.1 unidades**
- Quantidades ficam inconsistentes e difíceis de controlar  
![Quantidade Bugada](https://github.com/user-attachments/assets/f197c535-d717-4221-b934-89c5fca20147)

---

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica das páginas
- **CSS3** - Design responsivo e estilização visual
- **JavaScript (Vanilla)** - Lógica da aplicação sem frameworks
- **Local Storage** - Gerenciamento de sessão e persistência de dados
- **Classes CSS** - Alternância entre fases via toggle de classes

---

## 🚀 Começando

### Pré-requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor web local (para implantação local)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seuusuario/sabotador-ux.git
cd sabotador-ux

# O projeto está pronto para usar - sem processo de build necessário
# Basta abrir index.html no seu navegador ou servir via servidor local (a forma mais simples é utilizando a extensão do vs code Live Server para isso)
