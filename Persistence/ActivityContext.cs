using Domain;
using Domain.Users;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class ActivityContext : IdentityDbContext<AppUser>
{

    public ActivityContext(DbContextOptions<ActivityContext> options) : base(options)
    {
        
    }

    public DbSet<Activity> Activites { get; set; }
    
}