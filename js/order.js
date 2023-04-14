function placeOrder() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        navigate('place-order');
        displayCartInForm(cartItems);

    }
    else {
        alert('You must be logged in to add items to your cart.');
    }
}

function displayCartInForm(cartItems) {
    
    const cartList = document.getElementById('order-list-item');
    cartList.innerHTML = '';
  
    let total = 0;
  
    for (let i = 0; i < cartItems.length; i++) {
        
      const listItem = document.createElement('li');
      listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'lh-sm');
  
      const itemDetails = document.createElement('div');
      const itemName = document.createElement('h6');
      itemName.classList.add('my-0' , 'text-primary');
      itemName.innerText = cartItems[i].title;
      itemDetails.appendChild(itemName);
  
      const itemDescription = document.createElement('small');
      itemDescription.classList.add('text-body-secondary', 'text-danger');
      itemDescription.innerText = cartItems[i].size + ' Inch';
      itemDetails.appendChild(itemDescription);
  
      listItem.appendChild(itemDetails);
  
      const itemPrice = document.createElement('span');
      itemPrice.classList.add('text-body-secondary');
      itemPrice.innerText = "₱ " + cartItems[i].price;
      listItem.appendChild(itemPrice);
  
      cartList.appendChild(listItem);
  
      total += parseFloat(cartItems[i].price.replace(/[^0-9.-]+/g,""));
    }
  
    const totalElement = document.getElementById('total-content');
    totalElement.innerText = "₱" + total.toFixed(2);
}



const FullName = document.getElementById('fullname');
const MobileNumber = document.getElementById('mobile-num');
const Address = document.getElementById('address');
console.log(FullName);
const FNerror = document.getElementById('full-name-error');
const MNerror = document.getElementById('num-error');
const CAerror = document.getElementById('address-error');

function validateOrderForm() {
    
    let hasError = false;

    if (FullName.value === '') {
        FNerror.classList.remove('d-none');
        FNerror.textContent = 'Valid name is required';
        hasError = true;
    } else {
        FNerror.classList.add('d-none');
        hasError = false;

    }

    if (MobileNumber.value === '') {
        MNerror.classList.remove('d-none');
        MNerror.textContent = 'Valid number is required';
        hasError = true;
    } else if (MobileNumber.value.length !== 11) {
        MNerror.classList.remove('d-none');
        MNerror.textContent = 'Valid number is required';
        hasError = true;
    } else {
        MNerror.classList.add('d-none');
        hasError = false;

    }

    if (Address.value === '') {
        CAerror.classList.remove('d-none');
        CAerror.textContent = 'Valid address is required';
        hasError = true;
    } else {
        CAerror.classList.add('d-none');
        hasError = false;
    }

    if (!hasError) {
        openOrderSlip();
    } else {
        window.scrollTo(0,0);
    }
}


const orderSlipName = document.getElementById('order-slip-name');
const orderSlipMobile = document.getElementById('order-slip-mobile');
const orderSlipAddress = document.getElementById('order-slip-address');
const orderSlipPayment = document.getElementById('order-slip-payment');

function openOrderSlip() {

    orderSlipName.textContent = FullName.value;
    orderSlipMobile.textContent = MobileNumber.value;
    orderSlipAddress.textContent = Address.value

    const totalPayment = document.getElementById('cart-total').innerText
    orderSlipPayment.textContent = '₱ ' + totalPayment;

    const confirmationModal = new bootstrap.Modal(document.getElementById("order-slip"), {});
    confirmationModal.show();
}

function alertSuccess() {
    alert('Order Succesful!');
    setTimeout(() => {
        navigate('home');
        window.location.reload();
      }, 1500);
}