const cartIcons = document.querySelectorAll(".cart");
const cartDrawer = document.getElementById("cartDrawer");
const closeDrawerBtn = document.getElementById("closeDrawerBtn");
const backdrop = document.getElementById("backdrop");

const counterValue = document.getElementById("counterValue");
const incrementBtn = document.getElementById("incrementBtn");
const decrementBtn = document.getElementById("decrementBtn");
const addToCartBtn = document.getElementById("addToCart");

const productPrice = document.getElementById("productPrice");
const productPriceValue = parseFloat(productPrice.textContent.replace("$", ""));
const productImage = document.getElementById("productImage");

let counter = 1;

incrementBtn.addEventListener("click", () => {
  counter++;
  counterValue.textContent = counter;
  const totalPrice = (counter * parseFloat(productPriceValue)).toFixed(2);
  productPrice.textContent = `$${totalPrice}`;
});

decrementBtn.addEventListener("click", () => {
  if (counter > 1) {
    counter--;
    counterValue.textContent = counter;
    const totalPrice = (counter * parseFloat(productPriceValue)).toFixed(2);
    productPrice.textContent = `$${totalPrice}`;
  }
});

function loadCartInfoOnPage() {
  const counterValue = document.getElementById("counterValue");
  const productPrice = document.getElementById("productPrice");

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find((item) => item.title === "Helio Pet Device™");

  if (existingItem) {
    counterValue.textContent = existingItem.quantity;
    productPrice.textContent = `$${(
      existingItem.unitPrice * existingItem.quantity
    ).toFixed(2)}`;
  } else {
    counterValue.textContent = 1;
    productPrice.textContent = "$249.00";
  }
}

addToCartBtn.addEventListener("click", () => {
  const productTitle = "Helio Pet Device™";
  const productImageSrc = productImage.src;
  const quantity = counter;
  const unitPrice = productPriceValue;
  const totalPrice = (quantity * unitPrice).toFixed(2);

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItemIndex = cart.findIndex(
    (item) => item.title === productTitle
  );

  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity += quantity;
    cart[existingItemIndex].price = (
      cart[existingItemIndex].quantity * unitPrice
    ).toFixed(2);
  } else {
    const cartItem = {
      id: Date.now(),
      title: productTitle,
      price: totalPrice,
      unitPrice: unitPrice,
      image: productImageSrc,
      quantity: quantity,
    };
    cart.push(cartItem);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  console.log("cart", cart);
});

function renderCartProducts() {
  const cartItemsContainer = document.getElementById("cartItemsContainer");
  const cartTotal = document.getElementById("cartTotal");

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
        <p class="empty-message">Your cart is empty</p>
        <button class="continue-shopping-btn">Continue Shopping</button>
      `;

    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += parseFloat(item.unitPrice) * parseInt(item.quantity);

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="cart-item-image" />
        <div class="cart-item-details">
          <h4>${item.title}</h4>
          <p>Price: $${(item.unitPrice * item.quantity).toFixed(2)}</p>
          <div class="cart-item-quantity">
            <button class="decrease-qty" data-index="${index}">-</button>
            <span class="quantity">${item.quantity}</span>
            <button class="increase-qty" data-index="${index}">+</button>
          </div>
          <button class="remove-item" data-index="${index}">Remove</button>
        </div>
      `;

    cartItemsContainer.appendChild(cartItem);
  });

  cartTotal.textContent = `Total Price:$${total.toFixed(2)}`;

  activateCartItemButtons(); // Attach button listeners after rendering
}

function activateCartItemButtons() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const decreaseQtyButtons = document.querySelectorAll(".decrease-qty");
  const increaseQtyButtons = document.querySelectorAll(".increase-qty");
  const removeItemButtons = document.querySelectorAll(".remove-item");

  decreaseQtyButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCartProducts();
      }
    });
  });

  increaseQtyButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      cart[index].quantity++;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCartProducts();
    });
  });

  removeItemButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCartProducts();
    });
  });
}

cartIcons.forEach((cartIcon) => {
  cartIcon.addEventListener("click", () => {
    cartDrawer.classList.add("open");
    backdrop.classList.add("show");
    renderCartProducts();
  });
});

closeDrawerBtn.addEventListener("click", () => {
  cartDrawer.classList.remove("open");
  backdrop.classList.remove("show");
});

backdrop.addEventListener("click", () => {
  cartDrawer.classList.remove("open");
  backdrop.classList.remove("show");
});

loadCartInfoOnPage();
