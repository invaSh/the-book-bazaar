using TheBookBazaar.Domain;

namespace TheBookBazaar.DTOs
{
    public class MarketplaceDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public UserDto User { get; set; }
        public List<BookDto> Books { get; set; }
    }
}
