let localProducts = [];

fetch("https://finals-backend.herokuapp.com/get-products/")
  .then((response) => response.json())
  .then((json) => {
    localProducts = json.data;
    console.log(localProducts);
    renderproducts(json.data);
  });

function renderproducts(products) {
  let productContainer = document.querySelector("#product-container");
  productContainer.innerHTML = "";

  products.forEach((data) => {
    productContainer.innerHTML += `
    <div class="products" catergory="${data[1]}">
    <img class="product-image items" src="${data[5]}">
        <h2 class="product_name items">${data[1]}</h2>
        <p class="product_description items">${data[2]}</p>
        <h3 class="product_price items">${data[4]}</h3>
        <button class="btn" onclick="addToCart(${data[0]})">Add to cart</button>
    </div>
    `;
  });
}
//filter function
function productFilter(category) {
  let filteredProducts = localProducts.filter((product) =>
    product[1].toLowerCase().includes(category.toLowerCase())
  );
  console.log(filteredProducts);
  renderproducts(filteredProducts);
}

//search function
fetch("https://finals-backend.herokuapp.com/get-products/")
  .then((res) => res.json())
  .then((data) => {
    let filterProducts = data.data;
    let searchBar = document.getElementById("search");
    searchBar.addEventListener("keyup", (a) => {
      const searchText = a.target.value.toLowerCase();
      const filteredProducts = filterProducts.filter((data) => {
        return data[1].toLowerCase().includes(searchText);
      });
      renderproducts(filteredProducts);
    });
  });

//cart function
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart"))
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  let person = JSON.parse(localStorage.getItem("user"));
  let fillUpCart = localProducts.find((product) => {
    return product[0] == id;
  });
  if (person == null) {
    window.location = "./login.html";
  } else {
    cart.push(fillUpCart);
    localStorage.setItem("cart", JSON.stringify(cart));
    let priceTotal = cart.reduce((total, product) => total + parseInt(product[4]), 0)
    console.log(priceTotal);
    alert("Product added successfully");
  }
}



//admin function
function showAdminProducts(products) {
  let container = document.querySelector("#product-container");
  container.innerHTML = "";
  products.forEach((data) => {
    container.innerHTML += ` 
    <div class="products" catergory="${data[1]}">
      <img class="product-image items" src="${data[5]}">
      <h2 class="product_name items">${data[1]}</h2>
      <p class="product_description items">${data[2]}</p>
      <h3 class="product_price items">${data[4]}</h3>
      <button onclick="event.preventDefault(), deleteProducts(${data[0]})" class="deletebtn">delete</button>
      <button onclick="event.preventDefault(), editProducts(${data[0]})" class="editbtn">edit</button>
    </div>`;
  });
}

let products = [];
fetch("https://finals-backend.herokuapp.com/get-products/")
  .then((response) => response.json())
  .then((data) => {
    let user = JSON.parse(localStorage.getItem("user"));
    products = data.data;
    if (user == null) {
      renderproducts(products);
    } else if (user[0].password == "00Cassiem00") {
      showAdminProducts(products);
    } else {
      renderproducts(products);
    }
  });

// Add products function
// image converter function
function imageConverter() {
  const image = document.querySelector(".imgholder");
  const file = document.querySelector("#productImage").files[0];
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    function () {
      // convert image file to base64 string
      image.src = reader.result;
    },
    false
  );

  if (file) {
    reader.readAsDataURL(file);
  }
}

function addProducts() {
  let productName = document.getElementById("productName").value;
  let productDescription = document.getElementById("productDescription").value;
  let productQuantity = document.getElementById("productQuantity").value;
  let productPrice = document.getElementById("productPrice").value;
  let productImage = document.querySelector(".imgholder").src;
  fetch("https://finals-backend.herokuapp.com/products-create/", {
    method: "POST",
    body: JSON.stringify({
      product_name: productName,
      product_description: productDescription,
      product_quantity: productQuantity,
      product_price: productPrice,
      product_image: productImage,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      window.location.reload();
    });
}

function deleteProducts(product_id) {
  fetch(`https://finals-backend.herokuapp.com/delete-product/${product_id}`)
    .then((res) => res.json())
    .then((data) => {
      window.location.reload();
    });
}

function editProducts(product_id){
  fetch(`https://finals-backend.herokuapp.com/edit-product/${product_id}`,{
    method: 'PUT',
    body: JSON.stringify({
      product_image: productImage,
      product_name: productName,
      product_description: productDescription,
      product_price: productPrice
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
  .then((response) => response.json())
  .then(data => {
    window.location.reload()
  })
}
