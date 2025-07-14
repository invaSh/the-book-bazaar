namespace TheBookBazaar.Domain
{
    public class Marketplace
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime? OpenDate { get; set; }
        public DateTime? CloseDate { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public Status Status { get; set; }
        public Guid OwnerId { get; set; }
        public ICollection<Book> Books { get; set; }
    }

    public enum Status
    {
        Closed,
        Open,
    }
}
