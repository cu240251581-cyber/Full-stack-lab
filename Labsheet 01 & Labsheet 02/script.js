const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 2499,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 3999,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        name: "Running Shoes",
        price: 2999,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        name: "Digital Camera",
        price: 8999,
        image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        name: "Premium Camera",
        price: 12999,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        name: "Gaming Accessories",
        price: 4499,
        image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 7,
        name: "Smartphone",
        price: 24999,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 8,
        name: "Laptop",
        price: 54999,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80"
    }
];

let cart = JSON.parse(localStorage.getItem("yourStoreCart")) || [];

function saveCart() {
    localStorage.setItem("yourStoreCart", JSON.stringify(cart));
}

function updateCartCount() {

    const cartCount = document.querySelector("#cart-count");

    if (!cartCount) {
        return;
    }

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCount.textContent = totalItems;
}

function addToCart(productId) {

    const product = products.find(
        item => item.id === productId
    );

    if (!product) {
        return;
    }

    const existingProduct = cart.find(
        item => item.id === productId
    );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });

    }

    saveCart();
    updateCartCount();

    showMessage(`${product.name} added to cart!`);
}

function showMessage(message) {

    let messageBox = document.querySelector("#js-message");

    if (!messageBox) {

        messageBox = document.createElement("div");

        messageBox.id = "js-message";

        document.body.appendChild(messageBox);

        messageBox.style.position = "fixed";
        messageBox.style.bottom = "25px";
        messageBox.style.right = "25px";
        messageBox.style.background = "#2563eb";
        messageBox.style.color = "#fff";
        messageBox.style.padding = "14px 20px";
        messageBox.style.borderRadius = "8px";
        messageBox.style.zIndex = "9999";
        messageBox.style.boxShadow = "0 5px 20px rgba(0,0,0,0.2)";
    }

    messageBox.textContent = message;

    setTimeout(() => {
        messageBox.textContent = "";
    }, 2000);
}

function renderProducts() {

    const productContainer =
        document.querySelector("#product-container");

    if (!productContainer) {
        return;
    }

    productContainer.innerHTML = "";

    products.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <img 
                src="${product.image}" 
                alt="${product.name}"
            >

            <div class="product-info">

                <h3>${product.name}</h3>

                <p>
                    Premium quality ${product.name}
                    available at YourStore.
                </p>

                <p class="price">
                    ₹${product.price.toLocaleString("en-IN")}
                </p>

                <a 
                    href="product-detail.html?id=${product.id}"
                    class="btn"
                >
                    View Details
                </a>

                <button 
                    class="btn secondary-btn add-cart-btn"
                    data-id="${product.id}"
                >
                    Add to Cart
                </button>

            </div>
        `;

        productContainer.appendChild(card);
    });


    /* Add click event to every Add to Cart button */

    const addButtons =
        document.querySelectorAll(".add-cart-btn");

    addButtons.forEach(button => {

        button.addEventListener("click", () => {

            const productId =
                Number(button.dataset.id);

            addToCart(productId);

        });

    });
}

function renderFeaturedProducts() {

    const featuredContainer =
        document.querySelector("#featured-products");

    if (!featuredContainer) {
        return;
    }

    featuredContainer.innerHTML = "";


    // First 4 products will be featured

    const featuredProducts =
        products.slice(0, 4);


    featuredProducts.forEach(product => {

        const card =
            document.createElement("div");

        card.className =
            "product-card";


        card.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >


            <div class="product-info">

                <h3>
                    ${product.name}
                </h3>


                <p>
                    Premium quality
                    ${product.name}
                    available at YourStore.
                </p>


                <p class="price">
                    ₹${product.price.toLocaleString("en-IN")}
                </p>


                <a
                    href="product-detail.html?id=${product.id}"
                    class="btn">
                    View Product
                </a>


                <button
                    class="btn secondary-btn add-cart-btn"
                    data-id="${product.id}">

                    Add to Cart

                </button>

            </div>

        `;


        featuredContainer.appendChild(card);

    });


    /*
        Add to Cart buttons
    */

    const addButtons =
        featuredContainer.querySelectorAll(
            ".add-cart-btn"
        );


    addButtons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const productId =
                    Number(
                        button.dataset.id
                    );

                addToCart(productId);

            }
        );

    });

}


