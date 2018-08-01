using AutoMapper;
using stakeway.Api.Controllers.Resources;
using stakeway.Api.Models;
using System.Collections.Generic;

namespace stakeway.Api.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<GameResource, Game>();
            CreateMap<List<Game>, GameResource>();
            CreateMap<GameTypeResource, GameType>();
            CreateMap<GameResource, List<GameType>>();
        }
    }
}
