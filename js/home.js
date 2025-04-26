// onload = function() {
//   let usernameSpan = document.getElementById("username");
//   let storedUser = JSON.parse(localStorage.getItem("currentUser"));
//   updateCartCount();
//   if (!storedUser) {
//       window.location.href = "login.html";
//   const storedUserJSON = localStorage.getItem("currentUser");
//   if (!storedUserJSON) {
//     console.warn("No current user found in localStorage.");
//         return;
//   }

// };
  
// let username = storedUser.name ? storedUser.name : usernameSpan.innerHTML;
// usernameSpan.textContent =   username[0].toUpperCase() + username.slice(1).toLowerCase();
// usernameSpan.style.display = "inline-block";


// }
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
  
let images = [
  "/images/1.jpg",
  "/images/2.jpg",
  "/images/3.jpg",
];

let imgElement = document.getElementById("slider");
let currentIndex = 0;

function changeImage(direction) {
  currentIndex += direction;

  if (currentIndex >= images.length) currentIndex = 0;
  if (currentIndex < 0) currentIndex = images.length - 1;

  imgElement.style.backgroundImage = `url('${images[currentIndex]}')`;
}

var intervalId;
var run = false;

function startSlideshow() {
  if (!run) {
      run = true;
      intervalId = window.setInterval(function() {
          changeImage(1);
      }, 3000);
  }
}
startSlideshow();
///----------------------------


// ---------------
fetch('products.json')
  .then(response => response.json())
  .then(products => {
      const container = document.getElementById('products');
      const detailsContainer = document.getElementById('product-details');
      // Render products
      products.forEach(product => {
        var available_quantity=product.available_quantity;
          const productCard = document.createElement('div');
          productCard.classList.add('product-card');
          productCard.setAttribute('available_quantity',product.available_quantity)
          productCard.setAttribute('id', `product${product.id}`);
          productCard.setAttribute('data-category', product.category);
          productCard.setAttribute('data-gender', product.gender);
          productCard.setAttribute('data-price', product.price);
          productCard.innerHTML = `
              <img src="${product.image}" alt="${product.name}">
              <h2>${product.name}</h2>
              <div class="product-card-info">
                  <p class="price">EGP ${product.price}</p>
                  <button>Add to Cart</button>
              </div>
          `;

          productCard.addEventListener("click", () => {       // Show product details
              container.style.display = "none";
              document.getElementById('title').style.display='none';
              detailsContainer.style.display = "block";
              document.getElementById('filters').style.display = "none";
              updateCartCount(); 
                
                
              detailsContainer.innerHTML = `      
                  <div class="product-card-details">
                      <img src="${product.image}" alt="${product.name}">
                      <h2>${product.name}</h2>
                      <p class="price">EGP ${product.price}</p>
                      <p class="description">${product.description || "No description available."}</p>
                      <label>Select Color:</label>
                      <select id="colorSelect">
                          ${product.available_colors.map(color => `<option value="${color.toLowerCase()}">${color}</option>`).join('')}
                      </select><br>
                      <label>Avialable in store : </label><span id="available_quantity"> ${available_quantity}</span>
                      <br><br>
                      <button id="addToCartButton">Add to Cart</button>
                      <button id="backToProducts">Back to Products</button>
                  </div>
              `;

              document.getElementById('addToCartButton').addEventListener('click', () => {
                  const selectedColor = document.getElementById('colorSelect').value;
                  const username =JSON.parse( localStorage.getItem("currentUser")); 
                
                  let cart = JSON.parse(localStorage.getItem(`cart_${username.name}`)) || [];
                  if(available_quantity<=0)
                  {
                    document.getElementById('addToCartButton').disabled=true;
                    return;
                  }
                  else if (cart.some(item => item.id === product.id && item.color === selectedColor&&available_quantity>0) ){
                    let existingItem = cart.find(item => item.id === product.id && item.color === selectedColor);
                    existingItem.quantity = (existingItem.quantity || 1) + 1; // Increment quantity if already in cart
                    available_quantity-=1;
                    localStorage.setItem('available_quantity',available_quantity)
                    document.getElementById("available_quantity").textContent=available_quantity;
                  }else {
                    available_quantity-=1;
                    localStorage.setItem('available_quantity',available_quantity)
                    document.getElementById("available_quantity").textContent=available_quantity;
                   cart.push({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      color: selectedColor,
                      image: product.image
                  });}

                  localStorage.setItem(`cart_${username.name}`, JSON.stringify(cart));

                  updateCartCount();
                  
                  // Show a message to the user
                  alert("Product added to cart!");

              });

              document.getElementById('backToProducts').addEventListener('click', () => {
                  detailsContainer.style.display = "none";
                  document.getElementById('title').style.display="block";
                  document.getElementById('filters').style.display = "flex";
                  container.style.display = "flex";
                  
              });
          });

          container.appendChild(productCard);
      });

      applyFilters();
  });

// Function to apply filters
function applyFilters() {
  const selectedCategory = categoryFilter.value;
  const selectedGender = genderFilter.value;
  const selectedPrice = priceFilter.value;

  const products = document.querySelectorAll(".product-card");

  products.forEach(product => {
      const category = product.getAttribute("data-category");
      const gender = product.getAttribute("data-gender");
      const price = parseInt(product.getAttribute("data-price"));

      const matchCategory = selectedCategory === "all" || category === selectedCategory;
      const matchGender = selectedGender === "all" || gender === selectedGender;
      let matchPrice = true;

      if (selectedPrice === "low") matchPrice = price < 500;
      else if (selectedPrice === "medium") matchPrice = price >= 500 && price <= 1000;
      else if (selectedPrice === "high") matchPrice = price > 1000;

      if (matchCategory && matchGender && matchPrice) {
          product.style.display = "block";
      } else {
          product.style.display = "none";
      }
  });
}

// Event listeners for filters
categoryFilter.addEventListener("change", applyFilters);
genderFilter.addEventListener("change", applyFilters);
priceFilter.addEventListener("change", applyFilters);


function logout() {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html"; // Redirect to login page
}

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
// Spinner functionality
window.onload = function() {
  const spinner = document.getElementById('spinner-container');
  
  // Hide the spinner after 1.5 seconds
  setTimeout(function() {
      spinner.style.display = 'none';
  }, 1000); 
};
