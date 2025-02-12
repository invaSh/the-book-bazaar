using InventoryService.Domain;
using InventoryService.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace InventoryService.Application.Queries.Handlers
{
    public class GetInventoryItemQueryHandler : IRequestHandler<GetInventoryItem, InventoryItem>
    {
        private readonly DataContext _context;

        public GetInventoryItemQueryHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<InventoryItem> Handle(GetInventoryItem request, CancellationToken cancellationToken)
        {
            var inventoryItem = await _context.InventoryItems.FirstOrDefaultAsync(x => x.Id == request.Id); 
            return inventoryItem;
        }
    }
}
