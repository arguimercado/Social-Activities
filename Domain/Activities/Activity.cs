using Domain.Users;

namespace Domain.Activities;

public class Activity
{

    public static Activity CreateWithAutoId(string title,
                                            DateTime date,
                                            string description,
                                            string category,
                                            string city,
                                            string venue,
                                            string creator) => 
        new(Guid.NewGuid(), title,date,description,category,city,venue,creator);
    

    public static Activity CreateWithNoAutoId(Guid id,
                                              string title,
                                              DateTime date,
                                              string description,
                                              string category,
                                              string city,
                                              string venue,
                                              string creator) => new(id, title,date,description,category,city,venue,creator);
    

    public static Activity CreateWithAttendee(string title, DateTime date, string description, string category, string city, string venue,string creator,AppUser user,bool isHost) {
        
        var activity = new Activity(Guid.NewGuid(), title,date,description,category,city,venue,creator);
        activity.AddAttendee(user,isHost);
        
        return activity;
    }


    public Activity()
    {
        Cancel = new CancelationValueObject(false);
    }

    public Activity(Guid id, string title, DateTime date, string description, string category, string city, string venue, string creator)
    {
        Id = id;
        Title = title;
        Date = date;
        Description = description;
        Category = category;
        City = city;
        Venue = venue;
        Creator = creator;
        CreatedAt = DateTime.UtcNow;
        Cancel = new CancelationValueObject(false);
    }


   

    public Guid Id { get; set; }
    public string Title { get; set; }
    public DateTime Date { get; set; }
    public string Description { get; set; }
    public string Category { get; set; }
    public string City { get; set; }
    public string Venue { get; set; }
    public string Creator { get; set; }
    public DateTime CreatedAt { get; private set; }

    public CancelationValueObject Cancel { get; set; }

    private List<Invitation> _invitations = new List<Invitation>();
    public IEnumerable<Invitation> Invitations => _invitations.ToList();

    public ICollection<ActivityAttendee> Attendees { get; set; } = new List<ActivityAttendee>();


    public bool IsHost(string username) => Attendees.Any(x => x.IsHost && x.AppUser.UserName == username);

    public void CancelActivity() {
        Cancel = new CancelationValueObject(true);
    }

    public void RestoreActivity() {
        Cancel = new CancelationValueObject(false);
    }

    public void RestoreAttendeeActivity(AppUser user) {

        var attendee = this.Attendees.FirstOrDefault(x => x.AppUserId == user.Id);
        if(attendee != null) {
            attendee.RestoreActivity();
        }
    }

    public void RemoveAttendeeInActivity(AppUser user) {
        var attendee = this.Attendees.FirstOrDefault(x => x.AppUserId == user.Id);
        if(attendee != null) {
            this.Attendees.Remove(attendee);
        }
    }

    public void UpdateAttendance(AppUser user) {
        
        var attendance = this.Attendees.FirstOrDefault(x => x.AppUserId == user.Id);
        if(attendance == null) {
            this.AddAttendee(user,false);
        }
        else {
            var isHost = this.Attendees.FirstOrDefault(x => x.IsHost && x.AppUserId == user.Id) != null;
            
            if(isHost) {
                if(this.Cancel == null || !this.Cancel.IsCancelled)
                    this.CancelActivity();
                else 
                    this.RestoreActivity();
            }
            else {
                attendance.CancelActivity();
            }
        }
    }

    public void AddAttendee(AppUser user,bool isHost)
    {
        var attendee = new ActivityAttendee {
            AppUser = user,
            Activity = this,
            IsHost = isHost,
            Cancel = new CancelationValueObject(false),
        };
        
        Attendees.Add(attendee);
    }

    public void UpdateActivity(string title, DateTime date, string description, string category, string city, string venue)
    {
        Title = title;
        Date = date;
        Description = description;
        Category = category;
        City = city;
        Venue = venue;
    }

}