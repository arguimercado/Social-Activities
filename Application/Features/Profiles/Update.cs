using Microsoft.EntityFrameworkCore;

namespace Application.Features.Profiles;

public static class Update {
    public record Command(string Displayname, string Bio = null) : IRequest<Result<Unit>>;

    public class CommandValidator : AbstractValidator<Command> {
        public CommandValidator()
        {
            RuleFor(x => x.Displayname).NotEmpty();
        }
    }

    public class CommandHandler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly IUnitWork _unitWork;
        private readonly IUserRepository _userRepository;
        private readonly IUserAccessor _userAccessor;

        public CommandHandler(IUnitWork unitWork, IUserRepository userRepository, IUserAccessor userAccessor) {
            _unitWork = unitWork;
            _userRepository = userRepository;
            _userAccessor = userAccessor;
        }
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken) {

            var user = await _userRepository.Users
                                    .AsTracking()
                                    .FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername());

            if (user == null)
                return null;

            user.Update(request.Displayname, request.Bio);
            _userRepository.Update(user);
            var result = await _unitWork.CommitSaveAsync();

            return result ? Result.Ok(Unit.Value) : Result.Fail("Problem updating profile");
        }
    }


}