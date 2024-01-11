using Domain.Contracts;
using Domain.Photos;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Repositories;

public class PhotoRespository : IPhotoRepository
{
    private readonly ActivityContext _context;

    public PhotoRespository(IActivityContext context)
    {
        _context = (ActivityContext)context;
    }
    public void Add(Photo photo)
    {
        _context.Photos.Add(photo);
    }

    public async Task<IEnumerable<Photo>> GetUserPhotos(string userId)
    {
        return await _context.Photos.Where(m => m.AppUserId == userId).ToListAsync();
    }

    public void Remove(Photo photo)
    {
        _context.Photos.Remove(photo);
    }
}