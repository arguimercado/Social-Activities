using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class ActivityContext : DbContext
{

    public ActivityContext(DbContextOptions<ActivityContext> options) : base(options)
    {
        
    }

    public DbSet<Activity> Activites { get; set; }
    
}