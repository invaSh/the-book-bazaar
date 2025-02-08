using AutoMapper;
using Contracts.Books;
using InventoryService.Domain;

namespace InventoryService.Application.Profiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<BookCreated, Book>();
        }
    }
}
