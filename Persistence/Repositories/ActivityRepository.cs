using Domain;
using Domain.Contracts;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Repositories;

public class ActivityRepository : IActivityRepository
{
    private readonly ActivityContext _context;

    public ActivityRepository(ActivityContext context)
    {
        _context = context;
    }

    public async Task Create(Activity activity)
    {
        _context.Activites.Add(activity);
        await _context.SaveChangesAsync();
    }

    public async Task Delete(Activity activity)
    {
        _context.Activites.Remove(activity);
        await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<Activity>> GetAll(CancellationToken cancellationToken = default)
    {
        return await _context.Activites.ToListAsync();
    }

    public async Task<Activity> GetById(string id)
    {
       return await _context.Activites.FindAsync(Guid.Parse(id));
    }

    public async Task Update(Activity activity)
    {
        _context.Activites.Update(activity);
        await _context.SaveChangesAsync();
    }
}