using Application.Features.Comments.DTO;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Comments;

public static class Create
{
    public record Command(string ActivityId, string Body) : IRequest<Result<CommentResponse>>;

    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(x => x.Body).NotEmpty();
            RuleFor(x => x.ActivityId).NotEmpty();
        }
    }

    public class CommandHandler : IRequestHandler<Command, Result<CommentResponse>>
    {
        private readonly IActivityRepository _repository;
        private readonly IUserRepository _userRepository;
        private readonly IUserAccessor _userAccessor;
        private readonly IMapper _mapper;
        private readonly IUnitWork _unitWork;

        public CommandHandler(IActivityRepository repository,IUserRepository userRepository, IUnitWork unitWork, IUserAccessor userAccessor,IMapper mapper)
        {
            _repository = repository;
            _userRepository = userRepository;
            _userAccessor = userAccessor;
            _mapper = mapper;
            _unitWork = unitWork;
        }

        public async Task<Result<CommentResponse>> Handle(Command request, CancellationToken cancellationToken)
        {
            
            var activity = await _repository.Activites
                                        .FirstOrDefaultAsync(x => x.Id == Guid.Parse(request.ActivityId), cancellationToken);
            
            if (activity == null) return null;

            var user = await _userRepository.Users
                                        .Include(x => x.Photos)
                                        .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername(), cancellationToken);

            activity.AddComment(request.Body,user);

            var result = await _unitWork.CommitSaveAsync();

            return result ? Result.Ok(_mapper.Map<CommentResponse>(activity.Comments.LastOrDefault())) : Result.Fail("Failed to add comment");



        }
    }
}