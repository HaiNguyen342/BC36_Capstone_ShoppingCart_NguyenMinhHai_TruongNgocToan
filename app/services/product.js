function ProductService() {
    this.getList = function () {
      return axios({
        url: "https://63661fa479b0914b75c9b920.mockapi.io/ShoppingCartProducts",
        method: "GET",
      });
    };
  
    this.getById = function (id) {
      return axios({
        url: `https://63661fa479b0914b75c9b920.mockapi.io/ShoppingCartProducts/${id}`,
        method: "GET",
      });
    };

    this.getById = function(id){
      return  axios({
          url:`https://63661fa479b0914b75c9b920.mockapi.io/ShoppingCartProducts/${id}`,
          method: "GET",
      });
    };

    this.updateProduct = function(id, data){
      return  axios({
          url:`https://63661fa479b0914b75c9b920.mockapi.io/ShoppingCartProducts/${id}`,
          method: "PUT",
          data: data,
      });

    };

    this.deleteProduct = function(id){
      return  axios({
          url:`https://63661fa479b0914b75c9b920.mockapi.io/ShoppingCartProducts/${id}`,
          method: "DELETE",
      });
    };
  }
  