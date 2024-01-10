using Application.Features.Activities.Dtos;
using AutoMapper;
using Domain.Activities;

namespace Application.Core.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<ActivityRequest, Activity>()
                .ForMember(a => a.Id, opt => opt.Ignore());
            
            CreateMap<Activity,ActivityResponse>()
                .ForMember(a => a.Id,opt => opt.MapFrom(c => c.Id.ToString()))
                .ForMember(a => a.IsCancelled, opt => opt.MapFrom(c => c.Cancel.IsCancelled))
                .ForMember(a => a.HostUsername, opt => opt.MapFrom(c => c.Attendees.FirstOrDefault(x => x.IsHost).AppUser.UserName));
                

            CreateMap<ActivityAttendee, ProfileResponse>()
                .ForMember(a => a.UserId, opt => opt.MapFrom(c => c.AppUser.Id))
                .ForMember(a => a.Username, opt => opt.MapFrom(c => c.AppUser.UserName))
                .ForMember(a => a.Displayname, opt => opt.MapFrom(c => c.AppUser.DisplayName))
                .ForMember(a => a.Bio, opt => opt.MapFrom(c => c.AppUser.Bio))
                .ForMember(a => a.IsCancelled, opt => opt.MapFrom(c => c.Cancel.IsCancelled))
                .ForMember(a => a.DateCancelled, opt => opt.MapFrom(c => c.Cancel.Date));
        }
    }
}