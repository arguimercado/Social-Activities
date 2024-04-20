using Application.Features.Activities.Dtos;
using Application.Features.Comments.DTO;
using Application.Features.Photos.Dto;
using Application.Features.Profiles.Dto;
using Domain.Activities;
using Domain.Comments;
using Domain.Photos;
using Domain.Users;

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

            CreateMap<ActivityAttendee, AttendeeResponse>()
                .ForMember(a => a.UserId, opt => opt.MapFrom(c => c.AppUser.Id))
                .ForMember(a => a.Username, opt => opt.MapFrom(c => c.AppUser.UserName))
                .ForMember(a => a.Displayname, opt => opt.MapFrom(c => c.AppUser.DisplayName))
                .ForMember(a => a.Bio, opt => opt.MapFrom(c => c.AppUser.Bio))
                .ForMember(a => a.IsCancelled, opt => opt.MapFrom(c => c.Cancel.IsCancelled))
                .ForMember(a => a.DateCancelled, opt => opt.MapFrom(c => c.Cancel.Date))
                .ForMember(a => a.Image, opt => opt.MapFrom(c => c.AppUser.Photos.FirstOrDefault(o => o.IsMain).Url));

            CreateMap<Photo, PhotoResponse>();

            CreateMap<AppUser,ProfileResponse>()
                .ForMember(a => a.UserId, opt => opt.MapFrom(c => c.Id))
                .ForMember(a => a.Image, opt => opt.MapFrom(c => c.Photos.FirstOrDefault(o => o.IsMain).Url))
                .ForMember(a => a.FollowersCount, o => o.MapFrom(s => s.Followers.Count))
                .ForMember(a => a.FollowingsCount, o => o.MapFrom(s => s.Followings.Count));


            CreateMap<Comment,CommentResponse>()
                .ForMember(a => a.UserName, opt => opt.MapFrom(c => c.Author.UserName))
                .ForMember(a => a.Displayname, opt => opt.MapFrom(c => c.Author.DisplayName))
                .ForMember(a => a.Image, opt => opt.MapFrom(c => c.Author.Photos.FirstOrDefault(o => o.IsMain).Url));

        }
    }
}