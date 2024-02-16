using Domain.Activities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations;

public class ActivityConfiguration : IEntityTypeConfiguration<Activity>
{
    public void Configure(EntityTypeBuilder<Activity> builder) {

        builder.HasMany(m => m.Invitations)
            .WithOne(m => m.Activity)
            .HasForeignKey(m => m.ActivityId);
        
        builder.ComplexProperty<CancelationValueObject>(m => m.Cancel)
                .IsRequired();
    }
}
