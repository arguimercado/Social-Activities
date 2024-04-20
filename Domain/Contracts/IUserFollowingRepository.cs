using Domain.Users;
using Microsoft.EntityFrameworkCore;

namespace Domain.Contracts;

public interface IUserFollowingRepository
{
    DbSet<UserFollowing> UserFollowings {get;}

    void Add(UserFollowing userFollowing);

    void Remove(UserFollowing userFollowing);
}