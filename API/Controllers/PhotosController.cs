using Application.Features.Photos;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class PhotosController : BaseApiController
{
    
    [HttpPost]
    public async Task<IActionResult> Add([FromForm] IFormFile file)
    {
        var response = await Mediator.Send(new Add.Command(file));

        return HandleResult(response);
    }

    [HttpDelete("{photoId}")]
    public async Task<IActionResult> Delete([FromRoute] string photoId)
    {
        var response = await Mediator.Send(new Delete.Command(photoId));
        return HandleResult(response);
    }

    [HttpPost("{photoId}/setMain")]
    public async Task<IActionResult> SetMain([FromRoute] string photoId)
    {
        var response = await Mediator.Send(new Update.Command(photoId));
        return HandleResult(response);
    }
}