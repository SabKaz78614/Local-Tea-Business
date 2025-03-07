document.addEventListener("DOMContentLoaded", function () {
    updateCartDisplay(); // When the page loads, it updates the cart display and adds click events to all "Add to Cart" buttons. Ensures that if a user refreshes the page, previously added cart items are still shown.

    // Add event listeners to "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll(".content a");
    addToCartButtons.forEach(button => {  // loops through every "add to cart" button
        button.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default link behavior. Makes sure clicking the button only adds the item to the cart instead of opening a link.
            const productBox = this.closest(".box"); // helps get details (name, price, image) for the specific product being clicked.
            // The closest() method finds the nearest ancestor that matches the given selector. When clicking "add to cart," gets details of the specific product related to that button.
            const productName = productBox.querySelector("h3").innerText; // whatever h3 is called will be stored as a variable in productName
            const productPrice = parseFloat(productBox.querySelector("span").innerText.replace("£", "")); // parseFloat converts price from a string into a number which can then be used for calculations.
            const productImage = productBox.querySelector("img").src; // img is shown for the product selected when on the cart page.

            addToCart(productName, productPrice, productImage); // when the "add to cart" button is clicked on the cart page, the img, product name, and price will be shown.
        });
    });

    // Order Now button event listener
    document.getElementById("order-now").addEventListener("click", function () {
        var cart = localStorage.getItem("cart"); // gets the "cart" data from your browser’s storage and saves it into a variable called cart.
        // looks at local storage to save and retrieve information even after the page is refreshed or the browser is closed and reopened.
        if (!cart || cart === "[]") {
            alert("Your cart is empty. Please add items.");
        } else {
            var proceed = confirm("Proceed to checkout?");
            if (proceed) {
                localStorage.removeItem("cart");
                updateCartDisplay();
                alert("Thank you for your order!");
            }
        }
    });
});

// Function to add item to cart
function addToCart(name, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingItem = cart.find(item => item.name === name); // looks through the cart array and tries to find an item where the name matches the name passed to the function.
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, image, quantity: 1 }); // (if the item is not already in the cart). It adds a new item to the cart with the name, price, image, and sets the quantity to 1.
    }

    localStorage.setItem("cart", JSON.stringify(cart)); // saves the cart data under the key "cart" in the browser storage. Converts the cart array back into a string so it can be saved in the browser's storage.
    updateCartDisplay();
    updateCartIconCount(); // Update the cart icon count after adding an item
}

// Function to update cart display
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalPrice = document.getElementById("cart-total-price");

    if (!cartItemsContainer || !cartTotalPrice) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartItemsContainer.innerHTML = "";
    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;

        const cartItem = document.createElement("div"); // creates a new div for one item in cart
        cartItem.classList.add("cart-item"); // adds to new div which can be used for styling
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>Price: £${item.price.toFixed(2)}</p>
                <p>Quantity: <button class="decrease">-</button> ${item.quantity} <button class="increase">+</button></p>
                <button class="remove-item">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem); // adds the newly created cartItem (which includes all the HTML content for one cart item) to the cartItemsContainer (this is a section of the page where the cart items are displayed).

        // Event Listeners for Quantity Change
        cartItem.querySelector(".increase").addEventListener("click", () => changeQuantity(item.name, 1));
        cartItem.querySelector(".decrease").addEventListener("click", () => changeQuantity(item.name, -1));
        cartItem.querySelector(".remove-item").addEventListener("click", () => removeFromCart(item.name));
    });

    cartTotalPrice.innerText = `£${totalPrice.toFixed(2)}`;
}

// Function to change quantity
function changeQuantity(name, change) {  // name of the item you want to change (passed when the button is clicked) and amount to increase or decrease the quantity by.
    let cart = JSON.parse(localStorage.getItem("cart")) || []; // JSON.parse converts the stored cart data back into its original form
    let item = cart.find(i => i.name === name); // searches through the cart to find the item that matches the name you passed to the function.

    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.name !== name); // filter method creates a new array without the item that has the same name as the one we just adjusted
        }
        localStorage.setItem("cart", JSON.stringify(cart)); // turn cart back into a string and save updated cart in localStorage.
        updateCartDisplay();
        updateCartIconCount(); // Update cart icon count after quantity change
    }
}

// Function to remove item from the cart
function removeFromCart(name) {
    let cart = JSON.parse(localStorage.getItem("cart")) || []; // Get cart from localStorage

    // Remove the item from the cart array
    cart = cart.filter(item => item.name !== name); // Remove the item with the matching name

    localStorage.setItem("cart", JSON.stringify(cart)); // Save the updated cart to localStorage
    updateCartDisplay(); // Update the cart display after removal
    updateCartIconCount(); // Update the cart icon count after removal
}

// CART ICON UPDATE COUNT BASED ON NAME

// Function to update the cart icon count
function updateCartIconCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || []; // Get cart from localStorage
    const cartItemCountMain = document.getElementById("cart-item-count-main"); // Main navbar cart icon
    const cartItemCountSidebar = document.getElementById("cart-item-count-sidebar"); // Sidebar cart icon

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0); // Calculate total quantity of items

    if (cartItemCountMain) {
        cartItemCountMain.innerText = totalItems; // Update cart count in main navbar
    }
    
    if (cartItemCountSidebar) {
        cartItemCountSidebar.innerText = totalItems; // Update cart count in sidebar
    }
}

// Update cart count when the page loads
document.addEventListener("DOMContentLoaded", function () {
    updateCartIconCount(); // Update the cart count when the page is loaded
});
