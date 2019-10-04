using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PetshopDBApi
{
    public class OrderItems : Entity
    {
        public Guid OrderId { get; set; }
        public Orders Order { get; set; }
        public ICollection<Product> Products { get; set; }
        public Product Product { get; set; }
        public int Quantity { get; set; }
    }
}
