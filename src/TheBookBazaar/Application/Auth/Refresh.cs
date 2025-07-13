using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Net;
using TheBookBazaar.Domain;
using TheBookBazaar.DTOs;
using TheBookBazaar.Middleware;

namespace TheBookBazaar.Application.Auth
{
    public class Refresh 
    {
        public class Query : IRequest<UserRolesDto>
        {
            public RefreshToken VerifyToken;
        }

        public class Handler : IRequestHandler<Query, UserRolesDto>
        {
            private readonly UserManager<AppUser> _userManager;

            public Handler(UserManager<AppUser> userManager)
            {
                _userManager = userManager;
            }

            public async Task<UserRolesDto> Handle(Query req, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByIdAsync(req.VerifyToken.UserId);
                if (user == null) throw new StatusException(HttpStatusCode.BadRequest, new { error  = "User is null!"});
                var roles = await _userManager.GetRolesAsync(user);
                return new UserRolesDto
                {
                    User = user,
                    Roles = roles.ToList()
                };
            }
        }
    }
}
