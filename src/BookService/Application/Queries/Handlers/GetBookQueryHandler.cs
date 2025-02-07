using BookService.Domain;
using BookService.Infrastructure.Data;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace BookService.Application.Queries.Handlers
{
    public class GetBookQueryHandler : IRequestHandler<GetBook, Book>
    {
        private readonly DataContext _context;

        public GetBookQueryHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<Book> Handle(GetBook request, CancellationToken cancellationToken)
        {
            var book = await _context.Books.FirstOrDefaultAsync(x => x.Id == request.Id);
            return book;
        }
    }
}
