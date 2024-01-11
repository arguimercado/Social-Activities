using Domain.Photos;

namespace Domain.Contracts;

public interface IPhotoRepository
{
    void Add(Photo  photo);
    void Remove(Photo photo);

    Task<IEnumerable<Photo>> GetUserPhotos(string userId);
}