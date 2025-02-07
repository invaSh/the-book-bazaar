using BookService.Infrastructure.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BookService.Application.Commands.Handlers
{
    public class DeleteGenreCommandHandler : IRequestHandler<DeleteGenre, int>
    {
        private readonly DataContext _context;
        public DeleteGenreCommandHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<int> Handle(DeleteGenre request, CancellationToken cancellationToken)
        {
            var genre = await _context.Genres
                .Include(g => g.Books)
                .FirstOrDefaultAsync(x => x.Id == request.Id);
            if (genre == null) throw new Exception("Genre doesn't exist!");
            genre.Books.Clear();
            _context.Genres.Remove(genre);
            var result = await _context.SaveChangesAsync() > 0;
            if (!result) throw new Exception("Problem deleting genre!");
            return genre.Id;
        }
    }
}
