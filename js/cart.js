let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
const hidePholder = document.getElementById('cart-placeholder');

function addToCart(event) {

  const product = event.target.parentNode;
  const image = product.querySelector('img').src;
  const title = product.querySelector('h5').innerText;
  const price = product.querySelector('p').innerText.replace('₱', '');
  
  cartItems.push({image: image, title: title, price: price});
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  
  displayCart();

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

displayCart();

function removeFromCart(event) {

  const index = parseInt(event.target.getAttribute('data-index'));
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  cartItems.splice(index, 1);

  displayCart();

}
