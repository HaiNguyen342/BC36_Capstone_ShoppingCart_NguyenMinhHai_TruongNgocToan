var productService = new ProductService();

function domId(id){
    return document.getElementById(id);
}

function getProductList(){
   productService.getList().then(function(response){
  
        renderProductList(response.data);
    });
}

function resetForm(){

        domId("myform").reset();
        domId("tbTenSP").style.display = "none";
        domId("tbGiaSP").style.display = "none"
        domId("tbmanHinhSP").style.display = "none";
        domId("tbHinhSP").style.display = "none"
        domId("tbcameraSauSP").style.display = "none";
        domId("tbcameraTruocSP").style.display = "none";
        domId("tbmoTaSP").style.display = "none";
        domId("tbloaiSP").style.display = "none";
}

function renderProductList(data){
    var content = "";

    for (var i = 0; i < data.length; i++){
        content += `
        <tr>
        <td>${i + 1}</td>
        <td>${data[i].name}</td>
        <td>${data[i].price}</td>
        <td>${data[i].screen}</td>
        <td>${data[i].backCamera}</td>
        <td>${data[i].frontCamera}</td>
        <td>
        <img style='width: 100%' class='product-img' src='${data[i].img}' alt='' />
        </td>
        <td>${data[i].desc}</td>
        <td>${data[i].type}</td>
        <td>
        <button data-toggle="modal"
        data-target="#myModal" class="btn btn-info" onclick="openUpdateModal(${data[i].id})"> Sửa </button>
        <button class="btn btn-danger" onclick="deleteProduct(${data[i].id})"> Xóa </button>
        </td>
        </tr>
        `;
    }
    document.getElementById("tblDanhSachSP").innerHTML = content;
}


function openUpdateModal(id){
    document.querySelector(".modal-title").innerHTML = "Sửa sản phẩm";
    document.querySelector(".modal-footer").innerHTML = `<button type='button' onclick='updateProduct(${id})' class='btn btn-success'>Sửa</button>`;

    productService.getById(id).then(function(response){
        domId("TenSP").value = response.data.name;
        domId("GiaSP").value = response.data.price;
        domId("manHinhSP").value = response.data.screen;
        domId("HinhSP").value = response.data.img;
        domId("cameraSauSP").value = response.data.backCamera;
        domId("cameraTruocSP").value = response.data.frontCamera;
        domId("moTaSP").value = response.data.desc;
        domId("loaiSP").value = response.data.type;
    });
}

function updateProduct(id){

    var isValid = validateForm();
    if (!isValid) return;

    var name = domId("TenSP").value;
    var price = domId("GiaSP").value;
    var screen = domId("manHinhSP").value;
    var backCamera = domId("cameraSauSP").value;
    var frontCamera = domId("cameraTruocSP").value;
    var img = domId("HinhSP").value;
    var desc = domId("moTaSP").value;
    var type = domId("loaiSP").value;

    var product = new Product(name, price, screen, backCamera, frontCamera, img, desc, type);
    productService.updateProduct(id, product).then(function(){
        document.querySelector(".close").click();
        alert("Sửa sản phẩm thành công");
        getProductList();
    })
}

domId("btnThemSP").onclick = function(){

    // querySelector lấy sản phẩm đầu tiên nó kiếm dc
    document.querySelector(".modal-title").innerHTML = "Thêm sản phẩm";
    document.querySelector(".modal-footer").innerHTML = "<button type='button' onclick='addProduct()' class='btn btn-success'>Thêm</button>";
};

function validateForm(){
    var name = domId("TenSP").value;
    var price = domId("GiaSP").value;
    var screen = domId("manHinhSP").value;
    var backCamera = domId("cameraSauSP").value;
    var frontCamera = domId("cameraTruocSP").value;
    var image = domId("HinhSP").value;
    var desc = domId("moTaSP").value;
    var type = domId("loaiSP").value;
    var isValid = true;

    isValid &= required(name, "tbTenSP");
    isValid &= required(price, "tbGiaSP") && checkNumber(price, "tbGiaSP");
    isValid &= required(screen, "tbmanHinhSP");
    isValid &= required(backCamera, "tbcameraSauSP");
    isValid &= required(frontCamera, "tbcameraTruocSP");
    isValid &= required(image, "tbHinhSP") && checkUrl(image, "tbHinhSP");
    isValid &= required(desc, "tbmoTaSP");
    isValid &= required(type, "tbloaiSP");

    return isValid;
   
}

function addProduct(){

    var isValid = validateForm();
    if (!isValid) return;

    var name = domId("TenSP").value;
    var price = domId("GiaSP").value;
    var screen = domId("manHinhSP").value;
    var backCamera = domId("cameraSauSP").value;
    var frontCamera = domId("cameraTruocSP").value;
    var image = domId("HinhSP").value;
    var desc = domId("moTaSP").value;
    var type = domId("loaiSP").value;

    var product = new Product(name, price, screen, backCamera, frontCamera, image, desc, type);
    
    productService.addProduct(product).then(function(){
        alert("Thêm sản phẩm thành công.");
        getProductList();
    });

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

function deleteProduct(id){
    productService.deleteProduct(id).then(function(){
        alert("Xóa sản phẩm thành công");
        getProductList();
    });
}

function required(value, spanId) {
    if (value.length === 0) {
      domId(spanId).innerHTML = "*Vui lòng không bỏ trống*";
      domId(spanId).style.display = "block";
      domId(spanId).style.color = "red";
      return false;
    }
  
    domId(spanId).style.display = "none";
    return true;
  }

  function checkUrl(value, spanId){
    var pattern = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    if (pattern.test(value)) {
      domId(spanId).style.display = "none";
      return true;
    }
  
    domId(spanId).innerHTML = "*Vui lòng nhập định dạng đường link*";
    domId(spanId).style.display = "block";
    domId(spanId).style.color = "red";
    return false;
  }

  function checkNumber(value, spanId){
    var pattern = /^\d*$/;
    if(pattern.test(value)){
    domId(spanId).style.display = "none";
      return true;
    }

    domId(spanId).innerHTML = "*Vui lòng nhập số dương*";
    domId(spanId).style.display = "block";
    domId(spanId).style.color = "red";
    return false;

  }

window.onload = function (){
    getProductList();
}
