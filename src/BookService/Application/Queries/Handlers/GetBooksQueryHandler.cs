using AutoMapper;
using BookService.Application.DTOs;
using BookService.Domain;
using BookService.Infrastructure.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BookService.Application.Queries.Handlers
{
    public class GetBooksQueryHandler : IRequestHandler<GetBooks, List<DTOs.Guid>>
    {                                                            
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public GetBooksQueryHandler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<DTOs.Guid>> Handle(GetBooks request, CancellationToken cancellationToken)
        {
            var books = await _context.Books
                .Include(b => b.Genres)
                .ToListAsync();

            return _mapper.Map<List<Book>, List<DTOs.Guid>>(books);
        }
    }
}
