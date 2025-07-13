using AutoMapper;
using TheBookBazaar.Domain;
using TheBookBazaar.DTOs;

namespace TheBookBazaar.Profiles
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<AppUser, UserDto>();

        }
    }
}
