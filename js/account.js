const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const showRegisterForm = document.getElementById('show-register');
const showLoginForm = document.getElementById('show-login');

const loadingRegister = document.getElementById('loading-register');
const loadingLogin = document.getElementById('loading-login');

const form = document.getElementsByTagName('form');

registerForm.classList.add('hidden');


showRegisterForm.addEventListener('click', function() {
  loadingRegister.classList.remove('d-none');
  setTimeout(() => {
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    loadingRegister.classList.add('d-none');
  }, 1000);
});

showLoginForm.addEventListener('click', function() {
  loadingLogin.classList.remove('d-none');
  setTimeout(() => {
    registerForm.classList.add('hidden');   
    loginForm.classList.remove('hidden');
    loadingLogin.classList.add('d-none');
  }, 1000);
});

function formReset() {
  const myForm = document.querySelector('form');
  const formInputs = myForm.querySelectorAll('input');
  formInputs.forEach(input => input.value = '');
}

let users = [];

function registerUser() {

  const userFirstName = document.getElementById("first-name").value;
  const userLastName = document.getElementById("last-name").value;
  const name = userFirstName.concat(" ", userLastName);
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  const userExists = users.some((user) => user.email === email);

  if (!userExists) {
    const user = { name, email, password };
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful!");
    form.reset();
  } else {
    alert("User already registered!");
  }

}



function loginUser() {

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const user = users.find((user) => user.email === email && user.password === password);

  if (email === "" && password === "") {
    alert('please input all the fields');
  } else if (user) {
    alert(`Login successful! Welcome back ${user.name}!`);
    const loginForm = document.getElementById('login-form');
    formReset();
  }  else {
    alert("Invalid credentials!");
  }

}
console.log(form);
function init() {
  const storedUsers = localStorage.getItem("users");
  if (storedUsers !== null) {
    users = JSON.parse(storedUsers);
  }
}

init();
console.log(localStorage.users);



//Validate Login Form

const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');

const loginEmailError = document.getElementById('login-email-error');
const loginPasswordError = document.getElementById('login-password-error');

loginEmail.classList.remove('is-invalid');
loginPassword.classList.remove('is-invalid');

function validateLoginForm() {

  let hasError = false;

  if (loginEmail.value === '') {
    loginEmail.classList.add('is-invalid');
    loginEmailError.classList.remove('d-none');
    loginEmailError.textContent = 'Email is required'
    hasError = true;
  } else {
    loginEmail.classList.remove('is-invalid');
    loginEmailError.classList.add('d-none');
  }

  if (loginPassword.value === '') {
    loginPassword.classList.add('is-invalid');
    loginPasswordError.classList.remove('d-none');
    loginPasswordError.textContent = 'Password is required'
    hasError = true;
  } else {
    loginEmail.classList.remove('is-invalid');
    loginEmailError.classList.add('d-none');
  }


  if (!hasError) {
    loginUser();
  } else {
    window.scrollTo(0,0);
  }
}

// Validate Register Form
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const registerEmail = document.getElementById('register-email');
const registerPassword = document.getElementById('register-password');
const confirmPassword = document.getElementById('confirm-password');

// Form Error 
const firstNameError = document.getElementById('first-name-error');
const lastNameError = document.getElementById('last-name-error');
const registerEmailError = document.getElementById('register-email-error');
const registerPasswordError = document.getElementById('register-password-error');
const confirmPasswordError = document.getElementById('confirm-password-error');

// Input Error
firstName.classList.remove('is-invalid');
lastName.classList.remove('is-invalid');
registerEmail.classList.remove('is-invalid');
registerPassword.classList.remove('is-invalid');
confirmPassword.classList.remove('is-invalid');

function validateRegisterForm() {

  let hasError = false;
  
  // Validate First Name 
  if (firstName.value === '') {
    firstName.classList.add('is-invalid');
    firstNameError.classList.remove('d-none');
    firstNameError.textContent = 'First Name is Required';
    hasError = true;
  } else {
    firstName.classList.remove('is-invalid');
    firstNameError.classList.add('d-none');
  }

  // Validate Last Name
  if (lastName.value === '') {
    lastName.classList.add('is-invalid');
    lastNameError.classList.remove('d-none');
    lastNameError.textContent = 'Last Name is Required';
    hasError = true;
  } else {
    lastName.classList.remove('is-invalid');
    lastNameError.classList.add('d-none');
  }
  
  // Validate Email
  if (registerEmail.value === '') {
    registerEmail.classList.add('is-invalid');
    registerEmailError.classList.remove('d-none');
    registerEmailError.textContent = 'Email Address is Required';
    hasError = true;
  } else {
    registerEmail.classList.remove('is-invalid');
    registerEmailError.classList.add('d-none');
  } 

  // Validate Password
  if (registerPassword.value === '') {
    registerPassword.classList.add('is-invalid');
    registerPasswordError.classList.remove('d-none');
    registerPasswordError.textContent = 'Password is Required';
    hasError = true;
  } else if (registerPassword.value.length < 8) {
    registerPassword.classList.add('is-invalid');
    registerPasswordError.classList.remove('d-none');
    registerPasswordError.textContent = 'Password must 8 and above';
    hasError = true;
  } else {
    registerPassword.classList.remove('is-invalid');
    registerPasswordError.classList.add('d-none');
  } 

  // Validate Confirm Password
  if (confirmPassword.value === '') {
    confirmPassword.classList.add('is-invalid');
    confirmPasswordError.classList.remove('d-none');
    confirmPasswordError.textContent = 'Confirm Password is Required';
    hasError = true;
  } else if (registerPassword.value !== confirmPassword.value) {
    confirmPassword.classList.add('is-invalid');
    confirmPasswordError.classList.remove('d-none');
    confirmPasswordError.textContent = 'Password did not match';
    hasError = true;
  } else {
    confirmPassword.classList.remove('is-invalid');
    confirmPasswordError.classList.add('d-none');
  } 

  
  if (!hasError) {
    registerUser();
  } else {
    window.scrollTo(0,0);
  }
  
}


