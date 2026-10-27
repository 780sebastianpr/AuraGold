const cartCount = document.querySelector('.cart-count');
const toast = document.querySelector('.toast');
let cartItems = 0;
let toastTimer;

function notify(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2300);
}

document.querySelectorAll('.add-cart').forEach((button) => {
  button.addEventListener('click', () => {
    cartItems += 1;
    cartCount.textContent = cartItems;
    const name = button.closest('.product-card').querySelector('h3').textContent;
    notify(`${name} añadida a tu bolsa`);
  });
});

document.querySelectorAll('.favorite').forEach((button) => {
  button.addEventListener('click', () => {
    const favorite = button.classList.toggle('active');
    button.textContent = favorite ? '♥' : '♡';
    notify(favorite ? 'Guardada en tus favoritos' : 'Eliminada de tus favoritos');
  });
});

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('.collection').forEach((button) => {
  button.addEventListener('click', () => {
    const alreadySelected = button.classList.contains('selected');
    document.querySelectorAll('.collection').forEach((item) => item.classList.remove('selected'));
    const cards = document.querySelectorAll('.product-card');
    if (alreadySelected) {
      cards.forEach((card) => card.classList.remove('hidden'));
      return;
    }
    button.classList.add('selected');
    const category = button.dataset.filter;
    cards.forEach((card) => card.classList.toggle('hidden', card.dataset.category !== category));
    document.querySelector('#destacados').scrollIntoView({ behavior: 'smooth' });
  });
});

document.querySelector('.all-collections').addEventListener('click', () => {
  document.querySelectorAll('.collection').forEach((item) => item.classList.remove('selected'));
  document.querySelectorAll('.product-card').forEach((card) => card.classList.remove('hidden'));
  document.querySelector('#destacados').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.search-toggle').addEventListener('click', () => {
  const term = window.prompt('¿Qué manilla estás buscando?');
  if (!term) return;
  const query = term.trim().toLocaleLowerCase('es');
  let matches = 0;
  document.querySelectorAll('.product-card').forEach((card) => {
    const found = card.textContent.toLocaleLowerCase('es').includes(query);
    card.classList.toggle('hidden', !found);
    if (found) matches += 1;
  });
  document.querySelector('#destacados').scrollIntoView({ behavior: 'smooth' });
  notify(matches ? `${matches} producto${matches === 1 ? '' : 's'} encontrado${matches === 1 ? '' : 's'}` : 'No encontramos ese producto');
});

document.querySelector('.bag').addEventListener('click', () => {
  notify(cartItems ? `Tienes ${cartItems} producto${cartItems === 1 ? '' : 's'} en tu bolsa` : 'Tu bolsa está esperando algo especial ♡');
});

document.querySelectorAll('.header-actions .icon-button:nth-child(2), .catalog-button').forEach((button) => {
  button.addEventListener('click', () => notify('Pronto podrás explorar el catálogo completo de AuraGold'));
});
