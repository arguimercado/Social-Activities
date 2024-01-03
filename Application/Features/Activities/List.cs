using Application.Features.Activities.Dtos;
using AutoMapper;
using Domain;
using Domain.Contracts;
using FluentResults;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.Features.Activities;

public static class List
{
    public record Query : IRequest<Result<IEnumerable<ActivityResponse>>>;

    public class QueryHandler : IRequestHandler<Query, Result<IEnumerable<ActivityResponse>>>
    {
       
        private readonly IActivityRepository _repository;
        private readonly ILogger<List.Query> _logger;
        private readonly IMapper _mapper;

        public QueryHandler(IActivityRepository repository,ILogger<List.Query> logger,IMapper mapper)
        {
            
            _repository = repository;
            _logger = logger;
            _mapper = mapper;
        }
        
        public async Task<Result<IEnumerable<ActivityResponse>>> Handle(Query request, CancellationToken cancellationToken)
        {
            try {
                var response = await _repository.GetAll();
                
                return Result.Ok(_mapper.Map<IEnumerable<ActivityResponse>>(response.ToList()));

            }
            catch(Exception ex) {
                return Result.Fail(ex.Message);
            }
        }
    }
}