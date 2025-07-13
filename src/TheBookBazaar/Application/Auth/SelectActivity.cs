using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using TheBookBazaar.Domain;
using TheBookBazaar.DTOs;
using TheBookBazaar.Services;

namespace TheBookBazaar.Application.Auth
{
    public class SelectActivity
    {
        public class Command : IRequest<AuthResponse>
        {
            public int ActivityIndex { get; set; }
            public ClaimsPrincipal UserPrincipal { get; set; }
        }

        public class Handler : IRequestHandler<Command, AuthResponse>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly RoleManager<AppRole> _roleManager;
            private readonly TokenService _tokenService;
            public async Task<AuthResponse> Handle(Command req, CancellationToken cancellationToken)
            {
                var user = await _userManager.GetUserAsync(req.UserPrincipal);
                if (user == null) throw new UnauthorizedAccessException();

                var role = _roleManager.Roles.FirstOrDefault(r => r.Index == req.ActivityIndex);
                if (role == null) throw new Exception("Invalid activity index.");

                await _userManager.AddToRoleAsync(user, role.Name);

                var tokens = await _tokenService.GenerateTokens(user);

                return new AuthResponse
                {
                    AccessToken = tokens.AccessToken,
                    RefreshToken = tokens.RefreshToken
                };
            }
        }
    }
}
