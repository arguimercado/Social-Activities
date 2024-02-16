using Application.Features.Comments.DTO;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Comments
{
    public static class List
    {
        public record Query(string ActivityId) : IRequest<Result<List<CommentResponse>>>;

        public class QueryHandler : IRequestHandler<Query, Result<List<CommentResponse>>>
        {
            private readonly IActivityRepository _repository;
            private readonly IMapper _mapper;

            public QueryHandler(IActivityRepository repository, IMapper mapper)
            {
                _repository = repository;
                _mapper = mapper;
            }

            public async Task<Result<List<CommentResponse>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await _repository.Activites
                    .Include(x => x.Comments.OrderByDescending(c => c.CreatedAt))
                    .ThenInclude(x => x.Author)
                    .ThenInclude(x => x.Photos)
                    .FirstOrDefaultAsync(x => x.Id == Guid.Parse(request.ActivityId), cancellationToken);

                if (activity == null) return null;

                return Result.Ok(_mapper.Map<List<CommentResponse>>(activity.Comments));
            }
        }
    }
}