/* =========================================
   CART PAGE
========================================= */

function renderCart() {

    const cartContainer =
        document.querySelector("#cart-container");

    if (!cartContainer) {
        return;
    }

    cartContainer.innerHTML = "";

    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <div class="empty-cart">
                <h2>Your cart is empty</h2>

                <p>
                    Add some products to your cart.
                </p>

                <br>

                <a 
                    href="products.html" 
                    class="btn"
                >
                    Continue Shopping
                </a>
            </div>
        `;

        calculateTotal();

        return;
    }


    const table = document.createElement("table");

    table.className = "cart-table";

    table.innerHTML = `
        <thead>
            <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotal</th>
                <th>Action</th>
            </tr>
        </thead>

        <tbody id="cart-items"></tbody>

        <tfoot>
            <tr>
                <td colspan="3">
                    <strong>Grand Total</strong>
                </td>

                <td colspan="2">
                    <strong id="grand-total">
                        ₹0
                    </strong>
                </td>
            </tr>
        </tfoot>
    `;

    cartContainer.appendChild(table);


    const cartItems =
        document.querySelector("#cart-items");


    cart.forEach(item => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                <div class="cart-product">
                    <img 
                        src="${item.image}"
                        alt="${item.name}"
                        width="70"
                    >

                    <span>${item.name}</span>
                </div>
            </td>

            <td>
                <input
                    type="number"
                    class="quantity-input"
                    value="${item.quantity}"
                    min="1"
                    data-id="${item.id}"
                >
            </td>

            <td>
                ₹${item.price.toLocaleString("en-IN")}
            </td>

            <td>
                ₹${(
                    item.price * item.quantity
                ).toLocaleString("en-IN")}
            </td>

            <td>
                <button
                    class="btn remove-btn"
                    data-id="${item.id}"
                >
                    Remove
                </button>
            </td>
        `;

        cartItems.appendChild(row);
    });


    /* Quantity change */

    const quantityInputs =
        document.querySelectorAll(".quantity-input");

    quantityInputs.forEach(input => {

        input.addEventListener("change", () => {

            const productId =
                Number(input.dataset.id);

            let newQuantity =
                parseInt(input.value);

            if (newQuantity < 1 || isNaN(newQuantity)) {
                newQuantity = 1;
                input.value = 1;
            }

            const item =
                cart.find(item => item.id === productId);

            if (item) {
                item.quantity = newQuantity;
            }

            saveCart();

            renderCart();

            updateCartCount();
        });
    });


    /* Remove product */

    const removeButtons =
        document.querySelectorAll(".remove-btn");

    removeButtons.forEach(button => {

        button.addEventListener("click", () => {

            const productId =
                Number(button.dataset.id);

            cart = cart.filter(
                item => item.id !== productId
            );

            saveCart();

            renderCart();

            updateCartCount();
        });
    });


    calculateTotal();
}


/* =========================================
   CALCULATE TOTAL
========================================= */

function calculateTotal() {

    const totalElement =
        document.querySelector("#grand-total");

    if (!totalElement) {
        return;
    }

    const total = cart.reduce(
        (sum, item) => {
            return sum + item.price * item.quantity;
        },
        0
    );

    totalElement.textContent =
        `₹${total.toLocaleString("en-IN")}`;
}


/* =========================================
   CHECKOUT VALIDATION
========================================= */

