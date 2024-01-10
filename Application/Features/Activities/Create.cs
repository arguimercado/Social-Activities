using Application.Features.Activities.Dtos;
using AutoMapper;
using Domain.Activities;
using Domain.Contracts;
using FluentResults;
using FluentValidation;
using MediatR;

namespace Application.Features.Activities;

public static class Create
{
    public record Command(ActivityRequest Activity) : IRequest<Result<Unit>>;

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
        private readonly IUserAccessor _userAccessor;

        private readonly IUserRepository _userRepository;   

        private readonly IUnitWork _unitWork;
        public Handler(IActivityRepository repository, IMapper mapper, 
                        IUserAccessor userAccessor,
                       IUserRepository userRepository, IUnitWork unitWork)
        {
            _repository = repository;
            _mapper = mapper;
            _userAccessor = userAccessor;
            _unitWork = unitWork;
            _userRepository = userRepository;

        }

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {   
         

                var user = await _userRepository.FindByUsername(_userAccessor.GetUsername());
                if(user == null) 
                    return null;
                
                var activity = Activity.CreateWithNoAutoId(Guid.Parse(request.Activity.Id), request.Activity.Title,
                                request.Activity.Date,request.Activity.Description,
                                request.Activity.Category,request.Activity.City, 
                                request.Activity.Venue,user.UserName);
                
                activity.AddAttendee(user,true);
                _repository.Create(activity);
                
                var result = await _unitWork.CommitSaveAsync();
                
                if(!result) 
                    return Result.Fail("Failed to create activity");

                return Result.Ok(Unit.Value);
           
          
        }
    }
}