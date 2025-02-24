namespace OrderService.Domain
{
    public class Billing
    {
        public Guid Id { get; set; } 
        public Guid UserId { get; set; } 
        public string CardholderName { get; set; } 
        public string CardNumberLast4 { get; set; } 
        public string ExpiryMonth { get; set; }
        public string ExpiryYear { get; set; }
        public string PaymentMethod { get; set; }
        public bool IsDefault { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
    }
}
