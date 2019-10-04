using System;
using System.Collections.Generic;
using System.Text;

namespace PetshopDBApi
{
    public class User : Entity
    {
        public string Name { get; set; }
        public string LastName { get; set; }
        public string DNI { get; set; }
        public string Email { get; set; }
        public DateTime? Birthdate { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public int Phone { get; set; }
        public string Password { get; set; }

    }
}
