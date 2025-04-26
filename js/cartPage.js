document.addEventListener('DOMContentLoaded', function() {
    let usernameSpan = document.getElementById("username");
    let storedUser = JSON.parse(localStorage.getItem("currentUser"));
    
    if (!storedUser) {
        window.location.href = "login.html";
        return;
    }
  
    updateCartCount();
  
    let username = storedUser.name ? storedUser.name : usernameSpan.innerHTML;
    usernameSpan.textContent = username[0].toUpperCase() + username.slice(1).toLowerCase();
    usernameSpan.style.display = "inline-block";
  });
  
  // Function to update the cart count
  function updateCartCount() {
    const username = JSON.parse(localStorage.getItem("currentUser")).name;
  const cart = JSON.parse(localStorage.getItem(`cart_${username}`)) || [];
    const cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0); // Calculate total quantity
    document.getElementById('cartCount').textContent = cartCount; // Update the count in the icon
  }
  document.addEventListener('DOMContentLoaded', () => {
       updateCartCount(); // Update cart count when page loads
     });
    

document.getElementById("backhome").addEventListener("click", function() {
    window.location.href = "home.html"; // Redirect to home page
  });

document.getElementById("checkoutButton").addEventListener("click", function() {  
    window.location.href = "checkout.html"; // Redirect to checkout page
  });

  function displayCart() {
    let username = JSON.parse(localStorage.getItem("currentUser"));
    if (!username) {
        alert("Please log in to view your cart.");
        window.location.href = "login.html"; 
        return;
    }
      // Load cart items from localStorage and display them

    const cart = JSON.parse(localStorage.getItem(`cart_${username.name}`)) || [];
    const cartContainer = document.getElementById('cartItems');
    cartContainer.innerHTML = ''; 

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.setAttribute('data-id', item.id);

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" />
                <h3>${item.name}</h3>
                <p>Price: EGP ${item.price}</p>
                <span class="total-price">Total: EGP <span id="total-${item.id}">${item.price * (item.quantity || 1)}</span></span>
                <span class="color">Color: ${item.color}</span>
                <div class="quantity-controls">
                    <button class="quantity-btn" data-action="increase" data-id="${item.id}">+</button>
                    <span id="quantity-${item.id}">${item.quantity || 1}</span>
                    <button class="quantity-btn" data-action="decrease" data-id="${item.id}">-</button>
                </div>
                <button class="removeFromCart" data-id="${item.id}">Remove</button>
            `;

            cartContainer.appendChild(cartItem);
        });

        // Event listeners for + and - buttons
        const quantityButtons = document.querySelectorAll('.quantity-btn');
        quantityButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                const action = e.target.dataset.action;
                updateQuantity(id, action);
            });
        });

        // Event listeners for remove buttons
        const removeButtons = document.querySelectorAll('.removeFromCart');
        removeButtons.forEach(button => {
            button.addEventListener('click', () => removeFromCart(button.dataset.id));
        });
    }
}

// Update quantity function
function updateQuantity(id, action) {
    let username = JSON.parse(localStorage.getItem("currentUser"));
    const cartKey = `cart_${username.name}`;
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const itemIndex = cart.findIndex(item => item.id == id);
    if (itemIndex > -1) {
        if (action === 'increase') {
            cart[itemIndex].quantity = (cart[itemIndex].quantity || 1) + 1;
        } else if (action === 'decrease') {
            if ((cart[itemIndex].quantity || 1) > 1) {
                cart[itemIndex].quantity -= 1;
            }
        }

        localStorage.setItem(cartKey, JSON.stringify(cart));

        // Update quantity span
        document.getElementById(`quantity-${id}`).innerText = cart[itemIndex].quantity;

        // Update total price
        document.getElementById(`total-${id}`).innerText = cart[itemIndex].price * cart[itemIndex].quantity;
    }
}

// Remove item from cart
function removeFromCart(id) {
    let username = JSON.parse(localStorage.getItem("currentUser"));
    const cartKey = `cart_${username.name}`;
    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    cart = cart.filter(item => item.id != id);

    localStorage.setItem(cartKey, JSON.stringify(cart));

    displayCart(); // Reload cart display
}


// Display the cart when the page loads
document.addEventListener('DOMContentLoaded', () => {
    displayCart();
});



//to scroll to top button
window.onscroll = function() {
    const scrollBtn = document.getElementById("scrollToTopBtn");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
};

document.getElementById('scrollToTopBtn').addEventListener('click', function() {
    window.scrollTo({top: 0, behavior: 'smooth'});
});

//spinner
window.onload = function() {
    const spinner = document.getElementById('spinner-container');
    
    // Hide the spinner after 1.5 seconds
    setTimeout(function() {
        spinner.style.display = 'none';
    }, 1500); // 1500 milliseconds = 1.5 seconds
};

