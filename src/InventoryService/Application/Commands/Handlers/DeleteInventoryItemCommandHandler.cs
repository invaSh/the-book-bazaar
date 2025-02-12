using InventoryService.Domain;
using InventoryService.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace InventoryService.Application.Commands.Handlers
{
    public class DeleteInventoryItemCommandHandler : IRequestHandler<DeleteInventoryItem, int>
    {
        private readonly DataContext _context;

        public DeleteInventoryItemCommandHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(DeleteInventoryItem request, CancellationToken cancellationToken)
        {
            var inventoryItem = await _context.InventoryItems.FirstOrDefaultAsync(x =>  x.Id == request.Id);
            if (inventoryItem == null) throw new Exception("Inventory item does not exist!");
            _context.InventoryItems.Remove(inventoryItem);
            return await _context.SaveChangesAsync();
        }
    }
}
