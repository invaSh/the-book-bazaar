using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Books
{
    public class OrderPlaced
    {
        public Guid OrderId { get; set; }
        public Guid UserId { get; set; }
        public Billing BillingAddress { get; set; }
        public Address ShippingAddress { get; set; }
        public List<Item> Items { get; set; } = new List<Item>();
        public decimal TotalAmount { get; set; }
    }
}
