function addToCart(name, price, image){

    if(localStorage.getItem("loggedIn")!="true"){

        alert("Please sign in to add items to your cart.");

        window.location.href="login.html";

        return;

    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({

        name:name,
        price:price,
        image:image

    });

    localStorage.setItem("cart",JSON.stringify(cart));

    alert(name + " added to cart!");

    updateCartCount();

}

function updateCartCount(){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let count = document.getElementById("cartCount");

    if(count){

        count.innerHTML = cart.length;

    }

}

function toggleCart(){

    let cartBox = document.getElementById("cartBox");

    if(cartBox.style.display=="block"){

        cartBox.style.display="none";

    }

    else{

        cartBox.style.display="block";

        displayCart();

    }

}

function closeCart(){

    let cartBox = document.getElementById("cartBox");

    if(cartBox){

        cartBox.style.display="none";

    }

}

function displayCart(){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let cartItems = document.getElementById("cartItems");

    let totalPrice = document.getElementById("totalPrice");

    if(!cartItems) return;

    cartItems.innerHTML="";

    let total=0;

    cart.forEach(function(item,index){

        total += item.price;

        cartItems.innerHTML += `

        <div class="cart-item">

            <img src="${item.image}" width="70">

            <div>

                <h4>${item.name}</h4>

                <p class="cart-price">₹${item.price}</p>

            </div>

            <button onclick="removeItem(${index})">

                Remove

            </button>

        </div>

        `;

    });

    if(totalPrice){

        totalPrice.innerHTML = total;

    }

}
function removeItem(index){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index,1);

    localStorage.setItem("cart",JSON.stringify(cart));

    updateCartCount();

    displayCart();

    closeCart();

}

function placeOrder(){

    if(localStorage.getItem("loggedIn")!="true"){

        alert("Please sign in to place your order.");

        window.location.href="login.html";

        return;

    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if(cart.length==0){

        alert("Your cart is empty!");

        return;

    }

    alert("Order Placed Successfully!");

    localStorage.removeItem("cart");

    updateCartCount();

    displayCart();

    closeCart();

}

function checkLogin(){

    let loginBtn = document.getElementById("loginBtn");

    let registerBtn = document.getElementById("registerBtn");

    let logoutBtn = document.getElementById("logoutBtn");

    if(localStorage.getItem("loggedIn")=="true"){

        if(loginBtn){

            loginBtn.style.display="none";

        }

        if(registerBtn){

            registerBtn.style.display="none";

        }

        if(logoutBtn){

            logoutBtn.style.display="inline-block";

        }

    }

    else{

        if(loginBtn){

            loginBtn.style.display="inline-block";

        }

        if(registerBtn){

            registerBtn.style.display="inline-block";

        }

        if(logoutBtn){

            logoutBtn.style.display="none";

        }

    }

}

function logout(){

    localStorage.removeItem("loggedIn");

    localStorage.removeItem("username");

    alert("Logged out successfully");

    window.location.href="login.html";

}

function showUser(){

    let username = localStorage.getItem("username");

    let userHello = document.getElementById("userHello");

    if(username && userHello){

        userHello.innerHTML = "👤 Hello, " + username;

    }

}

window.onload = function(){

    checkLogin();

    updateCartCount();

    displayCart();

    showUser();

}