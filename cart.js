const cartIcon = document.querySelector(".cart");
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

cartIcon.addEventListener("click", () => {
  cartDrawer.classList.add("open");
  backdrop.classList.add("show");
});

closeDrawerBtn.addEventListener("click", () => {
  cartDrawer.classList.remove("open");
  backdrop.classList.remove("show");
});

backdrop.addEventListener("click", () => {
  cartDrawer.classList.remove("open");
  backdrop.classList.remove("show");
});
