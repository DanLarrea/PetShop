class ClientsViewModel {
    constructor($http, $window, $document) {
        this.Clients = [];
        this.Http = $http;
        this.Window = $window;
        this.GetAllClients();
        this.Document = $document
        this.Dogs = [];
        this.GetDogsBreeds();
        this.GridOptions =
            {
                enableFiltering: false,
                data: 'vm.Clients',
                appScopeProvider: this,
                columnDefs: [
                    { name: 'Name', field: 'Name', minWidth: 100 },
                    { name: 'Lastname', field: 'LastName' },
                    { name: 'DNI', field: 'DNI' },
                    { name: 'Birthdate', field: 'Birthdate' },
                    { name: 'Phone', field: 'Phone' },
                    { name: 'Address', field: 'Address' },
                    { name: 'City', field: 'City' },
                    { name: 'Email', field: 'Email' },
                    { name: 'Password', field: 'Password', visible: false },
                    {
                        name: 'Edit', field: 'Id', maxWidth: 70, cellTemplate: '<button class="btn btn-success btn-sm" style="width:100%; padding:1px" ng-click="grid.appScope.SelectClient(row.entity)">Edit</button>'
                    },
                    {
                        name: 'Delete', field: 'Id', maxWidth: 70, cellTemplate: '<button class="btn btn-danger btn-sm" style="width:100%; padding:1px" ng-click="grid.appScope.DeleteClient(row.entity)">Delete</button>'
                    }
                ]
            };
        this.IsEditing = true;

        this.SelectedClient = "";

    };
    GetAllClients() {
        this.Http.get("/api/Clients")
            .then((response) => {
                this.OnGetData(response);
            });
    }

    OnGetData(response) {
        for (let i in response.data) {
            let jsonClient = response.data[i];
            this.Clients.push(new Client(jsonClient));
        }
    };

    GetDogsBreeds() {
        this.Http.get("https://dog.ceo/api/breeds/list/all")
            .then((response) => {
                this.OnGetDogData(response);
            });
    }
    OnGetDogData(response) {
        for (let i in response.data.message) {
            let uppercase = i.charAt(0).toUpperCase() + i.slice(1);
            this.Dogs.push(uppercase);
        }
    };

    AddNewClient() {
        let client = new Client();
        client.Name = this.Name;
        client.LastName = this.LastName;
        client.DNI = this.DNI;
        client.Birthdate = this.Birthdate;
        client.Phone = this.Phone;
        client.Address = this.Address;
        client.City = this.City;
        client.Email = this.Email;
        client.Password = this.Password;

        var config = {
            headers: {
                'Content-Type': 'application/json;charset=utf-8;'
            }
        }

        this.Http({
            method: 'POST',
            url: '/api/Clients',
            data: client,
            config
        }).then((response) => this.OnClientAdded(response));

        this.ClearForm();
    }
    OnClientAdded(response) {
        let client = new Client(response.data);
        this.Clients.push(client);
    }

    SelectClient(client) {
        this.Name = client.Name;
        this.LastName = client.LastName;
        this.DNI = client.DNI;
        this.Birthdate = client.Birthdate;
        this.Phone = client.Phone;
        this.Address = client.Address;
        this.City = client.City;
        this.Email = client.Email;
        this.Password = client.Password;

        this.IsEditing = false;

        this.SelectedClient = client;
    }

    UpdateClient() {
        let uptclient = this.SelectedClient;
        uptclient.Name = this.Name;
        uptclient.LastName = this.LastName;
        uptclient.DNI = this.DNI;
        uptclient.Birthdate = this.Birthdate;
        uptclient.Phone = this.Phone;
        uptclient.Address = this.Address;
        uptclient.City = this.City;
        uptclient.Email = this.Email;
        uptclient.Password = this.Password;

        //$http PUT function
        this.Http({
            method: 'PUT',
            url: '/api/Clients/' + uptclient.Id,
            data: uptclient

        }).then((response) =>

            alert("Client updated successfully")

        ), ((response) =>

            alert("Error while updating client, try again!")

            );
        this.ClearForm();
    }

    CancelUpdate() {
        this.IsEditing = true;
    }

    DeleteClient(client) {
        var r = this.Window.confirm("Do you want to delete this employee?");
        if (r == true) {
            this.Http({
                method: 'DELETE',
                url: '/api/Clients/' + client.Id

            }).then((response) => {
                var index = this.Clients.indexOf(client);
                this.Clients.splice(index, 1);
                alert("Client updated successfully");

            }), ((response) => {

                alert("Error while deleting client, try again!");
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


app.component('clients',
    {
        templateUrl: "./Scripts/Views/Clients/ClientsView.html",
        controller: ClientsViewModel,
        controllerAs: "vm"
    });