namespace Application.Features.Comments.DTO;

public class CommentResponse
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public string Body { get; set; }

    public string UserName { get; set; }

    public string Displayname { get; set; }

    public string Image { get; set; }
}