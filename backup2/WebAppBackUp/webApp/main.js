// Get a reference to the storeHeader element
const storeHeader = document.querySelector('.pagesProducts');
const mainHeader = document.querySelector('.mainHeader');
const storeList = document.querySelector('.storeList');
const store = document.querySelector('.store');
const closeBtn = document.querySelector('.closeBtn');
const cartOverLay = document.querySelector('.cartOverLay');
const cart = document.querySelector('.cart');
const productsDiv = document.querySelectorAll('.myProducts');
const badge = document.querySelector('.badge');

const clearBtn = document.querySelector('.clearBtn');
const allPickedItems = document.querySelector('.allPickedItems');
const totalByCount = document.querySelector('.totalByCount');
const totalByCash = document.querySelector('.totalByCash');


// cart
let ourCart = [];
let combinedItems = [];
let buttonDoms = [];

function trimSentence(sentence, maxLength) {
  const words = sentence.split(' ');
  if (words.length > maxLength) {
      const trimmedWords = words.slice(0, maxLength);
      return trimmedWords.join(' ') + '...';
  }
  return sentence;
}

// hiding cart and opening it
function openCart() {
  let attribute = cartOverLay.getAttribute('id', 'layer');
  if (attribute === 'layer') {
    cartOverLay.removeAttribute('id', 'layer');
    document.body.setAttribute('id', 'hider')
    document.querySelector('.mainPager').setAttribute('id', 'layer');
    document.body.classList.add('bodyChanger');
    mainHeader.style.opacity = 0;
  } else {
    cartOverLay.setAttribute('id', 'layer');
    mainHeader.style.opacity = 1.0;
    document.querySelector('.mainPager').removeAttribute('id', 'layer');
    document.body.classList.remove('bodyChanger');
  }
}
document.body.addEventListener('click', (event) => {
  let id = event.target.getAttribute('id', 'hider');
  if (id == 'hider') {
      cartOverLay.setAttribute('id', 'layer');
      mainHeader.style.opacity = 1.0;
      document.querySelector('.mainPager').removeAttribute('id', 'layer');
      document.body.classList.remove('bodyChanger');
    }
  });
// hiding cart and opening it logic

// toast card
function showToastCard(toastTitle) {
  console.log(toastTitle)
  let toaster = document.getElementsByClassName('Toastii')
  toaster[0].textContent = toastTitle
  let toast = document.getElementById("toastCard");
  toast.className = "show";
  setTimeout(() => {
    toast.classList.remove('show')
  }, 3000)
}
function handleScroll() {
  // Get the scroll position
  const scrollPosition = window.scrollY || window.pageYOffset;
  if (scrollPosition > 0) {
    mainHeader.style.opacity = 0;
  } else {
    mainHeader.style.display = 'block';
    mainHeader.style.opacity = 1.0;
  }
  if (scrollPosition > 100) {
    storeHeader.classList.add('sticky');
  } else {
    storeHeader.classList.remove('sticky');
  }
}
window.addEventListener('scroll', handleScroll);


class Products {
  async getData() {
    try {
      const data = await fetch('https://dummyjson.com/products');
      const product = await data.json();
      return product.products;

    } catch (error) {
      console.log('Error While getting products');
    }
  }
}

class UI {
  display(data) {

    let {productsByCategory, categories, thumbNails} = this.getProductByCategory(data);

    // list categories
    let ul = document.createElement('ul')
    let i = 0
    categories.forEach((item) => {
      // let li = document.createElement('li')
      let li = `<li onclick={displayProducts(${i})} class="lister" id="${item}">${item}</li>`;
      i++;
      ul.innerHTML += li;
    })
    storeList.appendChild(ul);

    let products = this.getProducts(productsByCategory);
    let {smartphones, laptops, fragrances, skincare, groceries} = products;
    let storeNames = ['smartphones', 'laptops', 'fragrances', 'skincare', 'groceries'];
    let storeData = [smartphones, laptops, fragrances, skincare, groceries];
    for (let i = 0; i < storeNames.length; i++)
    {
      this.displayDa(storeData[i], i);
    }

    for (let key of storeData) {
      combinedItems = [...combinedItems,...key];
    }
  }

  displayDa(data, index) {
    data.forEach((ele) => {
      let i = 1;
        let sinDiv = `
        <div class="singleProduct">
                    <img src="${ele.imageUrl}">
                   <div class="itemName">
                    <h1>${ele.title}</h1>
                    <p>Price $${ele.price}</p>
                   </div>
                   <div class="addToCarDiv">
                    <button class="addToCartBtn" data-id=${ele.id}>Add to Cart</button>
                   </div>
                </div>
             `
          productsDiv[index].innerHTML += sinDiv;
        });
      
  }

  getProductByCategory(products) {
    const productsByCategory = {};
    const thumbNails = {};
    const categories = [];

    products.forEach(product => {
      if (productsByCategory.hasOwnProperty(product.category)) {
        productsByCategory[product.category].push(product);
      } else {
        categories.push(product.category); //perfect
        productsByCategory[product.category] = [product]
      }
    });
    products.forEach(product => {
      if (thumbNails.hasOwnProperty(product.category)) {
        thumbNails[product.category].push(product.thumbnail);
      } else {
        thumbNails[product.category] = [product.thumbnail]
      }
    });
    return {productsByCategory, categories, thumbNails};
  }

