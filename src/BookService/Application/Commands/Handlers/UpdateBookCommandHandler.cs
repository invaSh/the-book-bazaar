using AutoMapper;
using BookService.Domain;
using BookService.Infrastructure.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BookService.Application.Commands.Handlers
{
    public class UpdateBookCommandHandler : IRequestHandler<UpdateBook, Guid>
    {
        private readonly DataContext _context;  
        private readonly IMapper _mapper;
        public UpdateBookCommandHandler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<Guid> Handle(UpdateBook request, CancellationToken cancellationToken)
        {
            var book = await _context.Books
                .Include(b => b.Genres)
                .FirstOrDefaultAsync(x => x.Id == request.Id);
            if (book == null) throw new Exception("Book doesn't exist!");
            _mapper.Map(request, book);
            var genres = await _context.Genres
                .Where(g => request.Genres.Contains(g.Id))
                .ToListAsync(cancellationToken);
            book.Genres ??= new List<Genre>();
            book.Genres.Clear();
            foreach (var genre in genres)
            {
                book.Genres.Add(genre);
            }
            _context.Books.Update(book);
            var result = await _context.SaveChangesAsync() > 0;
            if (!result) throw new Exception("Problem updating the book!");
            return book.Id;
        }

    }
}
