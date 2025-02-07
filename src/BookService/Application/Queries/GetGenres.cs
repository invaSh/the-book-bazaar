using BookService.Application.DTOs;
using BookService.Domain;
using MediatR;

namespace BookService.Application.Queries
{
    public class GetGenres :IRequest<List<GenreDto>>
    {
        public List<Genre> Genres { get; set; }
    }
}
