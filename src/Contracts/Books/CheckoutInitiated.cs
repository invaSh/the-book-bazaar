using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Books
{
    public class CheckoutInitiated
    {
        public Guid UserId { get; init; }
        public List<Item> Items { get; init; }
    }
}
