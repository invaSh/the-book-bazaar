using BookService.Domain;

namespace BookService.Application.DTOs
{
    public class GenreDto
    {
        public string Name { get; set; }
        public List<string> Books { get; set; }
    }
}