  getProducts(products) {
    let singleProducts = [];
    let data = [];
    let items = [];
    let id = 0;

    for (let key in products)
    {
      data.push(products[key]);
    }
    data.forEach((element) => {
      element.forEach((ele) => {
        singleProducts.push(ele);
        let {brand, category, discountPercentage, price, images, rating, title} = ele;
        for (let i = 0; i < images.length; i++) {
          let item = {
            id: id,
            brand : brand,
            category : category,
            discountPercentage: discountPercentage,
            price : price,
            imageUrl : images[i],
            rating : rating,
            title : title,
          }
          id++;
          items.push(item);
        }
      })
    });
    let {productsByCategory} = this.getProductByCategory(items);
    return productsByCategory;
  }

  // from here
  getProductsButtons() {

    const productBtn = [...document.querySelectorAll('.addToCartBtn')];
    buttonDoms = productBtn;

    productBtn.forEach(button => {
      let id = button.getAttribute('data-id');
      let inCart = ourCart.find(item => item.id === id);
      
      if (inCart) {
        button.innerText = 'In Cart';
        button.disabled = true;

      }
      button.addEventListener('click', (event) => {
      event.target.innerText = 'In Cart';
      event.target.disabled = true;
          // get product from combinedItems
      let cartItem = {...combinedItems.find(item => item.id == id), amount: 1};
      // call the toaster function with the title
      showToastCard(cartItem.title);
      // trim title before adding to cart
      cartItem.title = trimSentence(cartItem.title, 2);
          // add product to cart
          ourCart = [...ourCart, cartItem];
          // set cart values
          this.setCartValues(ourCart);
          // display cart items
          this.addCartItem(cartItem);
        });
    })
  }

  setCartValues(cart) {
    let tempTotal = 0;
    let itemsTotal = 0;

    cart.map(item => {
      tempTotal += item.price * item.amount;
      itemsTotal += item.amount;
    });
    badge.innerText = itemsTotal;
    totalByCash.innerText  = parseFloat(tempTotal.toFixed(2));
    totalByCount.innerText = itemsTotal;

  }

  addCartItem(item) {
    console.log(item)
    let {id, imageUrl, title, price} = item;
    let pickedItem = `
      <div class="pickedItem">
                        <img src="${imageUrl}" alt="picture of this item">
                        <div class="itemDetails">
                            <h3>${title}</h3>
                            <p>$${price}</p>
                            <i data-id=${id} class="remover">remove</i>
                        </div>
                        <div class="addOrReduce">
                            <i class="fas fa-caret-square-up" data-id=${id}>Up</i>
                            <p class="itemAmount">1</p>
                            <i class="fas fa-caret-square-down" data-id=${id}>Down</i>
                        </div>
    `

    allPickedItems.innerHTML += pickedItem;
  }

  cartLogic() {
    clearBtn.addEventListener('click', () => {
      this.clearTheCart();
    });
    allPickedItems.addEventListener('click', (event) => {

      if (event.target.classList.contains('remover')) {
        let removeItem = event.target;
        let id = removeItem.getAttribute('data-id')
        allPickedItems.removeChild(removeItem.parentElement.parentElement);
        this.removeItem(id);
      } else if(event.target.classList.contains('fa-caret-square-up')) {
        let incrementItem = event.target;
        let id = incrementItem.getAttribute('data-id')
        let tempItem = ourCart.find(item => item.id == id)

        tempItem.amount = tempItem.amount + 1;
        this.setCartValues(ourCart);
        incrementItem.nextElementSibling.innerText = tempItem.amount;
      }
      else if (event.target.classList.contains('fa-caret-square-down')) {
        let decrementItem = event.target;
        let id = decrementItem.getAttribute('data-id')
        let tempItem = ourCart.find(item => item.id == id)

        if (tempItem.amount > 1) {
          tempItem.amount = tempItem.amount - 1;

          this.setCartValues(ourCart);
          decrementItem.previousElementSibling.innerText = tempItem.amount;
         
        }
      }
    })
  }
  clearTheCart() {
    let itemsIds = ourCart.map(item => item.id);
    console.log(itemsIds)
    itemsIds.forEach(id => this.removeItem(id));

    while (allPickedItems.children.length > 0) {
      allPickedItems.removeChild(allPickedItems.children[0])
    }
    cartOverLay.setAttribute('id', 'layer');
  }

  removeItem(id) {
    let cart = ourCart.filter(item => item.id != id);
    ourCart = cart;
    this.setCartValues(ourCart);
    let button = this.getButtons(id);
    button.disabled = false;
    button.innerText = 'Add to Cart';
  }

  getButtons(id) {
    return buttonDoms.find(button => button.getAttribute('data-id') == id);
  }
}

function displayProducts(index) {
  const ourLists = document.querySelectorAll('.lister');

  for (let i = 0; i < productsDiv.length; i++) {
      productsDiv[i].classList.add('activo')
      ourLists[i].removeAttribute('id', 'activeColor')
  }

  for (let i = 0; i < productsDiv.length; i++) {
    if (i == index)
    {
      productsDiv[i].classList.remove('activo')
      ourLists[i].setAttribute('id', 'activeColor')
    }
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    let products = new Products();
    let ui = new UI();
    let result = await products.getData();
    ui.display(result);

    displayProducts();
    ui.getProductsButtons();
    ui.cartLogic();
  } catch (error) {
    // document.body.innerHTML = `<h1>Lol! Failed to load page,,No Network,,,GO TO SLEEP</h1>`
    console.log('Error occur while getting the Products', error)
  }
})
