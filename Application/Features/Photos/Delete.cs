namespace Application.Features.Photos;

public static class Delete
{
    public record Command(string PhotoId) : IRequest<Result<Unit>>;

    public class CommandHandler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly IUserRepository _userRepository;
        private readonly IPhotoAccessor _photoAccessor;
        private readonly IUserAccessor _userAccessor;
        private readonly IUnitWork _unitWork;

        public CommandHandler(IUserRepository userRepository,
            IPhotoAccessor photoAccessor, 
            IUserAccessor userAccessor,
            IUnitWork unitWork)
        {

            _userRepository = userRepository;
            _photoAccessor = photoAccessor;
            _userAccessor = userAccessor;
            _unitWork = unitWork;

        }
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken) {
            
            var user = await _userRepository.FindByUsername(_userAccessor.GetUsername(),true);
            if (user == null) return null;
           
            if (user.IsMainProfile(request.PhotoId))
                return Result.Fail("You cannot delete your profile photo");

            var result = _photoAccessor.DeletePhoto(request.PhotoId);
            if(result == null) return null;
            
            user.DeletePhoto(request.PhotoId);
            
            _userRepository.Update(user);

            await _unitWork.CommitSaveAsync();

            return Result.Ok(Unit.Value);
        }
    }
}
