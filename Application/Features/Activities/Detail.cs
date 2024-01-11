using Application.Features.Activities.Dtos;

namespace Application.Features.Activities;

public static class Detail
{
    public record Query(string Id) : IRequest<Result<ActivityResponse>>;

    public class QueryHandler : IRequestHandler<Query, Result<ActivityResponse>>
    {
        private readonly IActivityRepository _repository;
        private readonly IMapper _mapper;

        public QueryHandler(IActivityRepository repository,IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
        public async Task<Result<ActivityResponse>> Handle(Query request, CancellationToken cancellationToken)
        {
            var isValid = Guid.TryParse(request.Id,out Guid result);
            if(!isValid) {
                return null;
            }
            var activity = await _repository.GetActivityWithAttendees(request.Id);
            return Result.Ok(_mapper.Map<ActivityResponse>(activity));

            
        }
    }
}