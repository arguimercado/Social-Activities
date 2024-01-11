using Domain.Users;

namespace Domain.Contracts
{
    public interface IUserRepository
    {
        void Update(AppUser user);
        Task<AppUser> FindByUsername(string username, bool asTracking = false);
        Task<AppUser> ViewProfile(string username);
    }
}