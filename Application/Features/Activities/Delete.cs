
namespace Application.Features.Activities;

public class Delete
{
    public record Command(string Id) : IRequest<Result<Unit>>;

    public class Handler(IActivityRepository repository,
                         IUnitWork unitWork,
                         IUserAccessor userAccessor) : IRequestHandler<Command,Result<Unit>>
    {
        private readonly IActivityRepository _repository = repository;
        private readonly IUnitWork _unitWork = unitWork;
        private readonly IUserAccessor _userAccessor = userAccessor;

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            try {
                
                var activity = await _repository.GetById(request.Id);

                if(activity is null)
                    return null;

                if(!activity.IsCreator(_userAccessor.GetUsername())) {
                    return Result.Fail("User is not the owner of activity");
                }

                _repository.Delete(activity);
                
                await _unitWork.CommitSaveAsync();

                return Result.Ok(Unit.Value);
            }
            catch(Exception ex) {
                return Result.Fail(ex.Message);
            }
        }
    }
}