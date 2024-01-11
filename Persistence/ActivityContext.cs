using Domain.Activities;
using Domain.Contracts;
using Domain.Photos;
using Domain.Users;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Persistence.Configurations;

namespace Persistence;

public class ActivityContext : IdentityDbContext<AppUser>, IActivityContext
{

    public ActivityContext(DbContextOptions<ActivityContext> options) : base(options)
    {
        
    }

    public DbSet<Activity> Activites { get; set; }
    public DbSet<ActivityAttendee> ActivityAttendees { get; set; }

    public DbSet<Photo> Photos { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.ApplyConfiguration(new ActivityConfiguration());
        builder.ApplyConfiguration(new ActivityAttendeeConfiguration());
        builder.ApplyConfiguration(new AppUserConfiguration());
    }
}