using MediatR;
using OrderService.Application.DTOs;
using OrderService.Domain;

namespace OrderService.Application.Commands
{
    public class PlaceOrder : IRequest<ResponseDto>
    {
        public Guid UserId { get; set; }
        public Billing BillingAddress { get; set; }
        public Address ShippingAddress { get; set; }
        public string Notes { get; set; }
    }
}
