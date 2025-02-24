using AutoMapper;
using Contracts.Books;
using MassTransit;
using MediatR;
using Microsoft.EntityFrameworkCore;
using OrderService.Application.DTOs;
using OrderService.Domain;
using OrderService.Infrastructure;

namespace OrderService.Application.Commands.Handlers
{
    public class PlaceOrderHandler : IRequestHandler<PlaceOrder, ResponseDto>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IPublishEndpoint _publishEndpoint;
        public PlaceOrderHandler(DataContext context, IMapper mapper, IPublishEndpoint publishEndpoint)
        {
            _context = context;
            _mapper = mapper;
            _publishEndpoint = publishEndpoint;
        }
        public async Task<ResponseDto> Handle(PlaceOrder request, CancellationToken cancellationToken)
        {
            var order = _mapper.Map<Order>(request);
            var cart = await _context.Carts
                .Include(x => x.Items)
                .FirstOrDefaultAsync(x => x.UserId == request.UserId);
            if (cart == null || cart.Items.Count <= 0) return new ResponseDto { Type = "error", Message = "Cart is empty or not found.." };
            order.Items = cart.Items.Select(item => new Domain.Item
            {
                BookId = item.BookId,
                Quantity = item.Quantity,                      
                Price = (item.Price * item.Quantity),
            }).ToList();
            order.Amount = order.Items.Sum(i => i.Price * i.Quantity);
            order.Status = Status.Processing;
            _context.Orders.Add(order);
            _context.Carts.Remove(cart);
            await _publishEndpoint.Publish<OrderPlaced>(order);
            var res = await _context.SaveChangesAsync() > 0;
            if (!res) return new ResponseDto { Type = "error", Message = "Problem placing order.." };
            return new ResponseDto { Type = "success", Message = "Order placed successfully!" };
        }
    }
}
