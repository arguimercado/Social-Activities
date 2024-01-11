namespace Application.Features.Photos;

public static class Update
{

    public record Command(string PhotoId) : IRequest<Result<Unit>>;

    public class CommandHandler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly IUserRepository _userRepository;
        private readonly IPhotoAccessor _photoAccessor;
        private readonly IUserAccessor _userAccessor;
        private readonly IUnitWork _unitWork;

        public CommandHandler()
        {
            
        }

        public CommandHandler(IUserRepository userRepository, IPhotoAccessor photoAccessor, IUserAccessor userAccessor, IUnitWork unitWork)
        {
            _userRepository = userRepository;
            _photoAccessor = photoAccessor;
            _userAccessor = userAccessor;
            _unitWork = unitWork;
        }

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await _userRepository.FindByUsername(_userAccessor.GetUsername(),true);
            if (user == null)
                return null;

            user.SetMain(request.PhotoId);
            
            var photo = user.Photos.FirstOrDefault(x => x.Id == request.PhotoId);
            if (photo == null)
                return null;
            
            _userRepository.Update(user);
            var result = await _unitWork.CommitSaveAsync();

            if (!result)
                return Result.Fail("Photo update failed");
            
            return Result.Ok(Unit.Value);
        }
    }
}
