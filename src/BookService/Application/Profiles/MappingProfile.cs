using BookService.Application.Commands;
using BookService.Domain;
using AutoMapper;


namespace BookService.Application.Profiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CreateBook, Book>();

        }
    }
}
