// product-item.js

class ProductItem extends HTMLElement {

  constructor() {
    super();

  }

  connectedCallback(){
    // Get the defined attributes
    const title = this.getAttribute('title')
    const src = this.getAttribute('src')
    const price = this.getAttribute('price')
    const id = this.getAttribute('id')

    // Create shadow root
    const shadow = this.attachShadow({mode: 'open'})

    // Create wrapper list
    const wrapper = document.createElement('li')
    wrapper.setAttribute('class', 'product')

    // Create image for product
    const img = wrapper.appendChild(document.createElement('img'))
    img.setAttribute('src', src)
    img.setAttribute('alt', title)
    img.setAttribute('width', 200)

    // Create title for product
    const name = wrapper.appendChild(document.createElement('p'))
    name.setAttribute('class', 'title')
    name.innerHTML = title  

    // Create price for product
    const priceLabel = wrapper.appendChild(document.createElement('p'))
    priceLabel.setAttribute('class', 'price')
    priceLabel.innerHTML = price
    
    // Create add to cart button
    const button = wrapper.appendChild(document.createElement('button'))
    button.onclick = function() {
      alert('Added to Cart!')
      const count = document.getElementById('cart-count')
      let currCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

      // Update the button text and cart count
      if (button.innerHTML == 'Add to Cart'){
        button.innerHTML = 'Remove from Cart'
        count.innerHTML = parseInt(count.innerHTML) + 1
        
        // Add item ID to cart
        currCart.push(id)
      }
      else{
        button.innerHTML = 'Add to Cart'
        count.innerHTML = parseInt(count.innerHTML) - 1

        // Remove idem ID from cart
        const index = currCart.indexOf(id);
        if (index > -1) {
          currCart.splice(index, 1);
        }
      }

      // Add cart items to local storage
      localStorage.setItem("cart", JSON.stringify(currCart));
    }

    // When the button is rendered, check the state of the cart in local storage
    let currCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    if(currCart.includes(id)){
      button.innerHTML = 'Remove from Cart'
      const count = document.getElementById('cart-count')
      count.innerHTML = parseInt(count.innerHTML) + 1
    }
    else
      button.innerHTML = 'Add to Cart'

    // Add stylesheet to element
    const linkElem = document.createElement('link')
    linkElem.setAttribute('rel', 'stylesheet')
    linkElem.setAttribute('href', './styles/styles.css')
  
    shadow.appendChild(linkElem)
    shadow.appendChild(wrapper)
  }

}

customElements.define('product-item', ProductItem);
