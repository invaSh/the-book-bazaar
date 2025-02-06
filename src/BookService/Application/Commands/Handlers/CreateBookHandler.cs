using AutoMapper;
using BookService.Domain;
using BookService.Infrastructure.Data;
using MediatR;

namespace BookService.Application.Commands.Handlers
{
    public class CreateBookHandler : IRequestHandler<CreateBook, Guid>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public CreateBookHandler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<Guid> Handle(CreateBook request, CancellationToken cancellationToken)
        {
            var book = _mapper.Map<Book>(request);
            _context.Add(book);
            var success = await _context.SaveChangesAsync() > 0;
            if (!success) throw new Exception("--->Error saving book!");
            return book.Id;

        }

    }
}
