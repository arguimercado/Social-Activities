using Domain.Photos;
using Microsoft.AspNetCore.Http; // Add this line

namespace Domain.Contracts;

public interface IPhotoAccessor
{
    Task<PhotoUploadResult> AddPhoto(IFormFile file);
    Task<string> DeletePhoto(string publicId);
}