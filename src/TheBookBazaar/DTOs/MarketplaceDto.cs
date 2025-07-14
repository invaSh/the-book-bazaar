using TheBookBazaar.Domain;

namespace TheBookBazaar.DTOs
{
    public class MarketplaceDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public DateTime OpenDate { get; set; }
        public DateTime CloseDate { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public UserDto User { get; set; }
        public List<BookDto> Books { get; set; }
    }
}
