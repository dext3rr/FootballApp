using AutoMapper;
using FootballApp.Dtos;
using FootballApp.Models;

namespace FootballApp.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>();
            CreateMap<PlayerForUpdateDto, Player>();
        }
    }
}