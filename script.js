let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(itemName, itemPrice) {
  // Procurar item no carrinho pelo nome
  const existingItem = cart.find(product => product.name === itemName);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name: itemName, price: itemPrice, quantity: 1 });
  }
  salvarCart();
  updateCart();

  // Animação no ícone do carrinho
  const cartIcon = document.getElementById('cart-icon');
  cartIcon.classList.add('bounce');
  setTimeout(() => cartIcon.classList.remove('bounce'), 400);
}

function updateCart() {
  const cartCount = document.getElementById('cart-count');
  const cartItems = document.getElementById('cart-items');
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.innerText = totalQuantity;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p>O carrinho está vazio.</p>';
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div>
      <strong>${item.name}</strong><br/>
      Quantidade: ${item.quantity}<br/>
      Total: R$ ${(item.quantity * item.price).toFixed(2).replace('.', ',')}
    </div><hr/>
  `).join('');
}

function toggleCart() {
  document.getElementById('cart-panel').classList.toggle('open');
}

function salvarCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Carrega o carrinho salvo no localStorage ao iniciar
function carregarCart() {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
  updateCart();
}

// Inicializa o carrinho ao carregar a página
carregarCart();
