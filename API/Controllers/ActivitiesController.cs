
using Application.Features.Activities;
using Application.Features.Activities.Dtos;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ActivitiesController : BaseApiController
{
   

    public ActivitiesController()
    {
        
    }

    [HttpGet]
    public async Task<IActionResult> Index()
    {
       var response = await Mediator.Send(new List.Query());
       return Ok(response);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetActivity(string id)
    {
        var response = await Mediator.Send(new Detail.Query(id));
        return Ok(response);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody]Activity activity) {
        
        await Mediator.Send(new Create.Command(activity));
        
        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Edit([FromRoute]string id,[FromBody]ActivityRequest activity) {
        
        await Mediator.Send(new Edit.Command(id,activity));
        
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete([FromRoute]string id) {
        
        await Mediator.Send(new Delete.Command(id));

        return Ok();
    }



}