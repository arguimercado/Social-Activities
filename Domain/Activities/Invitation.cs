namespace Domain.Activities;

public class Invitation
{

    public Guid Id { get; set; }
    public string Username { get; set; }
    public DateTime Date { get; set; } 
    public DateTime? ExpiryDate { get; set; }

    public Guid ActivityId { get; set; }

    public Activity Activity { get; set; } = null;
}
