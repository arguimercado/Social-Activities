using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Domain.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;

namespace Persistence.Securities;

public class HostRequirement : IAuthorizationRequirement
{
    
}

public class HostRequirementHandler : AuthorizationHandler<HostRequirement> {
   
    private readonly IActivityRepository _activityRepository;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public HostRequirementHandler(
        IActivityRepository activityRepository,
        IHttpContextAccessor httpContextAccessor) {
        
        
        _activityRepository = activityRepository;
        _httpContextAccessor = httpContextAccessor;
    }

    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, HostRequirement requirement)
    {
        var currentUsername = context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if(currentUsername == null) return Task.CompletedTask;

        var activityId =_httpContextAccessor.HttpContext?.Request.RouteValues
            .SingleOrDefault(x => x.Key == "id").Value?.ToString();

        var activity =  _activityRepository.GetActivityWithAttendees(activityId).Result;
        if(activity == null) return Task.CompletedTask;

        var attendee = activity.Attendees.FirstOrDefault(x => x.AppUser.Id == currentUsername && x.IsHost);
        if(attendee == null) return Task.CompletedTask;

        if(attendee.IsHost) context.Succeed(requirement);

        return Task.CompletedTask;
    }
}