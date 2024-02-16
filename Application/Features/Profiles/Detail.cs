using Application.Features.Profiles.Dto;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Profiles;

public static class Detail {
    public record Query(string Username) : IRequest<Result<ProfileResponse>>;
    
    public class QueryHandler : IRequestHandler<Query, Result<ProfileResponse>>
    {
      
        private readonly IUnitWork _unitWork;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        
       

        public QueryHandler(IUserRepository userRepository, IMapper mapper) {
            _mapper = mapper;
            _userRepository = userRepository;
        }

        public async Task<Result<ProfileResponse>> Handle(Query request, CancellationToken cancellationToken)
        {
            var user = await _userRepository.Users
                                .AsNoTracking()
                                .Include(p => p.Photos)
                                .ProjectTo<ProfileResponse>(_mapper.ConfigurationProvider)
                                .SingleOrDefaultAsync(x => x.Username == request.Username);
          
            
            if (user == null)
                return null;

            
            return Result.Ok(user);
        }
    }
}