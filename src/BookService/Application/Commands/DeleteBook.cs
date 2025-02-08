using MediatR;

namespace BookService.Application.Commands
{
    public class DeleteBook : IRequest<Guid>
    {
        public Guid Id { get; set; }
    }
}
