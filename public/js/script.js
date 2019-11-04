let showBtn = document.querySelector('.show-products');
let list = document.querySelector(`.product-list`);
let addForm = document.querySelector(`.add-product-form`);

showBtn.addEventListener('click', () => {
  fetch(`http://localhost:3000/products`)
    .then(res => res.json())
    .then(data => {
      data.forEach(product => {
        let li = document.createElement('li');
        li.textContent = `${product.id} - ${product.name} - $${product.price}`;
        list.appendChild(li);
      });
    });
});

addForm.addEventListener('submit', e => {
  e.preventDefault();
  fetch(`http://localhost:3000/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: document.getElementById(`add-product-name`).value,
      price: document.getElementById(`add-product-price`).value
    })
  })
    .then(res => res.text())
    .then(data => console.log(data));
});
