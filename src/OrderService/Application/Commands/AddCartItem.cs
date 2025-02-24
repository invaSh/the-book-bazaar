using OrderService.Domain;
using MediatR;

namespace OrderService.Application.Commands
{
    public class AddCartItem : IRequest<Unit>
    {
        public Guid UserId { get; set; }
        public Guid BookId { get; set; }
        public int Quantity { get; set; }
    }
}
