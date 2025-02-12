using MediatR;

namespace InventoryService.Application.Commands
{
    public class DeleteInventoryItem : IRequest<int>
    {
        public Guid Id { get; set; }
    }
}
