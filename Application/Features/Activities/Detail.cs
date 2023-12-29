using System.Threading;
using System.Threading.Tasks;
using Domain;
using Domain.Contracts;
using MediatR;

namespace Application.Features.Activities
{
    public static class Detail
    {
        public record Query(string Id) : IRequest<Activity>;

        public class QueryHandler : IRequestHandler<Query, Activity>
        {
            private readonly IActivityRepository _repository;

            public QueryHandler(IActivityRepository repository)
            {
                _repository = repository;
            }
            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _repository.GetById(request.Id);
            }
        }
    }
}