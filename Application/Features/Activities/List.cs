using Domain;
using Domain.Contracts;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.Features.Activities;

public static class List
{
    public record Query : IRequest<IEnumerable<Activity>>;

    public class QueryHandler : IRequestHandler<Query, IEnumerable<Activity>>
    {
       
        private readonly IActivityRepository _repository;
        private readonly ILogger<List.Query> _logger;

        public QueryHandler(IActivityRepository repository,ILogger<List.Query> logger)
        {
            
            _repository = repository;
            _logger = logger;

        }
        
        public async Task<IEnumerable<Activity>> Handle(Query request, CancellationToken cancellationToken)
        {
            var response = await _repository.GetAll();
            return response.ToList();
        }
    }
}