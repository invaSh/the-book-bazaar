using AutoMapper;
using BookService.Domain;
using BookService.Infrastructure.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace BookService.Application.Commands.Handlers
{
    public class CreateBookCommandHandler : IRequestHandler<CreateBook, Guid>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public CreateBookCommandHandler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<Guid> Handle(CreateBook request, CancellationToken cancellationToken)
        {
            var genres = await _context.Genres
            .Where(g => request.GenreIds.Contains(g.Id))
            .ToListAsync();
            if (genres.Count != request.GenreIds.Count) throw new Exception("One ore more genres not found!");
            var book = _mapper.Map<Book>(request);
            book.Genres ??= new List<Genre>();
            _context.Books.Add(book);
            foreach(var genre in genres)
            {
                book.Genres.Add(genre);
            }
            await _context.SaveChangesAsync(cancellationToken);
            return book.Id;
        }

    }
}
