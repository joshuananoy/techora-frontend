document.addEventListener("DOMContentLoaded", () => {
  const products = document.querySelectorAll(".product-card");
  const categoryFilter = document.getElementById("category");
  const priceMin = document.getElementById("price-min");
  const priceMax = document.getElementById("price-max");
  const sizeFilter = document.getElementById("size");
  const colorFilter = document.getElementById("color");
  const sortFilter = document.getElementById("sort");
  const searchInput = document.getElementById("search");
  const applyBtn = document.querySelector(".apply-filter");
  const shopProducts = document.querySelector(".shop-products");

  function filterProducts() {
    let min = priceMin.value ? parseInt(priceMin.value) : 0;
    let max = priceMax.value ? parseInt(priceMax.value) : Infinity;
    let searchText = searchInput.value.toLowerCase();

    products.forEach(product => {
      const category = product.getAttribute("data-category");
      const price = parseInt(product.getAttribute("data-price"));
      const name = product.querySelector("h3").textContent.toLowerCase();

      let match = true;

      // Category filter
      if (categoryFilter.value !== "all" && category !== categoryFilter.value) {
        match = false;
      }

      // Price filter
      if (price < min || price > max) {
        match = false;
      }

      // Search filter
      if (!name.includes(searchText)) {
        match = false;
      }

      // (Optional) size & color filters – placeholder
      // if (sizeFilter.value !== "all" && product.getAttribute("data-size") !== sizeFilter.value) match = false;
      // if (colorFilter.value !== "all" && product.getAttribute("data-color") !== colorFilter.value) match = false;

      // Show/hide product
      product.style.display = match ? "flex" : "none";
    });
  }

  function sortProducts() {
    let sortedProducts = Array.from(products);

    switch (sortFilter.value) {
      case "price-low-high":
        sortedProducts.sort((a, b) => parseInt(a.dataset.price) - parseInt(b.dataset.price));
        break;
      case "price-high-low":
        sortedProducts.sort((a, b) => parseInt(b.dataset.price) - parseInt(a.dataset.price));
        break;
      case "name":
        sortedProducts.sort((a, b) => 
          a.querySelector("h3").textContent.localeCompare(b.querySelector("h3").textContent)
        );
        break;
      case "popularity":
        // For now just random sort (you can add a real popularity metric)
        sortedProducts.sort(() => Math.random() - 0.5);
        break;
      case "newness":
        // Assuming last products in HTML are the newest
        sortedProducts.reverse();
        break;
      default:
        break;
    }

    // Re-append products in sorted order
    shopProducts.innerHTML = "";
    sortedProducts.forEach(p => shopProducts.appendChild(p));
  }

  // Apply button event
  applyBtn.addEventListener("click", () => {
    filterProducts();
    sortProducts();
  });

  // Live search
  searchInput.addEventListener("input", filterProducts);
});
