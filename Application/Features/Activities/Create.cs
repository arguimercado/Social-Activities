
using System.Threading;
using System.Threading.Tasks;
using Domain;
using Domain.Contracts;
using MediatR;

namespace Application.Features.Activities;

public static class Create
{
    public record Command(Activity Activity) : IRequest;

    public class Handler : IRequestHandler<Command>
    {
        private readonly IActivityRepository _repository;

        public Handler(IActivityRepository repository)
        {
            _repository = repository;
        }

        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            await _repository.Create(request.Activity);
          
        }
    }
}