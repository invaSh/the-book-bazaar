using InventoryService.Domain;
using MediatR;

namespace InventoryService.Application.Queries
{
    public class GetInventoryItem : IRequest<InventoryItem>
    {
        public Guid Id { get; set; }
    }
}
