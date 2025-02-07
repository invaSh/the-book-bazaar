using MediatR;

namespace BookService.Application.Commands
{
    public class DeleteGenre : IRequest<int>
    {
        public int Id { get; set; }
    }
}
