
using Application.Features.Profiles;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;


public class ProfileController : BaseApiController
{

  [HttpGet("{username}")]
  public async Task<IActionResult> GetProfile([FromRoute]string username) {
    
    var result = await Mediator.Send(new Detail.Query(username));
    
    return HandleResult(result);
  }

  [HttpPut]
  public async Task<IActionResult> UpdateProfile([FromBody]Update.Command command) {
    
    var result = await Mediator.Send(command);
    
    return HandleResult(result);
  }


}