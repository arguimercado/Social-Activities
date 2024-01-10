using Domain.Contracts;
using FluentResults;
using MediatR;

namespace Application.Features.Attendees;

public static class UpdateAttendance
{
    public record Command(string Id) : IRequest<Result<Unit>>;

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly IActivityRepository _activityRepository;
        private readonly IUserAccessor _userAccessor;
        private readonly IUnitWork _unitWork;
        private readonly IUserRepository _userRepository;

        public Handler(
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

            var activity = await _activityRepository.GetActivityWithAttendees(request.Id, true);
            if (activity == null) return null;

            var user = await _userRepository.FindByUsername(_userAccessor.GetUsername());

            if (user == null)
                return null;

            activity.UpdateAttendance(user);
            _activityRepository.Update(activity);
            var result = await _unitWork.CommitSaveAsync();

            if (!result)
                return Result.Fail<Unit>("Problem updating attendance");

            return Result.Ok(Unit.Value);


        }
    }
}