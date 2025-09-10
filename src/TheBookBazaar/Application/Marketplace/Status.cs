using MediatR;
using TheBookBazaar.Middleware;
using TheBookBazaar.Persistance;

namespace TheBookBazaar.Application.Marketplace
{
    public class ToggleStatus
    {
        public class Command : IRequest<Unit>
        {
            public Guid Id { get; set; }  // Only need the marketplace Id
        }

        public class Handler : IRequestHandler<Command, Unit>
        {
            private readonly AppDataContext _context;

            public Handler(AppDataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var marketplace = await _context.Marketplaces.FindAsync(request.Id)
                    ?? throw new StatusException(System.Net.HttpStatusCode.NotFound, new { error = "Marketplace does not exist." });

                if ((marketplace.Books == null || !marketplace.Books.Any())
                    && marketplace.Status == Domain.Status.Closed)
                {
                    throw new StatusException(System.Net.HttpStatusCode.BadRequest, new { error = "Cannot open marketplace with no books" });
                }

                marketplace.Status = marketplace.Status == Domain.Status.Closed
                    ? Domain.Status.Open
                    : Domain.Status.Closed;

                await _context.SaveChangesAsync(cancellationToken);
                return Unit.Value;
            }
        }
    }
}
