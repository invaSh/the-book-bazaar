using MediatR;

namespace BookService.Application.Commands
{
    public class CreateGenre : IRequest<int>
    {
        public string Name { get; set; }
    }
}
