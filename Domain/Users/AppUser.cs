using Domain.Activities;
using Domain.Photos;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Users;

public class AppUser : IdentityUser
{
    public string DisplayName { get; set; }
    public string Bio { get; set; }

    public ICollection<ActivityAttendee> Activities { get; set; } = new List<ActivityAttendee>();
    
    public ICollection<UserFollowing> Followings { get; set; }
    public ICollection<UserFollowing> Followers { get; set; }

    public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();

    public ICollection<Photo> Photos { get; set; } = new HashSet<Photo>();

    private List<Photo> _deletedPhotos = new List<Photo>();
    
    [NotMapped]
    public IEnumerable<Photo> DeletedPhotos => _deletedPhotos.ToList();

    public void Update(string displayName, string bio)
    {
        DisplayName = displayName;
        Bio = bio;
    }

    public void AddPhoto(Photo photo)
    {
        if(!Photos.Any(p => p.IsMain))
            photo.IsMain = true;

        Photos.Add(photo);
    }

    public bool IsMainProfile(string id) => Photos.FirstOrDefault(p => p.Id == id && p.IsMain) is not null;
    
    public void SetMain(string photoId) {
        
        var currentMain = Photos.FirstOrDefault(p => p.IsMain);
        if(currentMain is not null)
            currentMain.IsMain = false;

        var newMain = Photos.FirstOrDefault(p => p.Id == photoId);
        if(newMain is not null)
            newMain.IsMain = true;
    }

    public void DeletePhoto(string id)
    {
        var photo = Photos.FirstOrDefault(p => p.Id == id);
        _deletedPhotos.Add(photo);
        Photos.Remove(photo);
    }
}