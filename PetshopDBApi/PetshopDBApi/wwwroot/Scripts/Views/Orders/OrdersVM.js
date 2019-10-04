class OrdersViewModel {
    constructor($http, $window, $document) {
        this.Clients = [];
        this.Products = [];
        this.OrdersList = []
        this.Http = $http;
        this.Window = $window;
        this.GetAllClients();
        this.GetAllProducts()
        //this.GetAllOrders();
        this.Document = $document
        this.GridOptions =
            {
                enableFiltering: false,
                data: 'vm.OrdersList',
                appScopeProvider: this,
                columnDefs: [
                    { name: 'OrderId', field: 'OrderId', minWidth: 100 },
                    { name: 'Date', field: 'Date' },
                    { name: 'ClientId', field: 'ClientId' },
                    { name: 'ProductId', field: 'ProductId' },
                    {
                        name: 'Edit', field: 'Id', maxWidth: 70, cellTemplate: '<button class="btn btn-success btn-sm" style="width:100%; padding:1px" ng-click="grid.appScope.SelectOrder(row.entity)">Edit</button>'
                    },
                    {
                        name: 'Delete', field: 'Id', maxWidth: 70, cellTemplate: '<button class="btn btn-danger btn-sm" style="width:100%; padding:1px" ng-click="grid.appScope.DeleteOrder(row.entity)">Delete</button>'
                    }
                ]
            };
        this.IsEditing = true;

    };
    GetAllClients() {
        this.Http.get("/api/Clients")
            .then((response) => {
                this.OnGetData(response, Client);
            });
    };

    OnGetData(response) {
        for (let i in response.data) {
            let jsonClient = response.data[i];
            this.Clients.push(new Client(jsonClient));
        }
    };

    GetAllProducts() {
        this.Http.get("/api/Products")
            .then((response) => {
                this.OnGetProductsData(response, Product);
            });
    };

    OnGetProductsData(response) {
        for (let i in response.data) {
            let jsonProduct = response.data[i];
            this.Products.push(new Product(jsonProduct));
        }
    };

    OnSelectedClient(response) {
        let parsed = JSON.parse(response)
        this.SelectClient = new Client(parsed);
    }

    AddNewOrder() {
        let Client = JSON.parse(this.SelectedClient)
        let Product = JSON.parse(this.SelectedProduct)

        let orders = new Orders();
        orders.Date = new Date();
        orders.ClientId = Client.Id;
        orders.ProductId = Product.Id;

        var config = {
            headers: {
                'Content-Type': 'application/json;charset=utf-8;'
            }
        }

        this.Http({
            method: 'POST',
            url: '/api/Orders',
            data: orders,
            config
        }).then((response) => this.OnOrderAdded(response));

        this.ClearForm();
    }
    OnOrderAdded(response) {
        let orders = new Orders(response.data);
        this.OrdersList.push(orders);
    }

    SelectOrder(order) {
        this.Name = order.Name;
        this.LastName = order.LastName;
        this.DNI = order.DNI;
        this.Birthdate = order.Birthdate;
        this.Phone = order.Phone;
        this.Address = order.Address;
        this.City = order.City;
        this.Email = order.Email;
        this.Password = order.Password;

        this.IsEditing = false;

        this.SelectedOrder = order;
    }

    UpdateOrder() {
        let uptorder = this.SelectedOrder;
        uptorder.Name = this.Name;
        uptorder.LastName = this.SelectedClient.Id;
        uptorder.DNI = this.DNI;
        uptorder.Birthdate = this.Birthdate;
        uptorder.Phone = this.Phone;
        uptorder.Address = this.Address;
        uptorder.City = this.City;
        uptorder.Email = this.Email;
        uptorder.Password = this.Password;

        //$http PUT function
        this.Http({
            method: 'PUT',
            url: '/api/Orders/' + uptorder.Id,
            data: uptorder

        }).then((response) =>

            alert("User has been updated Successfully")

        ), ((response) =>

            alert("Error. while updating order Try Again!")

            );
        this.ClearForm();
    }

    CancelUpdate() {
        this.IsEditing = true;
    }

    DeleteOrder(order) {
        var r = this.Window.confirm("¿Seguro que lo quieres borrar?");
        if (r == true) {
            this.Http({
                method: 'DELETE',
                url: '/api/Orders/' + order.Id

            }).then((response) => {
                var index = this.Orders.indexOf(order);
                this.Orders.splice(index, 1);
                alert("User has deleted Successfully");

            }), ((response) => {

                alert("Error. while deleting user Try Again!");
            });
        }
    }
    ClearForm() {
        this.Name = "";
        this.LastName = "";
        this.DNI = "";
        this.Birthdate = new Date(0);
        this.Phone = "";
        this.Address = "";
        this.City = "";
        this.Email = "";
        this.Password = "";

        this.IsEditing = true;
    }
};


app.component('orders',
    {
        templateUrl: "./Scripts/Views/Orders/OrdersView.html",
        controller: OrdersViewModel,
        controllerAs: "vm"
    });