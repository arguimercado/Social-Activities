
using Application.Features.Activities.Dtos;
using AutoMapper;
using Domain;
using Domain.Contracts;
using FluentResults;
using FluentValidation;
using MediatR;

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

        public Handler(IActivityRepository repository,IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            
            var activity = await _repository.GetById(request.Id);
            
            _mapper.Map<ActivityRequest,Activity>(request.Activity,activity);
            await _repository.Update(activity);
            return Result.Ok(Unit.Value);
        }
    }
}