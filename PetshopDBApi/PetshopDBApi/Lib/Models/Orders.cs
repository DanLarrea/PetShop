using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PetshopDBApi
{
    public class Orders: Entity
    {
        public DateTime? Date { get; set; }
        public Guid ClientId { get; set; }
        public Client Client { get; set; }
        
    }
}
