using BookService.Application.DTOs;
using BookService.Domain;
using MediatR;

namespace BookService.Application.Queries
{
    public class GetBooks : IRequest<List<DTOs.Guid>>
    {
        public  List<Book> Books { get; set; }
    }
}
