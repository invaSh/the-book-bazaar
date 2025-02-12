using InventoryService.Domain;
using InventoryService.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace InventoryService.Application.Queries.Handlers
{
    public class GetInventoryQueryHandler : IRequestHandler<GetInventory, List<InventoryItem>>
    {
        private readonly DataContext _context;

        public GetInventoryQueryHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<List<InventoryItem>> Handle(GetInventory request, CancellationToken cancellationToken)
        {
            var inventory = await _context.InventoryItems.ToListAsync();
            return inventory;
        }
    }
}
