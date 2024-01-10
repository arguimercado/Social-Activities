
using Application.Features.Activities;
using Application.Features.Activities.Dtos;
using Application.Features.Attendees;
using Microsoft.AspNetCore.Authorization;
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
        return HandleResult(response);
    }

   
    [HttpGet("{id}")]
    public async Task<IActionResult> GetActivity(string id)
    {
        var response = await Mediator.Send(new Detail.Query(id));

        return HandleResult(response);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] ActivityRequest activity)
    {

        var response = await Mediator.Send(new Create.Command(activity));

        return HandleResult(response);
    }

    [Authorize(Policy = "IsActivityHost")]
    [HttpPut("{id}")]
    public async Task<IActionResult> Edit([FromRoute] string id, [FromBody] ActivityRequest activity)
    {

        var response = await Mediator.Send(new Edit.Command(id, activity));

        return HandleResult(response);
    }

    [HttpPost("{id}/attend")]
    public async Task<IActionResult> Attend([FromRoute] string id)
    {

        var response = await Mediator.Send(new UpdateAttendance.Command(id));

        return HandleResult(response);
    }

    [Authorize(Policy = "IsActivityHost")]
    [HttpDelete("{id}/remove/{username}")]
    public async Task<IActionResult> RemoveAttendee([FromRoute]string id,[FromRoute]string username) {

        var response = await Mediator.Send(new RemoveAttendee.Command(id,username));
        return HandleResult(response);
    }

    [Authorize(Policy = "IsActivityHost")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete([FromRoute] string id)
    {

        var response = await Mediator.Send(new Delete.Command(id));

        return HandleResult(response);
    }



}