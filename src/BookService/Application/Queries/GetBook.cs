using BookService.Domain;
using MediatR;

namespace BookService.Application.Queries
{
    public class GetBook: IRequest<Book>
    {
        public Guid Id { get; set; }
    }
}
