using Application.Features.Photos.Dto;

namespace Application.Features.Profiles.Dto;

public class ProfileResponse
{
    public string UserId { get; set; }
    public string Username { get; set; }
    public string Displayname { get; set; }

    public string Bio { get; set; }

    public string Image { get; set; }

    public IEnumerable<PhotoResponse> Photos { get; set; }
}