using Application.Features.Activities.Dtos;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Features.Activities
{
    public static class Detail
    {
        public record Query(string Id) : IRequest<ActivityResponse>;

        public class QueryHandler : IRequestHandler<Query, ActivityResponse>
        {
            private readonly IActivityRepository _repository;
            private readonly IMapper _mapper;

            public QueryHandler(IActivityRepository repository,IMapper mapper)
            {
                _repository = repository;
                _mapper = mapper;
            }
            public async Task<ActivityResponse> Handle(Query request, CancellationToken cancellationToken)
            {
                return _mapper.Map<ActivityResponse>(await _repository.GetById(request.Id));
            }
        }
    }
}