using System.Runtime.InteropServices;
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
        private readonly IUserRepository _userRepository;

        private readonly IUserAccessor _userAccessor;

        public QueryHandler(
            IActivityRepository repository,
            ILogger<List.Query> logger,
            IMapper mapper,
            IUserAccessor userAccessor,
            IUserRepository userRepository)
        {
            
            _repository = repository;
            _logger = logger;
            _mapper = mapper;
            _userAccessor = userAccessor;
            _userRepository = userRepository;
        }
        
        public async Task<Result<IEnumerable<ActivityResponse>>> Handle(Query request, CancellationToken cancellationToken)
        {
            try {
                var data = await _repository.GetAll();
                var responses = _mapper.Map<IEnumerable<ActivityResponse>>(data);
                
                return Result.Ok<IEnumerable<ActivityResponse>>(responses);
            }
            catch(Exception ex) {
                return Result.Fail(ex.Message);
            }
        }
    }
}