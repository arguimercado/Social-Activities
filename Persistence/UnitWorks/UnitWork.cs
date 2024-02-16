using Domain.Contracts;

namespace Persistence.UnitWorks;

public class UnitWork : IUnitWork
{
    private readonly ActivityContext _context;

    public UnitWork(ActivityContext context)
    {
        _context = (ActivityContext)context;
    }

    public async Task<bool> CommitSaveAsync()
    {
        var returnVal = await _context.SaveChangesAsync();
        return returnVal > 0 ? true : false;
    }   
}