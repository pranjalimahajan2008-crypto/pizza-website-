let cart = [];

/* Add product to cart */

function addToCart(name, price) {

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();

    // Open cart after adding
    openCart();
}


/* Add special deal */

function addDeal() {

    const existingItem = cart.find(item => item.name === "2 Medium Pizza Deal");

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: "2 Medium Pizza Deal",
            price: 599,
            quantity: 1
        });
    }

    updateCart();
    openCart();
}


/* Update cart */

function updateCart() {

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty">Your cart is empty.</p>';

    } else {

        cart.forEach((item, index) => {

            total += item.price * item.quantity;
            count += item.quantity;

            const cartItem = document.createElement("div");

            cartItem.className = "cart-item";

            cartItem.innerHTML = `
                <div>
                    <h4>${item.name}</h4>
                    <small>₹${item.price} each</small>
                </div>

                <div class="quantity">

                    <button onclick="decreaseQuantity(${index})">
                        -
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="increaseQuantity(${index})">
                        +
                    </button>

                </div>
            `;

            cartItems.appendChild(cartItem);
        });
    }

    cartCount.textContent = count;
    cartTotal.textContent = total;
}


/* Increase quantity */

function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();
}


/* Decrease quantity */

function decreaseQuantity(index) {

    cart[index].quantity--;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}


/* Open cart */

function openCart() {

    document.getElementById("cart").classList.add("open");
    document.getElementById("overlay").classList.add("show");
}


/* Close cart */

function closeCart() {

    document.getElementById("cart").classList.remove("open");
    document.getElementById("overlay").classList.remove("show");
}


/* Category filtering */

function filterProducts(category, button) {

    const products = document.querySelectorAll(".product");
    const buttons = document.querySelectorAll(".category");

    buttons.forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    products.forEach(product => {

        if (
            category === "all" ||
            product.dataset.category === category
        ) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}


/* Search */

function searchProducts() {

    const searchValue =
        document.getElementById("search").value.toLowerCase();

    const products = document.querySelectorAll(".product");

    products.forEach(product => {

        const name =
            product.dataset.name.toLowerCase();

        if (name.includes(searchValue)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}


/* Checkout */

function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    alert(
        "Order placed successfully! 🍕\n\n" +
        "Total: ₹" + total +
        "\n\nThank you for ordering!"
    );

    cart = [];

    updateCart();
    closeCart();
}


/* Initial cart */

updateCart();
