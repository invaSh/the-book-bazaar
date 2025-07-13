using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Net;
using TheBookBazaar.Domain;
using TheBookBazaar.DTOs;
using TheBookBazaar.Middleware;
using TheBookBazaar.Persistance;

namespace TheBookBazaar.Application.Auth
{
    public class Register
    {
        public class Command : IRequest<AppUser>
        {
            public string FullName { get; set; }
            public string Email { get; set; }
            public string UserName { get; set; }
            public string Password { get; set; }
            public string ConfirmPassword { get; set; }
        }

        public class Handler : IRequestHandler<Command, AppUser>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly IMapper _mapper;

            public Handler(UserManager<AppUser> userManager, AppDataContext context, IMapper mapper)
            {
                _userManager = userManager;
                _mapper = mapper;
            }

            public async Task<AppUser> Handle(Command req, CancellationToken cancellationToken)
            {
                if ((await _userManager.FindByEmailAsync(req.Email) != null))
                    throw new StatusException(HttpStatusCode.BadRequest, new { Email = "This email is taken!" });
                if ((await _userManager.FindByNameAsync(req.UserName)) != null)
                    throw new StatusException(HttpStatusCode.BadRequest, new { UserName = "This username is taken!" });
                if(req.Password != req.ConfirmPassword)
                    throw new StatusException(HttpStatusCode.BadRequest, new { Password = "Passwords don't match!" });

                var user = new AppUser
                {
                    UserName = req.UserName,
                    FullName = req.Email,
                    Email = req.Email,
                };

                var result = await _userManager.CreateAsync(user, req.Password);
                if (!result.Succeeded)
                    throw new StatusException(HttpStatusCode.BadRequest, new { errors = result.Errors});

                return user;
            }

        }
    }
}
