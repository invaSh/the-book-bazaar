using BookService.Domain;
using BookService.Infrastructure.Data;
using MediatR;

namespace BookService.Application.Commands.Handlers
{
    public class CreateGenreCommandHandler : IRequestHandler<CreateGenre, int>
    {
        private readonly DataContext _context;

        public CreateGenreCommandHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(CreateGenre request, CancellationToken cancellationToken)
        {
            var genre = new Genre { Name = request.Name };
            _context.Add(genre);
            var result = await _context.SaveChangesAsync() > 0;
            if (!result) throw new Exception("Problem adding genre!");
            return genre.Id;
        }
    }
}
