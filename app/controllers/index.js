var productService = new ProductService();

var cartProduct = [];

function domId(id) {
  return document.getElementById(id);
}   

function getProductList() {
  productService.getList().then(function (response) {
    renderProductList(response.data);
  });
}

function renderProductList(data) {
  var content = "";

  for (var i = 0; i < data.length; i++) {
    content += `
    <div class="card">
    <div class="top-bar">
      <em class="stocks">${data[i].type}</em>
    </div>
    <div class="img-container">
      <img
        class="product-img"
        src='${data[i].img}'"
      />
      <div class="out-of-stock-cover"><span>Out Of Stock</span></div>
    </div>
    <div class="details">
      <div class="name-fav">
        <strong class="product-name">${data[i].name}</strong>
        <button onclick='this.classList.toggle("fav")' class="heart">
          <i class="fas fa-heart"></i>
        </button>
      </div>
      <div class="wrapper">
        <h5>${data[i].screen}</h5>
        <h5>${data[i].backCamera}</h5>
        <h5>${data[i].frontCamera}</h5>
        <p>
          ${data[i].desc}
        </p>
      </div>
      <div class="purchase">
        <p class="product-price">${data[i].price}</p>
        <span class="btn-add">
          <div>
            <button onclick="addItem(this)" class="add-btn">
              Add <i class="fas fa-chevron-right"></i>
            </button></div
        ></span>
      </div>
    </div>
  </div>
    `;
  }

  domId("main-cart").innerHTML = content;
}

var typeName = "";

domId("typeInput").onchange = function (event){
    typeName = event.target.value;
}

domId("basic-addon2").onclick = function filterProduct(){
  productService.getList().then(function(response){
  var data = response.data;
  var result = [];
  for (var i = 0; i < data.length; i++){
    if(typeName === data[i].type){
      result.push(data[i]);
    }
  }
  
  renderProductList(result);
  });
}

window.onload = function () {
  getProductList();
};
