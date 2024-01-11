using Application.Features.Photos.Dto;
using Domain.Photos;
using Microsoft.AspNetCore.Http;

namespace Application.Features.Photos;

public static class Add
{
    public record Command(IFormFile File) : IRequest<Result<PhotoResponse>>;

    public class CommandHandler : IRequestHandler<Command,Result<PhotoResponse>>
    {
        private readonly IPhotoRepository _repository;
        private readonly IPhotoAccessor _photoAccessor;
        private readonly IUserAccessor _userAccessor;
        private readonly IUserRepository _userRepository;
        private readonly IUnitWork _unitWork;
        private readonly IMapper _mapper;

        public CommandHandler(
            IPhotoRepository repository,
            IUserRepository userRepository, 
            IPhotoAccessor photoAccessor,
            IUserAccessor userAccessor,
            IUnitWork unitWork,
            IMapper mapper)
        {
            _repository = repository;
            _photoAccessor = photoAccessor;
            _userAccessor = userAccessor;
            _userRepository = userRepository;
            _unitWork = unitWork;
            _mapper = mapper;
        }

        public async Task<Result<PhotoResponse>> Handle(Command request, CancellationToken cancellationToken)
        {

            var user = await _userRepository.FindByUsername(_userAccessor.GetUsername(),true);
            if(user == null) 
                return null;

            var photoResult = await _photoAccessor.AddPhoto(request.File);
            
            var photo = new Photo
            {
                Url = photoResult.Url,
                Id = photoResult.PublicId,
                AppUserId = user.Id
            };
          
            user.AddPhoto(photo);
            _userRepository.Update(user);

            await _unitWork.CommitSaveAsync();

            return Result.Ok(_mapper.Map<PhotoResponse>(photo));
        }
    }
}