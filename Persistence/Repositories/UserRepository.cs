using Domain.Contracts;
using Domain.Users;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Repositories;

public class UserRepository : IUserRepository
{
    private readonly ActivityContext _context;
    public UserRepository(IActivityContext context) 
    {
        _context = (ActivityContext)context;
    }
    public async Task<AppUser> FindByUsername(string username, bool asTracking = false)
    {
        var query = asTracking ? _context.Users.AsTracking() : _context.Users.AsNoTracking();

        return await query.Include(p => p.Photos)
                            .FirstOrDefaultAsync(x => x.UserName == username);
    }

    public async Task<AppUser> ViewProfile(string username)
    {
        return await _context.Users.AsNoTracking()
                .Include(p => p.Photos)
                .Include(p => p.Activities.Where(a => a.IsHost))
                .ThenInclude(p => p.Activity)
                .FirstOrDefaultAsync(x => x.UserName == username);
    }

    public void Update(AppUser user)
    {
        _context.Users.Update(user);
        if(user.DeletedPhotos.Count() > 0)
        {
            foreach(var photo in user.DeletedPhotos)
            {
                _context.Photos.Remove(photo);
            }
        }
    }
}