function setupCheckout() {

    const checkoutForm =
        document.querySelector("#checkout-form");

    if (!checkoutForm) {
        return;
    }


    checkoutForm.addEventListener("submit", function (event) {

        event.preventDefault();


        /* Remove old errors */

        document
            .querySelectorAll(".error-message")
            .forEach(error => error.remove());


        let isValid = true;


        const name =
            document.querySelector("#name");

        const address =
            document.querySelector("#address");

        const city =
            document.querySelector("#city");

        const pincode =
            document.querySelector("#pincode");

        const phone =
            document.querySelector("#phone");


        /* Name validation */

        if (name.value.trim() === "") {

            showError(
                name,
                "Name is required."
            );

            isValid = false;
        }


        /* Address validation */

        if (address.value.trim() === "") {

            showError(
                address,
                "Address is required."
            );

            isValid = false;
        }


        /* City validation */

        if (city && city.value.trim() === "") {

            showError(
                city,
                "City is required."
            );

            isValid = false;
        }


        /* Pincode validation */

        if (!/^\d{6}$/.test(pincode.value.trim())) {

            showError(
                pincode,
                "Pincode must be exactly 6 digits."
            );

            isValid = false;
        }


        /* Phone validation */

        if (!/^\d{10}$/.test(phone.value.trim())) {

            showError(
                phone,
                "Phone must be exactly 10 digits."
            );

            isValid = false;
        }


        /* Payment validation */

        const payment =
            document.querySelector(
                'input[name="payment"]:checked'
            );

        if (!payment) {

            const paymentOptions =
                document.querySelector(".payment-options");

            showError(
                paymentOptions,
                "Please select a payment method."
            );

            isValid = false;
        }


        /* Successful validation */

        if (isValid) {

            localStorage.removeItem("yourStoreCart");

            cart = [];

            checkoutForm.reset();

            updateCartCount();

            const confirmation =
                document.querySelector("#confirmation");

            confirmation.textContent =
                "Order placed successfully! Thank you for shopping with YourStore.";

            confirmation.style.display = "block";

            confirmation.style.padding = "15px";

            confirmation.style.marginTop = "20px";

            confirmation.style.borderRadius = "8px";

            confirmation.style.background = "#dcfce7";

            confirmation.style.color = "#166534";
        }

    });
}


/* =========================================
   INLINE ERROR MESSAGE
========================================= */

function showError(element, message) {

    const error =
        document.createElement("small");

    error.className = "error-message";

    error.textContent = message;

    error.style.display = "block";

    error.style.color = "#dc2626";

    error.style.marginTop = "5px";

    element.parentNode.appendChild(error);
}


/* =========================================
   PAGE LOAD
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    updateCartCount();

    renderProducts();

    renderCart();

    setupCheckout();
});

/* =========================================
   PRODUCT DETAIL PAGE
========================================= */

function renderProductDetail() {

    const detailName =
        document.querySelector("#detail-name");

    // Product detail page nahi hai
    if (!detailName) {
        return;
    }


    /*
        URL se product ID get karo

        Example:
        product-detail.html?id=3
    */

    const params =
        new URLSearchParams(window.location.search);

    const productId =
        Number(params.get("id"));


    console.log("Product ID:", productId);


    /*
        Product array me product find karo
    */

    const product =
        products.find(
            item => item.id === productId
        );


    /*
        Product nahi mila
    */

    if (!product) {

        document.querySelector("#detail-name").textContent =
            "Product Not Found";

        document.querySelector("#detail-price").textContent =
            "";

        document.querySelector("#detail-description").textContent =
            "Please go back to the Products page and select a product.";

        document.querySelector("#detail-image").src =
            "";

        return;
    }


    /*
        PRODUCT DATA DISPLAY
    */

    document.querySelector("#detail-image").src =
        product.image;

    document.querySelector("#detail-image").alt =
        product.name;


    document.querySelector("#detail-name").textContent =
        product.name;


    document.querySelector("#detail-price").textContent =
        `₹${product.price.toLocaleString("en-IN")}`;


    document.querySelector("#detail-description").textContent =
        `Experience premium quality with our ${product.name}. 
        This product is carefully selected for quality, 
        performance and everyday use.`;


    /*
        ADD TO CART BUTTON
    */

    const addButton =
        document.querySelector("#detail-add-cart");


    addButton.addEventListener("click", function () {

        const quantity =
            Number(
                document.querySelector("#quantity").value
            );


        /*
            Check if product already exists
        */

        const existingProduct =
            cart.find(
                item => item.id === product.id
            );


        if (existingProduct) {

            existingProduct.quantity += quantity;

        } else {

            cart.push({

                id: product.id,

                name: product.name,

                price: product.price,

                image: product.image,

                quantity: quantity

            });

        }


        /*
            Save cart
        */

        saveCart();


        /*
            Update navbar count
        */

        updateCartCount();


        /*
            Success message
        */

        showMessage(
            `${product.name} added to cart!`
        );

    });
}
document.addEventListener("DOMContentLoaded", () => {

    updateCartCount();

    renderProducts();

    renderCart();

    renderFeaturedProducts();

    setupCheckout();

    renderProductDetail();

});