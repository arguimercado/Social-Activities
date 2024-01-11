using Domain.Activities;

namespace Application.Features.Activities.Dtos;

public class ActivityResponse
{
    public ActivityResponse()
    {
        
    }
    public string Id { get; set; }
    public string Title { get; set; }
    public DateTime Date { get; set; }
    public string Description { get; set; }
    public string Category { get; set; }
    public string City { get; set; }
    public string Venue { get; set; }
    public string HostUsername { get; set; }
    public bool IsCancelled { get; set; }
   
    
    public List<AttendeeResponse> Attendees { get; set; } = new();

}

