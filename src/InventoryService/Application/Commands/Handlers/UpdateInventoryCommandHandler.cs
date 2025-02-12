using InventoryService.Domain;
using InventoryService.Infrastructure;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace InventoryService.Application.Commands.Handlers
{
    public class UpdateInventoryCommandHandler : IRequestHandler<UpdateInventory, InventoryItem>
    {
        private readonly DataContext _context;

        public UpdateInventoryCommandHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<InventoryItem> Handle(UpdateInventory request, CancellationToken cancellationToken)
        {
            var inventoryItem = await _context.InventoryItems.FirstOrDefaultAsync(x => x.Id == request.Id);
            if (inventoryItem == null) throw new Exception("Inventory item doesn't exist!");
            inventoryItem.QuantityAvailable += request.Quantity;
            inventoryItem.LastRestocked = DateTime.UtcNow;
            _context.Update(inventoryItem);
            return inventoryItem;
        }
    }
}
