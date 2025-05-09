const cartIcon = document.querySelector(".cart");
const cartDrawer = document.getElementById("cartDrawer");
const closeDrawerBtn = document.getElementById("closeDrawerBtn");
const backdrop = document.getElementById("backdrop");

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
