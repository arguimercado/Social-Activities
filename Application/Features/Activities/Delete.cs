using Domain.Contracts;
using FluentResults;
using MediatR;

namespace Application.Features.Activities;

public class Delete
{
    public record Command(string Id) : IRequest<Result<Unit>>;

    public class Handler : IRequestHandler<Command,Result<Unit>>
    {
        private readonly IActivityRepository _repository;

        public Handler(IActivityRepository repository)
        {
            _repository = repository;
        }
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            try {
                var activity = await _repository.GetById(request.Id);
                if(activity is null)
                    return null;

                await _repository.Delete(activity);
                return Result.Ok(Unit.Value);
            }
            catch(Exception ex) {
                return Result.Fail(ex.Message);
            }
        }
    }
}