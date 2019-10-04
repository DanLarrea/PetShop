using System;
using System.Collections.Generic;
using System.Text;

namespace PetshopDBApi
{
    public class Employee : User
    {
        public string Area { get; set; }
        public string JobTitle { get; set; }
    }
}
