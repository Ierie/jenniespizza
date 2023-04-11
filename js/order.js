function placeOrder() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        navigate('place-order');   
    }
    else {
        alert('You must be logged in to add items to your cart.');
    }
}