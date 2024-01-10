namespace Application.Features.Activities.Dtos;

public class ProfileResponse
{

    public ProfileResponse()
    {
        
    }
    public ProfileResponse(string userId, string username, string displayname, string bio, bool isHost, DateTime? date = null)
    {
        UserId = userId;
        Username = username;
        Displayname = displayname;
        Bio = bio;
        IsHost = isHost;
        Date = date;
        
    }
     
   
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