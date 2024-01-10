using Domain.Contracts;
using Domain.Users;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Repositories;

public class UserRepository : IUserRepository
{
    private readonly ActivityContext _context;
    public UserRepository(ActivityContext context) 
    {
        _context = context;
    }
    

    public async Task<AppUser> FindByUsername(string username)
    {
        return await _context.Users.AsNoTracking()
                            .FirstOrDefaultAsync(x => x.UserName == username);
    }
}