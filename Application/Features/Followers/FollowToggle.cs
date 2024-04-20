using Domain.Users;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Followers;

public static class FollowToggle
{
    public record Command(string TargetUsername) : IRequest<Result<Unit>>;

    internal class Handler(IUserFollowingRepository userFollowingRepository,
                           IUserRepository userRepository,
                           IUserAccessor userAccessor, IUnitWork unitWork) : IRequestHandler<Command, Result<Unit>>
    {
        private readonly IUserFollowingRepository _userFollowingRepository = userFollowingRepository;
        private readonly IUserRepository _userRepository = userRepository;
        private readonly IUserAccessor _userAccessor = userAccessor;
        private readonly IUnitWork _unitWork = unitWork;

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var observer = await _userRepository.Users
                                        .FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername());

            var target = await _userRepository.Users
                                    .FirstOrDefaultAsync(u => u.UserName == request.TargetUsername);

            if (target is null) return null;

            var following = await _userFollowingRepository
                                        .UserFollowings
                                        .FindAsync(observer.Id, target.Id);

            if (following is null)
            {
                following = new UserFollowing
                {
                    Observer = observer,
                    Target = target
                };
                _userFollowingRepository.Add(following);
            }
            else
            {
                _userFollowingRepository.Remove(following);
            }

            await _unitWork.CommitSaveAsync();

            return Result.Ok(Unit.Value);
        }
    }
}