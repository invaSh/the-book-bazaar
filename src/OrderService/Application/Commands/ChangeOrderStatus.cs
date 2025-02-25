using MediatR;
using OrderService.Application.DTOs;

namespace OrderService.Application.Commands
{
    public class ChangeOrderStatus : IRequest<ResponseDto>
    {
        public Guid Id { get; set; }
        public int OrderStatus { get; set; }
        public string CancellationReason { get; set; }
    }
}
