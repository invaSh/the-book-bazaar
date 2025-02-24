using AutoMapper;
using Contracts.Books;
using OrderService.Domain;

namespace OrderService.Application.Profiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CheckoutInitiated, Order>();
        }
    }
}
