using BookService.Domain;
using MediatR;

namespace BookService.Application.Commands
{
    public class UpdateBook : IRequest<Guid>
    {
        public Guid Id { get; set; }
        public string ISBN { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Publisher { get; set; }
        public int PublicationYear { get; set; }
        public Genre Genre { get; set; }
        public string Format { get; set; }
        public int PageNumber { get; set; }
        public decimal Price { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
        public BookCondition Condition { get; set; }
        public List<int> Genres { get; set; }
    }
}
