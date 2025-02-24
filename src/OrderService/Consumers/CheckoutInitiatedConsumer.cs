using AutoMapper;
using Contracts.Books;
using MassTransit;
using Microsoft.EntityFrameworkCore;
using OrderService.Domain;
using OrderService.Infrastructure;

namespace OrderService.Consumers
{
    public class CheckoutInitiatedConsumer : IConsumer<CheckoutInitiated>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public CheckoutInitiatedConsumer(DataContext context)
        {
            _context = context;
        }

        public Task Consume(ConsumeContext<CheckoutInitiated> context)
        {
            throw new NotImplementedException();
        }
    }
}
