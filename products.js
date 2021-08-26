fetch("https://finals-backend.herokuapp.com/get-products/")
  .then((response) => response.json())
  .then((json) => {
    console.log(json.data);
    json.data.forEach((item) => {
      console.log(item);
      console.log(item[1]);
    });
    renderproducts(json.data);
  });

function renderproducts(products) {
  let productContainer = document.querySelector("#product-container");
  productContainer.innerHTML = "";

  products.forEach((data) => {
    productContainer.innerHTML += `
    <div class="products">
    <h3 class="product-image items"><img src="${data[5]}"></h3>
        <h2 class="product_name items">${data[1]}</h2>
        <h3 class="product_description items">${data[2]}</h3>
        <h3 class="product_price items">${data[4]}</h3>
    </div>
    `;
  });
}
