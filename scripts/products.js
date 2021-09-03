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

function productFilter(category) {
  let filteredProducts = localProducts.filter((product) =>
    product[1].toLowerCase().includes(category.toLowerCase())
  );
  console.log(filteredProducts);
  renderproducts(filteredProducts);
}

// let filterProducts = []
fetch('https://finals-backend.herokuapp.com/get-products/')
.then((res) => res.json())
.then(data => {
    let filterProducts = data.data
    let searchBar = document.getElementById("search")
    searchBar.addEventListener("keyup", (a) => {
        const searchText = a.target.value.toLowerCase()
        // console.log(searchText);
        const filteredProducts = filterProducts.filter((data) => {
            return (
                data[1].toLowerCase().includes(searchText)
             )
        })
        // console.log(filterProducts)
        renderproducts(filteredProducts)        
    })
})

function addToCart(id) {
      let cart = JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : []
      let fillUpCart = localProducts.find((product) => {
        return  product[0] == id
      })
      cart.push(fillUpCart)
      localStorage.setItem('cart', JSON.stringify(cart))
      console.log('Product added successfully');
}
