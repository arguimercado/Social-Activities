using Domain.Comments;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Configurations;

public class CommentConfiguration : IEntityTypeConfiguration<Comment>
{
    
    public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<Comment> builder)
    {
        builder.HasOne(a => a.Activity)
            .WithMany(c => c.Comments)
            .OnDelete(DeleteBehavior.Cascade);
    }
}