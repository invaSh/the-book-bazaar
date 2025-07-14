using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using TheBookBazaar.Domain;
using TheBookBazaar.DTOs;
using TheBookBazaar.Middleware;
using TheBookBazaar.Persistance;
using System.Net;
using AutoMapper;
namespace TheBookBazaar.Application.Marketplace
{
    public class Create
    {
        public class Command : IRequest<MarketplaceDto>
        {
            public string Title { get; set; }
            public string Description { get; set; }
            public ClaimsPrincipal UserPrincipal { get; set; }

        }

        public class Handler : IRequestHandler<Command, MarketplaceDto>
        {
            private readonly AppDataContext _context;
            private readonly UserManager<AppUser> _userManager;
            private readonly IMapper _mapper;

            public Handler(UserManager<AppUser> userManager, AppDataContext context, IMapper mapper)
            {
                _userManager = userManager;
                _context = context;
                _mapper = mapper;
            }

            public async Task<MarketplaceDto> Handle(Command req, CancellationToken cancellationToken)
            {
                var user = await _userManager.GetUserAsync(req.UserPrincipal);
                var marketplace = new Domain.Marketplace
                {
                    Title = req.Title,
                    Description = req.Description,
                    OwnerId = new Guid(user.Id)
                };
                _context.Marketplaces.Add(marketplace);
                var results = await _context.SaveChangesAsync(cancellationToken) > 0;
                if (!results) throw new StatusException(HttpStatusCode.BadRequest, new { error = "Could not save marketplace. Try again." });

                var marketplaceDto = _mapper.Map<MarketplaceDto>(marketplace);
                marketplaceDto.User = _mapper.Map<UserDto>(user);
                return marketplaceDto;
            }
        }
    }
}
