
let isValid = false;

//validate name
var nameInput = document.getElementById("username");
nameInput.addEventListener("input", function (e) {
var nameInput = document.getElementById("username");
var username = nameInput.value;
var name_error = document.getElementById("name-validation");
    if (!e.target.value.length) {
        isValid = false;
        nameInput.style.border = "2px solid red";
        name_error.textContent = "Name cannot be empty.";
        name_error.style.display = "block";
    }else if (e.target.value.length < 3) {
        isValid = false;
        nameInput.style.border = "2px solid red";
        name_error.textContent = "Name must be at least 3 characters long.";
        name_error.style.display = "block";
    }
     else {
        isValid = true;
        nameInput.style.border = "2px solid green";
        name_error.style.display = "none";
    }
});
//validate email
var emailInput = document.getElementById("email");
emailInput.addEventListener("input", function (e) {
var emailInput = document.getElementById("email");
var email = emailInput.value;
var email_error = document.getElementById("email-validation");
    if (!e.target.value.length) {
        isValid = false;
        emailInput.style.border = "2px solid red";
        email_error.textContent = "Email cannot be empty.";
        email_error.style.display = "block";
    } else if (!/\S+@\S+\.\S+/.test(e.target.value)) {
        isValid = false;
        emailInput.style.border = "2px solid red";
        email_error.textContent = "Email is invalid.";
        email_error.style.display = "block";
    } else {
        isValid = true;
        emailInput.style.border = "2px solid green";
        email_error.style.display = "none";
    }
});
//validate password
var passwordInput = document.getElementById("password");
passwordInput.addEventListener("input", function (e) {
    var passwordInput = document.getElementById("password");
    var password=passwordInput.value;
    var password_error = document.getElementById("password-validation");
    if (!e.target.value.length) {
        isValid = false;
        passwordInput.style.border = "2px solid red";
        password_error.textContent = "Password cannot be empty.";
        password_error.style.display = "block";
    } else if (e.target.value.length < 8) {
        isValid = false;
        passwordInput.style.border = "2px solid red";
        password_error.textContent = "Password must be at least 8 characters long.";
        password_error.style.display = "block";
          } 
else if (!/[A-Z]/.test(e.target.value)) {
        isValid = false;
        passwordInput.style.border = "2px solid red";
        password_error.textContent = "Password must contain at least one uppercase letter.";
        password_error.style.display = "block";
    } else if (!/[a-z]/.test(e.target.value)) { 
        isValid = false;
        passwordInput.style.border = "2px solid red";
        password_error.textContent = "Password must contain at least one lowercase letter.";
        password_error.style.display = "block";
    }
    else if (!/[0-9]/.test(e.target.value)) {
        isValid = false;
        passwordInput.style.border = "2px solid red";
        password_error.textContent = "Password must contain at least one number.";
        password_error.style.display = "block";
    } else if (!/[!@#$%^&*]/.test(e.target.value)) {
        isValid = false;
        passwordInput.style.border = "2px solid red";
        password_error.textContent = "Password must contain at least one special character.";
        password_error.style.display = "block";
    } 
    else {
        isValid = true;
        passwordInput.style.border = "2px solid green";
        password_error.style.display = "none";
    }
});
//validate confirm password
var confirmPasswordInput = document.getElementById("confirmPassword");
confirmPasswordInput.addEventListener("input", function (e) {
    var confirmPasswordInput = document.getElementById("confirmPassword");
    var confirm_password_error = document.getElementById("confirm-password-validation");
    passwordInput = document.getElementById("password");
    if (!e.target.value.length) {
        confirmPasswordInput.style.border = "2px solid red";
        confirm_password_error.textContent = "Confirm Password cannot be empty.";
        confirm_password_error.style.display = "block";
    } else if (e.target.value !== passwordInput.value) {
        confirmPasswordInput.style.border = "2px solid red";
        confirm_password_error.textContent = "Passwords do not match.";
        confirm_password_error.style.display = "block";
    } else {
        confirmPasswordInput.style.border = "2px solid green";
        confirm_password_error.style.display = "none";
    }
});

//validate form on submit

 document.getElementById("signUpForm").addEventListener("submit", function(e) {
    e.preventDefault(); 
    //check if all fiedls are not empty
    var nameInput = document.getElementById("username");
    var emailInput = document.getElementById("email");
    var passwordInput = document.getElementById("password");
    var confirmPasswordInput = document.getElementById("confirmPassword");
    isValid = nameInput.value && emailInput.value && passwordInput.value && confirmPasswordInput.value;
if (!isValid) {
        alert("Please fill in the form correctly.");
        return;
    }
else if (isValid) {

    // Store user data in local storage
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // 2. البيانات الجديدة
    let newUser = {
      name: username,
      email: email,
      password: password,
    };
    
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    // localStorage.setItem("users", JSON.stringify(users));
    // localStorage.setItem("userName", username);
    // localStorage.setItem("userEmail", email);
    // localStorage.setItem("userPassword", password);
    var successMessage = document.getElementById("success-message");
    successMessage.textContent = " Successfully registered!";
    successMessage.style.display = "block";

    // Redirect after 2.5 seconds
    setTimeout(function() {
        window.location.href = "login.html";
    }, 2500);}

});


