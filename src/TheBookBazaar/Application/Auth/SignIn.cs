using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Net;
using TheBookBazaar.Domain;
using TheBookBazaar.Middleware;
using TheBookBazaar.Persistance;

namespace TheBookBazaar.Application.Auth
{
    public class SignIn 
    {
        public class Command : IRequest<AppUser>
        {
            public string Identifier { get; set; }
            public string Password { get; set; }
        }

        public class Handler : IRequestHandler<Command, AppUser>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly SignInManager<AppUser> _signInManager;

            public Handler(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
            {
                _userManager = userManager;
                _signInManager = signInManager;
            }

            public async Task<AppUser> Handle(Command req, CancellationToken cancellationToken)
            {
                AppUser user;
                if(req.Identifier.Contains("@")) user = await _userManager.FindByEmailAsync(req.Identifier);
                else user = await _userManager.FindByNameAsync(req.Identifier);
                if(user == null)
                    throw new StatusException(HttpStatusCode.BadRequest, new { error = "Invalid Indentifier!" });

                var result = await _signInManager.CheckPasswordSignInAsync(user, req.Password, false);
                if (!result.Succeeded)
                    throw new StatusException(HttpStatusCode.Unauthorized, new { error = "Given password is incorrect!" });
                return user;
            }
        }
    }
}
