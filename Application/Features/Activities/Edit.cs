
using Application.Features.Activities.Dtos;

namespace Application.Features.Activities;

public static class Edit
{
    public record Command(string Id,ActivityRequest Activity) : IRequest<Result<Unit>>;

    public class CommandValidator : AbstractValidator<Command> {

        public CommandValidator()
        {
            RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
        }
    }

    public class Handler : IRequestHandler<Command,Result<Unit>>
    {
        private readonly IActivityRepository _repository;
        private readonly IMapper _mapper;
        private readonly IUnitWork _unitWork;

        public Handler(IActivityRepository repository,IMapper mapper,IUnitWork unitWork)
        {
            _repository = repository;
            _mapper = mapper;
            _unitWork = unitWork;
        }

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            
            var activity = await _repository.GetById(request.Id);
            
            activity.UpdateActivity(request.Activity.Title,
                                    request.Activity.Date,
                                    request.Activity.Description,
                                    request.Activity.Category,
                                    request.Activity.City,
                                    request.Activity.Venue);
            
            _repository.Update(activity);
            await _unitWork.CommitSaveAsync();
            return Result.Ok(Unit.Value);
        }
    }
}