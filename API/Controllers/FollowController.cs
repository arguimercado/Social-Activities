using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Features.Followers;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class FollowController : BaseApiController
    {
        [HttpPost("{userName}")]
        public async Task<IActionResult> Follow(string userName) {
            var followToggleCommand = new FollowToggle.Command(userName);

            return HandleResult(await Mediator.Send(followToggleCommand));
        }
    }
}