using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using TheBookBazaar.Domain;
using TheBookBazaar.DTOs;
using TheBookBazaar.Middleware;
using TheBookBazaar.Persistance;
using System.Net;
using AutoMapper;
using FluentValidation;
namespace TheBookBazaar.Application.Marketplace
{
    public class Create
    {
        public class Command : IRequest<MarketplaceDto>
        {
            public string Title { get; set; }
            public string Description { get; set; }
            public DateTime? OpenDate { get; set; }
            public DateTime? CloseDate { get; set; }
            public ClaimsPrincipal UserPrincipal { get; set; }

        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title)
                    .MinimumLength(8).WithMessage("Title is required/too short.");
                RuleFor(x => x.Description)
                    .MinimumLength(8).WithMessage("Description is required/too short.");
                RuleFor(x => x.OpenDate)
                 .Must(d => d == null || d.Value.Date >= DateTime.Today)
                 .WithMessage("Opening date must be today or in the future.");

                RuleFor(x => x.CloseDate)
                    .Must(d => d == null || d.Value.Date >= DateTime.Today)
                    .WithMessage("Close date must be today or in the future.");
            }
        }

        public class Handler : IRequestHandler<Command, MarketplaceDto>
        {
            private readonly AppDataContext _context;
            private readonly UserManager<AppUser> _userManager;
            private readonly IMapper _mapper;
            private readonly IValidator<Command> _validator;

            public Handler(UserManager<AppUser> userManager, AppDataContext context, IMapper mapper, IValidator<Command> validator)
            {
                _userManager = userManager;
                _context = context;
                _mapper = mapper;
                _validator = validator;
            }


            public async Task<MarketplaceDto> Handle(Command req, CancellationToken cancellationToken)
            {
                var validationResult = await _validator.ValidateAsync(req, cancellationToken);
                if (!validationResult.IsValid)
                {
                    var errors = validationResult.Errors
                        .GroupBy(e => e.PropertyName)
                        .ToDictionary(
                            g => g.Key,
                            g => g.First().ErrorMessage 
                        );


                    throw new StatusException(HttpStatusCode.BadRequest, new
                    {
                        Status = "ValidationFailed",
                        Errors = errors
                    });
                }
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
