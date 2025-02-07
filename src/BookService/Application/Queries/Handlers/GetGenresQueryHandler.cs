using AutoMapper;
using BookService.Application.DTOs;
using BookService.Infrastructure.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BookService.Application.Queries.Handlers
{
    public class GetGenresQueryHandler : IRequestHandler<GetGenres, List<GenreDto>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public GetGenresQueryHandler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<GenreDto>> Handle(GetGenres request, CancellationToken cancellationToken)
        {
            var genres = await _context.Genres
                .Include(g => g.Books)
                .ToListAsync();
            return _mapper.Map<List<GenreDto>>(genres);
        }
    }
}
