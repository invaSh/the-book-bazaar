using InventoryService.Domain;
using MediatR;

namespace InventoryService.Application.Queries
{
    public class GetInventory : IRequest<List<InventoryItem>>
    {
    }
}
