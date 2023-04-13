let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
const hidePholder = document.getElementById('cart-placeholder');


const pizzaSizeSelect = document.getElementById('pizza-size');
const selectedOptionText = document.getElementById('pizza-prize');
pizzaSizeSelect.addEventListener('change', function() {
  const selectedOption = pizzaSizeSelect.options[pizzaSizeSelect.selectedIndex];
  if (selectedOption.value === '9') {
    selectedOptionText.innerText = '₱275';
  } else if (selectedOption.value === '12') {
    selectedOptionText.innerText = '₱445';
  } else if (selectedOption.value === '18') {
    selectedOptionText.innerText = '₱575';
  }
});

function addToCart(event) {
  
  if (localStorage.getItem('isLoggedIn') === 'true') {
    
    alert('added to box');
    displayCartNotif();
    
    const product = event.target.parentNode;
    const image = product.querySelector('img').src;
    const title = product.querySelector('h5').innerText;
    const size = product.querySelector('select').value;
    const price = product.querySelector('p').innerText.replace('₱', '');
    
    cartItems.push({image: image, title: title, price: price, size: size});
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    displayCart();

  } else {

    alert('You must be logged in to add items to your cart.');
    window.scrollTo(0,0);

  }
  
}

function displayCart() {

  const cart = document.getElementById('cart');
  const cartItemsElement = cart.querySelector('#cart-items');
  cartItemsElement.innerHTML = '';

  let total = 0;
  
  cartItems.forEach(function(item, index) {

    hidePholder.classList.add('hidden');
    const listItem = document.createElement('li');
    
    const imageElement = document.createElement('img');
    imageElement.src = item.image;
    listItem.appendChild(imageElement);
  
    const titleElement = document.createElement('h6');
    titleElement.innerText = item.title;
    listItem.appendChild(titleElement);

    const sizeElement = document.createElement('h6');
    sizeElement.innerText = item.size + ' inches';
    listItem.appendChild(sizeElement);
  
    const priceElement = document.createElement('p');
    let priceValue = item.price.replace(/[^0-9.-]+/g,"");
    priceElement.innerText = "₱" + parseFloat(priceValue).toFixed(2);
    listItem.appendChild(priceElement);
    
    const removeIcon = document.createElement('i'); 
    removeIcon.classList.add('fas', 'fa-trash-alt'); 
    
    const removeButton = document.createElement('button'); 
    removeButton.appendChild(removeIcon);
    removeButton.classList.add('btn', 'btn-danger', 'btn-sm');
    removeButton.setAttribute('data-index', index);
    removeButton.addEventListener('click', removeFromCart);
    listItem.appendChild(removeButton);
    
    cartItemsElement.appendChild(listItem); 
    total += parseFloat(priceValue);

  });

  document.getElementById('cart-total').innerText = total.toFixed(2);
  
}

// displayCart();

function removeFromCart(event) {

  const index = parseInt(event.target.getAttribute('data-index'));
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  cartItems.splice(index, 1);

  displayCart();

}

function displayCartNotif() {
  const cartNotif = document.getElementById('cart-notif');
  cartNotif.classList.remove('d-none');
  let currentNumber = parseInt(cartNotif.innerText) || 0;
  cartNotif.innerText = currentNumber + 1;
  const resetButton = document.getElementById('cart-button');
  resetButton.addEventListener('click', function() {
    cartNotif.classList.add('d-none');
    cartNotif.innerText = 0;
  });
}