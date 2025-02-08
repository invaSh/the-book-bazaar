using BookService.Application.Commands;
using BookService.Domain;
using AutoMapper;
using BookService.Application.DTOs;
using Contracts.Books;


namespace BookService.Application.Profiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CreateBook, Book>();
            CreateMap<Book, DTOs.Guid>()
                .ForMember(dest => dest.Genres, opt => opt.MapFrom(src => src.Genres.Select(g => g.Name).ToList()));
            CreateMap<Genre, GenreDto>()
                .ForMember(dest => dest.Books, opt => opt.MapFrom(src => src.Books.Select(b => b.Title).ToList()));
            CreateMap<UpdateBook, Book>()
                .ForMember(dest => dest.Genres, opt => opt.Ignore());
            CreateMap<Book, BookCreated>();

        }
    }
}
