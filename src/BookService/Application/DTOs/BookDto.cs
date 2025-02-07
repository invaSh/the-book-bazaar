using BookService.Domain;

namespace BookService.Application.DTOs
{
    public class Guid
    {
        public string ISBN { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Publisher { get; set; }
        public int PublicationYear { get; set; }
        public string Format { get; set; }
        public int PageNumber { get; set; }
        public decimal Price { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
        public string Condition { get; set; }
        public List<string> Genres { get; set; }
    }
}
