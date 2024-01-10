using Domain.Users;

namespace Domain.Activities;

public class ActivityAttendee
{
    public string AppUserId { get; set; }
    public AppUser AppUser { get; set; }

    public Guid ActivityId { get; set; }
    public Activity Activity { get; set; }
    public bool IsHost { get; set; }

    public DateTime Date { get; set; }

    public CancelationValueObject Cancel { get; set; }

    public void CancelActivity()
    {
        Cancel = new CancelationValueObject(true);
    }

    public void RestoreActivity()
    {
        Cancel = new CancelationValueObject(false);
    }


}
