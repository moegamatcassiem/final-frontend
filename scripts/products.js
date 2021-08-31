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

