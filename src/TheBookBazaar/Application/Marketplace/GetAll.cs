using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TheBookBazaar.Domain;
using TheBookBazaar.DTOs;
using TheBookBazaar.Persistance;

namespace TheBookBazaar.Application.Marketplace
{
    public class GetAll
    {
        public class Query : IRequest<List<MarketplaceDto>>
        {
            public ClaimsPrincipal UserPrincipal { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<MarketplaceDto>>
        {
            private readonly AppDataContext _context;
            private readonly UserManager<AppUser> _userManager;
            private readonly RoleManager<AppRole> _roleManager;
            private readonly IMapper _mapper;

            public Handler(AppDataContext context, UserManager<AppUser> userManager, RoleManager<AppRole> roleManager, IMapper mapper)
            {
                _context = context;
                _userManager = userManager;
                _roleManager = roleManager;
                _mapper = mapper;
            }

            public async Task<List<MarketplaceDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _userManager.GetUserAsync(request.UserPrincipal);
                var role = (await _userManager.GetRolesAsync(user)).FirstOrDefault();
                List<Domain.Marketplace> marketplaces;
                List<MarketplaceDto> marketplaceDtos = new List<MarketplaceDto>();
                if (role == "Merchant")
                {
                    marketplaces = await _context.Marketplaces.Where(m => m.OwnerId == Guid.Parse(user.Id)).ToListAsync();
                    return _mapper.Map<List<MarketplaceDto>>(marketplaces);

                }
                marketplaces = await _context.Marketplaces.ToListAsync();
                var ownerIds = marketplaces.Select(m => m.OwnerId.ToString()).Distinct().ToList();
                var owners = await _userManager.Users
                    .Where(u => ownerIds.Contains(u.Id))
                    .ToListAsync(cancellationToken);
                var ownerMap = owners.ToDictionary(u => u.Id);
                foreach (var m in marketplaces)
                {
                    var dto = _mapper.Map<MarketplaceDto>(m);
                    if (ownerMap.TryGetValue(m.OwnerId.ToString(), out var owner))
                    {
                        dto.User = _mapper.Map<UserDto>(owner);
                    }
                    marketplaceDtos.Add(dto);
                }
                return marketplaceDtos;
            }
        }
    }
}
