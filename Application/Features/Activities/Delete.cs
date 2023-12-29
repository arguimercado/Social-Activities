using Domain.Contracts;
using MediatR;

namespace Application.Features.Activities;

public class Delete
{
    public record Command(string Id) : IRequest;

    public class Handler : IRequestHandler<Command>
    {
        private readonly IActivityRepository _repository;

        public Handler(IActivityRepository repository)
        {
            _repository = repository;
        }
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await _repository.GetById(request.Id);

            await _repository.Delete(activity);
        }
    }
}