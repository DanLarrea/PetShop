class ProductsViewModel {
    constructor($http, $window, $document) {
        this.Products = [];
        this.Http = $http;
        this.Window = $window;
        this.GetAllProducts();
        this.Document = $document
        this.GridOptions =
            {
                enableFiltering: false,
                data: 'vm.Products',
                appScopeProvider: this,
                columnDefs: [
                    { name: 'Category', field: 'Category', minWidth: 100 },
                    { name: 'Title', field: 'Title' },
                    { name: 'Brand', field: 'Brand' },
                    { name: 'Price', field: 'Price' },
                    { name: 'Quantity', field: 'Quantity' },
                    {
                        name: 'Edit', field: 'Id', maxWidth: 70, cellTemplate: '<button class="btn btn-success btn-sm" style="width:100%; padding:1px" ng-click="grid.appScope.SelectProduct(row.entity)">Edit</button>'
                    },
                    {
                        name: 'Delete', field: 'Id', maxWidth: 70, cellTemplate: '<button class="btn btn-danger btn-sm" style="width:100%; padding:1px" ng-click="grid.appScope.DeleteProduct(row.entity)">Delete</button>'
                    }
                ]
            };
        this.IsEditing = true;

        this.SelectedProduct = "";

    };
    GetAllProducts() {
        this.Http.get("/api/Products")
            .then((response) => {
                this.OnGetData(response);
            });
    }

    OnGetData(response) {
        for (let i in response.data) {
            let jsonProduct = response.data[i];
            this.Products.push(new Product(jsonProduct));
        }
    };

    AddNewProduct() {
        let product = new Product();
        product.Category = this.Category;
        product.Title = this.Title;
        product.Brand = this.Brand;
        product.Price = this.Price;
        product.Quantity = this.Quantity;

        var config = {
            headers: {
                'Content-Type': 'application/json;charset=utf-8;'
            }
        }

        this.Http({
            method: 'POST',
            url: '/api/Products',
            data: product,
            config
        }).then((response) => this.OnProductAdded(response));

        this.ClearForm();
    }
    OnProductAdded(response) {
        let product = new Product(response.data);
        this.Products.push(product);
    }

    SelectProduct(product) {
        this.Category = product.Category;
        this.Title = product.Title;
        this.Brand = product.Brand;
        this.Price = product.Price;
        this.Quantity = product.Quantity;

        this.IsEditing = false;

        this.SelectedProduct = product;
    }

    UpdateProduct() {
        let uptproduct = this.SelectedProduct;
        uptproduct.Category = this.Category;
        uptproduct.Title = this.Title;
        uptproduct.Brand = this.Brand;
        uptproduct.Price = this.Price;
        uptproduct.Quantity = this.Quantity;
       
        //$http PUT function
        this.Http({
            method: 'PUT',
            url: '/api/Products/' + uptproduct.Id,
            data: uptproduct

        }).then((response) =>

            alert("Product updated successfully")

        ), ((response) =>

            alert("Error while updating product try again!")

            );
        this.ClearForm();
    }

    CancelUpdate() {
        this.IsEditing = true;
    }

    DeleteProduct(product) {
        var r = this.Window.confirm("Do you want to delete this product?");
        if (r == true) {
            this.Http({
                method: 'DELETE',
                url: '/api/Products/' + product.Id

            }).then((response) => {
                var index = this.Products.indexOf(product);
                this.Products.splice(index, 1);
                alert("Product deleted successfully");

            }), ((response) => {

                alert("Error while deleting product try again!");
            });
        }
    }
    ClearForm() {
        this.Category = "";
        this.Title = "";
        this.Brand = "";
        this.Price = 0;
        this.Quantity = 0;

        this.IsEditing = true;
    }
};

app.component('products',
    {
        templateUrl: "./Scripts/Views/Products/ProductsView.html",
        controller: ProductsViewModel,
        controllerAs: "vm"
    });