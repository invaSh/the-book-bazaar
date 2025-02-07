using BookService.Application.DTOs;
using BookService.Domain;
using MediatR;

namespace BookService.Application.Queries
{
    public class GetGenre:IRequest<GenreDto>
    {
        public int Id { get; set; }
    }
}
