namespace Application.Features.Activities.Dtos;

public class AttendeeResponse
{
    public string UserId { get; set; }
    public string Username { get; set; }
    public string Displayname { get; set; }
    public string Bio { get; set; }
    public bool IsHost { get; set; }
    public DateTime? Date { get; set; }

    public string Image { get; set; }

    public bool IsCancelled { get; set; }
    public DateTime? DateCancelled { get; set; }
}
