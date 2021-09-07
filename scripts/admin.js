//admin functions
fetch("https://finals-backend.herokuapp.com/get-products/")
  .then((response) => response.json())
  .then((json) => {
    localProducts = json.data;
    console.log(localProducts);
    renderproducts(json.data);
  });

function showAdminProducts(array) {
    let container = document.querySelector("#product-container");
    container.innerHTML = ''
    products.forEach((data) => {
        productContainer.innerHTML += `
        <div class="products" catergory="${data[1]}">
        <img class="product-image items" src="${data[5]}">
            <h2 class="product_name items">${data[1]}</h2>
            <p class="product_description items">${data[2]}</p>
            <h3 class="product_price items">${data[4]}</h3>
        <button onclick="event.preventDefault(), deleteSneaker(${data[0]})" class="deletebtn">delete</button>
        <button onclick="event.preventDefault(), updateSneaker(${data[0]})" class="updateBtn">Update</button>
        </div>`;
    });
  }

  let adminProducts = [];
  fetch("https://sneakeromatic-api.herokuapp.com/show-sneakers/")
    .then((res) => res.json())
    .then((data) => {
      let user = JSON.parse(localStorage.getItem('user'))
      products = data.data;
      if (user == null) {
        renderproducts(adminProducts)
      }
      else if (user.password == '00Cassiem00') {
        showAdminProducts(adminProducts)
      }
      else{
        renderproducts(adminProducts)
      }
  
    });

function addProducts() {
    let productImage = document.querySelector('.img').src
    let productName = document.getElementById('product-name').value
    let productDescription = document.getElementById('product-description').value
    let productPrice = document.getElementById('product-price').value
    console.log(Name);
    if (confirm('Are you sure you wish to add this product?')) {
      fetch('https://finals-backend.herokuapp.com/products-create/', {
        method: "POST",
        body: JSON.stringify({
            product_image = productImage,
            product_name = productName,
            product_description = productDescription,
            product_price = productPrice
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((res) => res.json())
      .then(data => {
        window.location.reload()
      })
    }
    else{
      console.log('Add cancelled')
    }
  }
  
  function deleteProducts(product_id) {
    fetch('https://finals-backend.herokuapp.com/get-products/')
    .then((res) => res.json())
    .then(data => {
      let products = data.data
      let deleteProducts = products.find((shoe) => {
        return shoe[0] == product_id
      })
      if (confirm('Are you sure you want to delete this?')) {
        fetch(`https://finals-backend.herokuapp.com/delete-product/${product_id}/`)
        .then((res) => res.json())
        .then(data => {
          window.location.reload()
        })
      }
      else(
        console.log('delete cancelled')
      )
    })
  }
  
  function editProducts(product_id) {
    fetch('https://finals-backend.herokuapp.com/get-products/')
    .then((res) => res.json())
    .then(data => {
      let products = data.data
      let editSneaker = products.find((shoe) => {
        return data[0] == product_id
      })
      let productImage = document.querySelector('#productImage').value
      let productName = document.querySelector('#productName').value
      let productDescription = document.querySelector('#productDescription').value
      let productPrice = document.querySelector('#productPrice').value
      if (confirm("Are you sure you wish to update this product?")) {
        fetch(`https://finals-backend.herokuapp.com/edit-product/${product_id}/`, {
          method: 'PUT',
          body: JSON.stringify({
            product_image = productImage,
            product_name = productName,
            product_description = productDescription,
            product_price = productPrice
          }),
          headers: {
            "Content-type": "application/json",
          },
        })
        .then((res) => res.json())
        .then(data => {
          window.location.reload()
        })
      }
      else{
        console.log('update cancelled')
      }
    })
  }