using AutoMapper;
using Contracts.Books;
using MassTransit;
using MediatR;
using OrderService.Application.DTOs;
using OrderService.Domain;
using OrderService.Infrastructure;

namespace OrderService.Application.Commands.Handlers
{
    public class ChangeOrderStatusHandler : IRequestHandler<ChangeOrderStatus, ResponseDto>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IPublishEndpoint _publishEndpoint;
        public ChangeOrderStatusHandler(DataContext conetxt, IMapper mapper, IPublishEndpoint publishEndpoint)
        {
            _context = conetxt;
            _mapper = mapper;
            _publishEndpoint = publishEndpoint;
        }

        public async Task<ResponseDto> Handle(ChangeOrderStatus request, CancellationToken cancellationToken)
        {
            var order = await _context.Orders.FindAsync(request.Id);
            if (order == null) return new ResponseDto { Type = "notFound", Message = "Order doesn't exist" };
            order.Status = (Status)request.OrderStatus;
            if (request.OrderStatus.Equals("Cancelled"))
            {
                order.CancellationReason = request.CancellationReason;
                await _publishEndpoint.Publish<OrderCancelled>(new OrderCancelled { Id = order.Id, UserId = order.UserId });
            }
            var res = await _context.SaveChangesAsync() > 0;
            if (!res) return new ResponseDto { Type = "error", Message = "Error while saving" };
            return new ResponseDto { Type = "success", Message = "Order status change successfully" };
        }
    }
}
