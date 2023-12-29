using Application.Features.Activities.Dtos;
using AutoMapper;
using Domain;

namespace Application.Core.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<ActivityRequest, Activity>();
        }
    }
}