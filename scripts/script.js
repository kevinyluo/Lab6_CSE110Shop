// Script.js

let myStorage = window.localStorage;

window.addEventListener('DOMContentLoaded', () => {
  fetch("https://fakestoreapi.com/products")
  .then(response => response.json())
  .then((data) => {
    // Store the data in local storage
    let str = JSON.stringify(data);
    localStorage.setItem("items", str);

    // Add the items to product item container
    const container = document.getElementById("product-list");
    for(let i = 0; i < data.length; i++){
      const product =  data[i]
      // console.log(product.price)

      const newProduct = document.createElement('product-item')
      newProduct.setAttribute('title', product.title)
      newProduct.setAttribute('price', product.price)
      newProduct.setAttribute('src', product.image)
      newProduct.setAttribute('id', product.id)

      container.appendChild(newProduct)
    }

  })
});


