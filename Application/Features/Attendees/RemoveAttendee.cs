namespace Application.Features.Attendees
{
    public static class RemoveAttendee
    {
        public record Command(string Id,string Username) : IRequest<Result<Unit>>;

        public class CommandHandler : IRequestHandler<Command, Result<Unit>> {
            private readonly IActivityRepository _activityRepository;
            private readonly IUserAccessor _userAccessor;
            private readonly IUnitWork _unitWork;
            private readonly IUserRepository _userRepository;

            public CommandHandler(
                IActivityRepository activityRepository,
                IUserRepository userRepository, 
                IUserAccessor userAccessor, 
                IUnitWork unitWork)
            {
                _userRepository = userRepository;
                _activityRepository = activityRepository;
                _userAccessor = userAccessor;
                _unitWork = unitWork;
            }
            
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                try {
                    
                    var activity = await _activityRepository.GetActivityWithAttendees(request.Id,true);
                    if (activity == null) return null;

                    var user = await _userRepository.FindByUsername(request.Username);

                    if (user == null)
                        return null;

                    activity.RemoveAttendeeInActivity(user);
                    _activityRepository.Update(activity);
                    var result = await _unitWork.CommitSaveAsync();

                    if (!result)
                        return Result.Fail<Unit>("Problem removing attendance");

                    return Result.Ok(Unit.Value);

                }
                catch(Exception ex) {
                    return Result.Fail(ex.Message);
                }
            }
        }
    }
}