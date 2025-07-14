using FluentValidation;
using MediatR;
using TheBookBazaar.Middleware;
using TheBookBazaar.Persistance;

namespace TheBookBazaar.Application.Marketplace
{
    public class Status
    {
        public class Command : IRequest<Unit>
        {
            public Guid Id { get; set; }
            public int Status { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Status)
                 .InclusiveBetween(0, 1)
                 .WithMessage("Status is invalid.");
            }
        }

        public class Handler : IRequestHandler<Command, Unit>
        {
            private readonly AppDataContext _context;
            private readonly IValidator<Command> _validator;


            public Handler(AppDataContext context, IValidator<Command> validator)
            {
                _context = context;
                _validator = validator;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var validationResult = await _validator.ValidateAsync(request, cancellationToken);
                if (!validationResult.IsValid)
                {
                    var errors = validationResult.Errors
                        .GroupBy(e => e.PropertyName)
                        .ToDictionary(
                            g => g.Key,
                            g => g.First().ErrorMessage 
                        );

                    throw new StatusException(System.Net.HttpStatusCode.BadRequest, new
                    {
                        status = "ValidationFailed",
                        errors = errors
                    });
                }
                var marketplace = await _context.Marketplaces.FindAsync(request.Id)
                    ?? throw new StatusException(System.Net.HttpStatusCode.NotFound, new { error = "Marketplace does not exist." });
                marketplace.Status = (Domain.Status)request.Status;
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}
