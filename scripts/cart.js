function toggleCartbar() {
  let popUp = document.getElementsByClassName("cartbar-links")[0]
  let body = document.getElementsByClassName("body")
  let cart = JSON.parse(localStorage.getItem('cart'))
  if (cart == null) {
    console.log("empty cart");
  }
  else{
    if (popUp.classList.contains("active")){
      popUp.classList.toggle("active")
      body.style.overflowY = "scroll"
    }
    else {
      popUp.classList.toggle("active")
      popUp.style.overflowY = "scroll"
      body.style.overflowY = "hidden"
    }
  }
}

let cartProducts = [];
cartProducts =  JSON.parse(localStorage.getItem('cart'));
let conatiner = document.querySelector('.cart');
cartProducts.innerHTML = "";

  cartProducts.forEach((data) => {
    conatiner.innerHTML += `
    <div class="products" catergory="${data[1]}">
    <img class="product-image items" src="${data[5]}">
        <h2 class="product_name items">${data[1]}</h2>
        <p class="product_description items">${data[2]}</p>
        <h3 class="product_price items">${data[4]}</h3>
        <button class=""btn onclick="removeFromCart(${data[0]})">Remove from cart</button>
    </div>
    `;
  });

  function removeFromCart(id) {
      let newCart = [];
      let leftProducts = cartProducts.filter(product => product[0] != id)
      localStorage.setItem('cart', JSON.stringify(leftProducts))
      window.location.reload()
}


let productsAmount = JSON.parse(localStorage.getItem('cart')).length;
let totalPrice = JSON.parse(localStorage.getItem('cart')).reduce((total, products) => total + parseInt(products[4]), 0)
document.querySelector('.amount').innerHTML = `Amount of products: ${productsAmount}`;
document.querySelector('.total').innerHTML = `Total price: R${totalPrice}`
