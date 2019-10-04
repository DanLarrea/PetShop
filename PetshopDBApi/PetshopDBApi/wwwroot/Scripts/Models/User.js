class User extends Entity {
    constructor(json)
    {
        super(json);
        if (json) {
            this.Name = json.name;
            this.LastName = json.lastName;
            this.DNI = json.dni;
            this.Email = json.email;
            this.Birthdate = json.birthdate;
            this.Address = json.address;
            this.City = json.city;
            this.Phone = json.phone;
            this.Password = json.password;
        }
        else
        {
            this.Name = "";
            this.LastName = "";
            this.DNI = "";
            this.Email = "";
            this.Birthdate = 0;
            this.Address = "";
            this.City = "";
            this.Phone = 0;
            this.Password = "";
        }
    }
}