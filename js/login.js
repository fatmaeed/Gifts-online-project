let users = JSON.parse(localStorage.getItem("users")) || [];


document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let savedEmail = localStorage.getItem("userEmail");
    let savedPassword = localStorage.getItem("userPassword");
    
    let inputEmail = document.getElementById("email");
    let inputPassword = document.getElementById("password");
    
    let email_error = document.getElementById("email-validation");
    let password_error = document.getElementById("password-validation");
    
    let foundUser = users.find(u => u.email === inputEmail.value && u.password === inputPassword.value);

    email_error.style.display = "none";
    password_error.style.display = "none";
    inputEmail.style.border = "";
    inputPassword.style.border = "";

    let valid = true;

    if (foundUser) {
        logedinUser = foundUser;
        localStorage.setItem("currentUser", JSON.stringify(logedinUser));
        inputEmail.style.border = "2px solid green";
        inputPassword.style.border = "2px solid green";
        window.location.href = "home.html";
    } else {
        valid = validateEmail(inputEmail, email_error) && valid;
        valid = validatePassword(inputPassword, password_error) && valid;
        valid = validateCredentials(inputEmail, inputPassword, savedEmail, savedPassword, email_error, password_error) && valid;

        if (!valid) {
            e.preventDefault();
        }
    }
});

function validateEmail(inputEmail, email_error) {
    if (inputEmail.value.trim() === "") {
        inputEmail.style.border = "2px solid red";
        email_error.textContent = "Email cannot be empty.";
        email_error.style.display = "block";
        return false;
    }
    return true;
}

function validatePassword(inputPassword, password_error) {
    if (inputPassword.value.trim() === "") {
        inputPassword.style.border = "2px solid red";
        password_error.textContent = "Password cannot be empty.";
        password_error.style.display = "block";
        return false;
    }
    return true;
}

function validateCredentials(inputEmail, inputPassword, savedEmail, savedPassword, email_error, password_error) {
    if (inputEmail.value.trim() !== savedEmail || inputPassword.value.trim() !== savedPassword) {
        inputEmail.style.border = "2px solid red";
        email_error.textContent = "Invalid email or password.";
        email_error.style.display = "block";
        inputPassword.style.border = "2px solid red";
        password_error.textContent = "Invalid email or password.";
        password_error.style.display = "block";
        return false;
    }
    return true;
}

// let users = JSON.parse(localStorage.getItem("users")) || [];

// document.getElementById("loginForm").addEventListener("submit", function (e) {
//     let savedEmail = localStorage.getItem("userEmail");
//     let savedPassword = localStorage.getItem("userPassword");
//     let inputEmail = document.getElementById("email");
//     let inputPassword = document.getElementById("password");
//     let email_error = document.getElementById("email-validation");
//     let password_error = document.getElementById("password-validation");
//     // Check if the email and password match the saved values in local storage
//     let users = JSON.parse(localStorage.getItem("users")) || [];

// let foundUser = users.find(u => u.email === inputEmail.value && u.password === inputPassword.value);
// //console.log("foundUser", foundUser);
// e.preventDefault();
// if (foundUser) {
//     email_error.style.display = "none";
//     password_error.style.display = "none";
//      inputEmail.style.border = "2px solid green";
//      inputPassword.style.border = "2px solid green";
//      window.location.href = "home.html"; // Redirect to index.html after 1.5 seconds
//     } else {
//      e.preventDefault(); // Prevent form submission
   
//         if(inputEmail.value.length === 0 ) {
//        // e.preventDefault(); // Prevent form submission
//             inputEmail.style.border = "2px solid red";
//             email_error.textContent = "Email cannot be empty.";
//             email_error.style.display = "block";
    
//       }
//       if (inputPassword.value.length === 0) {
//        // e.preventDefault(); // Prevent form submission
//             console.log("Password is empty");
//             inputPassword.style.border = "2px solid red";
//             password_error.textContent = "Password cannot be empty.";
//             password_error.style.display = "block";
        
//     } 
//     else if (inputEmail.value.trim() !== savedEmail || inputPassword.value.trim() !== savedPassword) {
//       //  e.preventDefault(); // Prevent form submission
//         console.log("Invalid email or password");
//         inputEmail.style.border = "2px solid red";
//         email_error.textContent = "Invalid email or password.";
//         email_error.style.display = "block";
//         inputPassword.style.border = "2px solid red";
//         password_error.textContent = "Invalid email or password.";
//         password_error.style.display = "block";
//     }
// }
// });