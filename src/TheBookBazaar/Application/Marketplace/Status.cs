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
                marketplace.Status = (Domain.Status)request.Status;
                await _context.SaveChangesAsync();  
                return Unit.Value;
            }
        }
    }
}
