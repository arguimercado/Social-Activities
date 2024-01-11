
namespace Application.Features.Activities;

public class Delete
{
    public record Command(string Id) : IRequest<Result<Unit>>;

    public class Handler : IRequestHandler<Command,Result<Unit>>
    {
        private readonly IActivityRepository _repository;
        private readonly IUnitWork _unitWork;

        public Handler(IActivityRepository repository,IUnitWork unitWork)
        {
            _repository = repository;
            _unitWork = unitWork;
        }
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            try {
                
                var activity = await _repository.GetById(request.Id);
                if(activity is null)
                    return null;

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