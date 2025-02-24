using System.ComponentModel.DataAnnotations.Schema;

namespace OrderService.Domain
{
    public class Order
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderNo { get; set; }
        public List<Item> Items { get; set; } = new List<Item>();
        public decimal Amount { get; set; }
        public Status Status { get; set; }
        public string Notes { get; set; }
        public string CancellationReason { get; set; }
        public Billing BillingAddress { get; set; }
        public Address ShippingAddress { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; }
        public DateTime ShippedAt { get; set; }
        public DateTime DeliveredAt { get; set; }
    }
}
           