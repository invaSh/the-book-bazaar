using InventoryService.Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace InventoryService.Application.Commands
{
    public class UpdateInventory : IRequest<InventoryItem>
    {
        public Guid Id { get; set; }
        public Guid BookId { get; set; }
        public int Quantity { get; set; }
    }
}                      