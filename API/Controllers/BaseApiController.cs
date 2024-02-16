using FluentResults;
using MediatR;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BaseApiController : ControllerBase
{
    private  IMediator _mediator;

    protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();

    protected IActionResult HandleResult<TValue>(Result<TValue> result) {

        if(result is null) {
            return NotFound();
        }
        else if(result.IsSuccess && result.Value is null) {
            return NotFound();
        }
        else if(result.IsSuccess && result.Value is not null) {
            return Ok(result.Value);
        }
        else {
            return BadRequest(result.Errors);
        }
    }

    
}