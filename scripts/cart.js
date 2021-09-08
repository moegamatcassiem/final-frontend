function toggleCartbar() {
  document.getElementsByClassName("cartbar-links")[0].classList.toggle("active");
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
