using AutoMapper;
using TheBookBazaar.Domain;
using TheBookBazaar.DTOs;
using TheBookBazaar.Application;

namespace TheBookBazaar.Profiles
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<AppUser, UserDto>();
            CreateMap<Marketplace, MarketplaceDto>();

        }
    }
}
