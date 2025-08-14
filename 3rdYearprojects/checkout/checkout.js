document.getElementById("checkoutForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

    if (paymentMethod === "paypal") {
        window.location.href = "https://www.sandbox.paypal.com/checkoutnow?token=TEST123";
    } else if (paymentMethod === "cod") {
        alert("Your order has been placed. Please prepare payment upon delivery.");
    }
});
