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
  

const cartSummary = document.getElementById('cartSummary');
const checkoutForm = document.getElementById('checkoutForm');
const orderMessage = document.getElementById('orderMessage');
document.getElementById("backhome").addEventListener("click", function() {
    window.location.href = "home.html"; // Redirect to home page
  });
function renderCart() {  
    const username = JSON.parse(localStorage.getItem("currentUser"));
    const cart = JSON.parse(localStorage.getItem(`cart_${username.name}`)) || [];
    if (cart.length === 0) {
      cartSummary.innerHTML = "<p>Your cart is empty.</p>";
      checkoutForm.style.display = "none";
      return;
    }
  
    let total = 0;
    cartSummary.innerHTML = cart.map(item => {
      const quantity = item.quantity || 1;
      total += item.price * quantity;
      return `
        <div style="border-bottom:1px solid #ccc; margin-bottom:10px; padding:5px">
          <img src="${item.image}" style="width:60px; vertical-align:middle;">
          <strong>${item.name}</strong> - EGP ${item.price} × ${quantity}
        </div>
      `;
    }).join('');
  
    updateTotals(total);
  }
  
  function getShippingFee(city) {
    switch (city) {
      case "cairo": return 30;
      case "giza": return 40;
      case "alex": return 60;
      default: return 70; // Default shipping fee
    }
  }
  
  function updateTotals(subtotal) {
    const city = document.getElementById("city").value;
    const shipping = getShippingFee(city);
    const grandTotal = subtotal + shipping;
  
    document.getElementById("totals").innerHTML = `
      <p><strong>Subtotal: EGP ${subtotal}</strong></p>
      <p><strong>Shipping: EGP ${shipping}</strong></p>
      <p><strong>Total: EGP ${grandTotal}</strong></p>
    `;
  }
  
  document.getElementById("city").addEventListener("change", () => {
    const username = JSON.parse(localStorage.getItem("currentUser"));
    const cart = JSON.parse(localStorage.getItem(`cart_${username.name}`)) || [];
    let subtotal = 0;
    cart.forEach(item => {
      const quantity = item.quantity || 1;
      subtotal += item.price * quantity;
    });
    updateTotals(subtotal);
  });
  
  renderCart();



  checkoutForm.addEventListener("submit", function (e) {
    e.preventDefault(); // prevent reload
  
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const city = document.getElementById("city").value;
  
    if (!name || !phone || !city) {
      alert("Please complete all fields.");
      return;
    }
  
    // Simulate order submission
    alert(`Thank you, ${name}! Your order has been received.`);
  
    // Clear cart
    localStorage.removeItem(`cart_${JSON.parse(localStorage.getItem("currentUser")).name}`);
  
    // Optional: redirect after 2 seconds
    setTimeout(() => {
      window.location.href = "home.html"; // change to your homepage
    }, 2000);
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
