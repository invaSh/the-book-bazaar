using AutoMapper;
using BookService.Application.DTOs;
using BookService.Domain;
using BookService.Infrastructure.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BookService.Application.Queries.Handlers
{
    public class GetGenreQueryHandler : IRequestHandler<GetGenre, GenreDto>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public GetGenreQueryHandler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<GenreDto> Handle(GetGenre request, CancellationToken cancellationToken)
        {
            var genre = await _context.Genres
                .Include(g => g.Books)
                .FirstOrDefaultAsync(x => x.Id == request.Id);
            return _mapper.Map<GenreDto>(genre);
        }
    }
}
