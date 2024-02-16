using Domain.Activities;
using Domain.Contracts;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Repositories;

public class ActivityRepository : IActivityRepository
{
    private readonly ActivityContext _context;
    public DbSet<Activity> Activites => _context.Activites;

    public ActivityRepository(ActivityContext context)
    {
        _context = context;
    }

    public void Create(Activity activity)
    {
        _context.Activites.Add(activity);
       
    }

    public void Delete(Activity activity)
    {
        _context.Activites.Remove(activity);
       
    }

   

    public async Task<IEnumerable<Activity>> GetAll(CancellationToken cancellationToken = default)
    {
        return await _context.Activites
                        .AsNoTracking()
                        .Include(x => x.Attendees)
                            .ThenInclude(x => x.AppUser)
                                .ThenInclude(x => x.Photos)
                        .ToListAsync();
    }

     public async Task<Activity> GetActivityWithAttendees(string id,bool trackChanges = false)
    {

        var query = trackChanges ? _context.Activites.AsTracking() : _context.Activites.AsNoTracking();

        return await query
                        .Include(x => x.Attendees)
                        .ThenInclude(x => x.AppUser)
                        .ThenInclude(x => x.Photos)
                        .Where(x => x.Id == Guid.Parse(id))
                        .FirstOrDefaultAsync();
    }

    

    public async Task<Activity> GetById(string id)
    {
       return await _context.Activites
                        .FindAsync(Guid.Parse(id));
    }

    public void Update(Activity activity)
    {
        _context.Activites.Update(activity);
       
    }
}