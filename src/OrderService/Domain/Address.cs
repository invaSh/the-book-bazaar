namespace OrderService.Domain
{
    public class Address
    {
        public Guid Id { get; set; } 
        public Guid UserId { get; set; }
        public string FullName { get; set; } 
        public string Street { get; set; } 
        public string City { get; set; }
        public string State { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }
        public string PhoneNumber { get; set; }
        public bool IsDefault { get; set; } 
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
    }
}
