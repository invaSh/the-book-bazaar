using OrderService.Domain;
using OrderService.Infrastructure;
using MediatR;

namespace OrderService.Application.Commands.Handlers
{
    public class AddCartItemHandler : IRequestHandler<AddCartItem, Unit>
    {
        private readonly DataContext _context;

        public AddCartItemHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(AddCartItem request, CancellationToken cancellationToken)
        {
            var cart = await _context.Carts.FindAsync(request.UserId);
            if (cart == null)
            {
                cart = new Cart
                {
                    UserId = request.UserId,
                    Items = new List<Item>()
                };
                _context.Carts.Add(cart);
            }
            var existingItem = cart.Items.FirstOrDefault(i => i.BookId == request.BookId);
            if (existingItem != null) { existingItem.Quantity += request.Quantity; }
            else { cart.Items.Add(new Item { BookId = request.BookId, Quantity = request.Quantity }); }
            await _context.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}
