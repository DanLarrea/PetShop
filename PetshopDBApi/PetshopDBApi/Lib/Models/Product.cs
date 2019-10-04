using System;
using System.Collections.Generic;
using System.Text;

namespace PetshopDBApi
{
    public class Product : Entity
    {
        public string Category { get; set; }
        public string Title { get; set; }
        public string Brand { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }
    }
}
