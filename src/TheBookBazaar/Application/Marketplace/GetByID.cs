using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Net;
using TheBookBazaar.Domain;
using TheBookBazaar.DTOs;
using TheBookBazaar.Middleware;
using TheBookBazaar.Persistance;

namespace TheBookBazaar.Application.Marketplace
{
    public class GetByID
    {
        public class Query : IRequest<MarketplaceDto>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, MarketplaceDto>
        {
            private readonly AppDataContext _context;
            private readonly UserManager<AppUser> _userManager;
            private readonly IMapper _mapper;
            public Handler(AppDataContext context, IMapper mapper, UserManager<AppUser> userManager)
            {
                _context = context;
                _mapper = mapper;
                _userManager = userManager;
            }

            public async Task<MarketplaceDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var marketplace = await _context.Marketplaces.FindAsync(request.Id)
                    ?? throw new StatusException(HttpStatusCode.NotFound, new { error = "Marketplace does not exist." });
                var user = await _userManager.FindByIdAsync(marketplace.OwnerId.ToString());
                var marketplaceDto   = _mapper.Map<MarketplaceDto>(marketplace);
                marketplaceDto.User = _mapper.Map<UserDto>(user);
                return marketplaceDto;
            }
        }

    }
}
