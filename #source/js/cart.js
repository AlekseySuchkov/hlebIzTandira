const productBtn = document.querySelectorAll('.column-item__button');
const cartProductsList = document.querySelector('.cart-content__list');
const cart = document.querySelector('.cart');
const cartQuantity = document.querySelector('.cart__quantity');
const fullprice = document.querySelector('.fullprice');


let price = 0;



const randomId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};





const plusFullPrice = (currentPrice) => {
  return price += currentPrice;
};

const minusFullPrice = (currentPrice) => {
  return price -= currentPrice;
};

const printFullPrice = () => {
  fullprice.textContent = `${price} ₽`;
};

const printQuantity = () => {
  let length = cartProductsList.querySelector('.simplebar-content').children.length;
  cartQuantity.textContent = length;
  length > 0 ? cart.classList.add('active') : cart.classList.remove('active');
}

const generateCartProduct = (img, title, price, id) => {
  return `
  <li class="cart-content__item">
                  <article class="cart-content__product cart-product" data-id="${id}">
                    <img src="${img}" alt="Хачапури" class="cart-product__img">
                    <div class="cart-product__text">
                      <h3 class="cart-product__title">${title}</h3>
                      <span class="cart-product__price">${price} ₽</span>
                    </div>
                    <div class="cart-product__amount">
											<div class="cart-product__btns">
												<button class="cart-product__plus"></button>
												<button class="cart-product__minus"></button>
											</div>
											<span class="cart-product__count"> 1</span>
										</div>
                    <button class="cart-product__delete" aria-label="Удалить товар"></button>
                  </article>
                </li>
  `;
};

const deleteProducts = (productParent) => {
  let id = productParent.querySelector('.cart-product').dataset.id;
  document.querySelector(`.column-item[data-id="${id}"]`).querySelector('.column-item__button').disabled = false;

  let currentPrice = parseInt(productParent.querySelector('.cart-product__price').textContent);
  minusFullPrice(currentPrice);
  printFullPrice();
  productParent.remove();

  printQuantity();
};

productBtn.forEach(el => {
  el.closest('.column-item').setAttribute('data-id', randomId());
  el.addEventListener('click', (e) => {
    e.preventDefault();
    let self = e.currentTarget;
    self.disabled = true;
    let parent = self.closest('.column-item');
    let id = parent.dataset.id;
    let img = parent.querySelector('.column-item__image img').getAttribute('src');
    let title = parent.querySelector('.column-item__title').textContent;
    let priceNumber = parseInt(parent.querySelector('.column-item__price').textContent);

    plusFullPrice(priceNumber);

    printFullPrice();

    cartProductsList.querySelector('.simplebar-content').insertAdjacentHTML('afterbegin', generateCartProduct(img, title, priceNumber, id));
    printQuantity();
    self.disabled;
  });
});

cartProductsList.addEventListener('click', (e) => {




  if (e.target.classList.contains('cart-product__delete')) {
    deleteProducts(e.target.closest('.cart-content__item'));
  }

  if (e.target.classList.contains('cart-product__plus')) {
    plusProductCount(currentCount);
    console.log('+');
    console.log(plusProductCount(currentCount));

  }

  if (e.target.classList.contains('cart-product__minus')) {
    minusProductCount();
    console.log('-');
  }

});

const plusProductCount = (currentCount) => {
  return currentCount += 1;
};
const minusProductCount = (currentCount) => {

};

cart.addEventListener('click', (e) => {
  let currentCount = cartProductsList.querySelectorAll('.cart-product__count');
  console.log(currentCount);
});





