
using Application.Features.Activities.Dtos;
using AutoMapper;
using Domain;
using Domain.Contracts;
using MediatR;

namespace Application.Features.Activities;

public static class Edit
{
    public record Command(string Id,ActivityRequest Activity) : IRequest;

    public class Handler : IRequestHandler<Command>
    {
        private readonly IActivityRepository _repository;
        private readonly IMapper _mapper;

        public Handler(IActivityRepository repository,IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task Handle(Command request, CancellationToken cancellationToken)
        {

            var activity = await _repository.GetById(request.Id);
            _mapper.Map<ActivityRequest,Activity>(request.Activity,activity);
            await _repository.Update(activity);

        }
    }
}