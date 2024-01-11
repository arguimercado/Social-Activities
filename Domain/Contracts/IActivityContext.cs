using Domain.Activities;
using Domain.Photos;
using Domain.Users;
using Microsoft.EntityFrameworkCore;

namespace Domain.Contracts;

public interface IActivityContext
{
    DbSet<Activity> Activites { get; set; }
    DbSet<ActivityAttendee> ActivityAttendees { get; set; }

    DbSet<Photo> Photos { get; set; }

    DbSet<AppUser> Users { get; set; }

}