
using Domain.Activities;
using Domain.Users;

namespace Domain.Comments
{
    public class Comment
    {
        public Comment()
        {
            CreatedAt = DateTime.UtcNow;
        }

        public Comment(string body, AppUser author, Activity activity)
        {
            Body = body;
            Author = author;
            Activity = activity;
            CreatedAt = DateTime.UtcNow;
        }


        public int Id { get; set; }
        public string Body { get; set; }

        public AppUser Author { get; set; }

        public Activity Activity { get; set; }

        public DateTime CreatedAt { get; private set; }
    }
}