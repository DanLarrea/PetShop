class EmployeesViewModel {
    constructor($http, $window, $document) {
        this.Employees = [];
        this.Http = $http;
        this.Window = $window;
        this.GetAllEmployees();
        this.Document = $document
        this.GridOptions =
            {
                enableFiltering: false,
                data: 'vm.Employees',
                appScopeProvider: this,
                columnDefs: [
                    { name: 'Name', field: 'Name', minWidth: 100 },
                    { name: 'Lastname', field: 'LastName' },
                    { name: 'DNI', field: 'DNI' },
                    { name: 'Birthdate', field: 'Birthdate' },
                    { name: 'Phone', field: 'Phone'},
                    { name: 'Address', field: 'Address' },
                    { name: 'City', field: 'City' },
                    { name: 'Email', field: 'Email'},
                    { name: 'Password', field: 'Password'},
                    { name: 'Area', field: 'Area' },
                    { name: 'JobTitle', field: 'JobTitle'},
                    {
                        name: 'Edit', field: 'Id', maxWidth: 70, cellTemplate: '<button class="btn btn-success btn-sm" style="width:100%; padding:1px" ng-click="grid.appScope.SelectEmployee(row.entity)">Edit</button>'
                    },
                    {
                        name: 'Delete', field: 'Id', maxWidth: 70, cellTemplate: '<button class="btn btn-danger btn-sm" style="width:100%; padding:1px" ng-click="grid.appScope.DeleteEmployee(row.entity)">Delete</button>'
                    }
                ]
            };
        this.IsEditing = true;

        this.SelectedEmployee = "";

    };
    GetAllEmployees() {
        this.Http.get("/api/Employees")
            .then((response) => {
                this.OnGetData(response);
            });
    }

    OnGetData(response) {
        for (let i in response.data) {
            let jsonEmployee = response.data[i];
            this.Employees.push(new Employee(jsonEmployee));
        }
    };

    AddNewEmployee() {
        let employee = new Employee();
        employee.Name = this.Name;
        employee.LastName = this.LastName;
        employee.DNI = this.DNI;
        employee.Birthdate = this.Birthdate;
        employee.Phone = this.Phone;
        employee.Address = this.Address;
        employee.City = this.City;
        employee.Email = this.Email;
        employee.Password = this.Password;
        employee.Area = this.Area;
        employee.JobTitle = this.JobTitle;

        var config = {
            headers: {
                'Content-Type': 'application/json;charset=utf-8;'
            }
        }

        this.Http({
            method: 'POST',
            url: '/api/Employees',
            data: employee,
            config
        }).then((response) => this.OnEmployeeAdded(response));

        this.ClearForm();
    }
    OnEmployeeAdded(response) {
        let employee = new Employee(response.data);
        this.Employees.push(employee);
    }

    SelectEmployee(employee) {
        this.Name = employee.Name;
        this.LastName = employee.LastName;
        this.DNI = employee.DNI;
        this.Birthdate = employee.Birthdate;
        this.Phone = employee.Phone;
        this.Address = employee.Address;
        this.City = employee.City;
        this.Email = employee.Email;
        this.Password = employee.Password;
        this.Area = employee.Area;
        this.JobTitle = employee.JobTitle;

        this.IsEditing = false;

        this.SelectedEmployee = employee;
    }

    UpdateEmployee() {
        let uptemployee = this.SelectedEmployee;
        uptemployee.Name = this.Name;
        uptemployee.LastName = this.LastName;
        uptemployee.DNI = this.DNI;
        uptemployee.Birthdate = this.Birthdate;
        uptemployee.Phone = this.Phone;
        uptemployee.Address = this.Address;
        uptemployee.City = this.City;
        uptemployee.Email = this.Email;
        uptemployee.Password = this.Password;
        uptemployee.Area = this.Area;
        uptemployee.JobTitle = this.JobTitle;
        //$http PUT function
        this.Http({
            method: 'PUT',
            url: '/api/Employees/' + uptemployee.Id,
            data: uptemployee

        }).then((response) =>

            alert("Employee updated successfully")

        ), ((response) =>

            alert("Error while updating employee try again!")

            );
        this.ClearForm();
    }

    CancelUpdate() {
        this.IsEditing = true;
    }

    DeleteEmployee(employee) {
        var r = this.Window.confirm("Do you want to delete this employee?");
        if (r == true) {
            this.Http({
                method: 'DELETE',
                url: '/api/Employees/' + employee.Id

            }).then((response) => {
                var index = this.Employees.indexOf(employee);
                this.Employees.splice(index, 1);
                alert("Employee deleted successfully");

            }), ((response) => {

                alert("Error while deleting employee try again!");
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
        this.Email ="";
        this.Password = "";
        this.Area = "";
        this.JobTitle = "";

        this.IsEditing = true;
    }
};


app.component('employees',
    {
        templateUrl: "./Scripts/Views/Employees/EmployeesView.html",
        controller: EmployeesViewModel,
        controllerAs: "vm"
    });