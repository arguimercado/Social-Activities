
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

public class ActivitiesController : BaseApiController
{
        private readonly ActivityContext _context;
   
    public ActivitiesController(ActivityContext context)
    {
            _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Activity>>>  Index() {
        return await _context.Activites.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivity(Guid id) {
        return await _context.Activites.FindAsync(id);
    }

    

}