using Domain.Contracts;
using Domain.Users;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Repositories;

public class UserFollowingRepository : IUserFollowingRepository
{
    private readonly ActivityContext _context;
    public UserFollowingRepository(ActivityContext context)
    {
        _context = context;
        
    }
    public DbSet<UserFollowing> UserFollowings => _context.UserFollowings;

    public void Add(UserFollowing userFollowing)
    {
        _context.UserFollowings.Add(userFollowing);
    }

    public void Remove(UserFollowing userFollowing)
    {
        _context.UserFollowings.Remove(userFollowing);
    }
}