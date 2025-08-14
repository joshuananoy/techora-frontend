// SAMPLE PRODUCTS
let cart = [
    { name: "Premium Wireless Headphones", price: 299, qty: 1, details: "Matte Black - Standard" },
    { name: "Watch", price: 1199, qty: 2, details: "42mm" },
    { name: "Portable Bluetooth Speaker", price: 1149, qty: 1, details: "Charcoal - Medium" }
];

// Render Cart
function renderCart() {
    let cartHTML = "";
    let subtotal = 0;
    cart.forEach((item, index) => {
        subtotal += item.price * item.qty;
        cartHTML += `
        <div class="border rounded p-3 mb-3 bg-white">
            <div class="d-flex justify-content-between">
                <div>
                    <strong>${item.name}</strong>
                    <div class="small text-muted">${item.details}</div>
                    <div class="mt-2">
                        <button class="btn btn-outline-secondary btn-sm" onclick="changeQty(${index}, -1)">-</button>
                        <span class="mx-2">${item.qty}</span>
                        <button class="btn btn-outline-secondary btn-sm" onclick="changeQty(${index}, 1)">+</button>
                        <button class="btn btn-sm btn-danger ms-3" onclick="removeItem(${index})">x</button>
                    </div>
                </div>
                <div class="text-end">
                    <div class="small text-muted">₱${item.price} each</div>
                    <div class="fw-bold">₱${item.price * item.qty}</div>
                </div>
            </div>
        </div>`;
    });
    document.getElementById("cart-items").innerHTML = cartHTML;
    document.getElementById("cart-count").innerText = `${cart.length} items in your cart`;
    document.getElementById("subtotal").innerText = `₱${subtotal}`;
    let tax = Math.round(subtotal * 0.08);
    document.getElementById("tax").innerText = `₱${tax}`;
    document.getElementById("total").innerText = `₱${subtotal + tax}`;
}

// Change Quantity
function changeQty(index, amount) {
    cart[index].qty += amount;
    if (cart[index].qty < 1) cart[index].qty = 1;
    renderCart();
}

// Remove Item
function removeItem(index) {
    cart.splice(index, 1);
    renderCart();
}

// Empty Cart
function clearCart() {
    cart = [];
    renderCart();
}

// Checkout Modal
function goToCheckout() {
    document.getElementById("step1").style.display = "block";
    document.getElementById("step2").style.display = "none";
    document.getElementById("step3").style.display = "none";
    new bootstrap.Modal(document.getElementById('checkoutModal')).show();
}

// Step Navigation
function nextStep(step) {
    document.getElementById("step1").style.display = step === 1 ? "block" : "none";
    document.getElementById("step2").style.display = step === 2 ? "block" : "none";
    document.getElementById("step3").style.display = step === 3 ? "block" : "none";

    if (step === 3) {
        document.getElementById("review-items").innerHTML = cart.map(item =>
            `<p>${item.name} (${item.qty}) - ₱${item.price * item.qty}</p>`
        ).join("");
    }
}

// Place Order
function placeOrder() {
    alert("Order placed successfully! (Simulated Payment)");
    clearCart();
    bootstrap.Modal.getInstance(document.getElementById('checkoutModal')).hide();
}

// Initial Render
renderCart();
