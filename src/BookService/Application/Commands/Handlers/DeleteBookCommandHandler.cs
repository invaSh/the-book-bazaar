using BookService.Infrastructure.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BookService.Application.Commands.Handlers
{
    public class DeleteBookCommandHandler : IRequestHandler<DeleteBook, Guid>
    {
        private readonly DataContext _context;
        public DeleteBookCommandHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<Guid> Handle(DeleteBook request, CancellationToken cancellationToken)
        {
            var book = await _context.Books.FirstOrDefaultAsync(x => x.Id == request.Id);
            _context.Books.Remove(book);
            var result = await _context.SaveChangesAsync() > 0;
            if (!result) throw new Exception("Problem deleting the book!");
            return book.Id;
        }
    }
}
