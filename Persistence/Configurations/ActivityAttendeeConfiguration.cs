using Domain.Activities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class ActivityAttendeeConfiguration : IEntityTypeConfiguration<ActivityAttendee>
    {
        public void Configure(EntityTypeBuilder<ActivityAttendee> builder)
        {
            builder.HasKey(x => new {x.ActivityId,x.AppUserId});
            builder.HasOne(u => u.AppUser)
                .WithMany(a => a.Activities)
                .HasForeignKey(a => a.AppUserId);

            builder.HasOne(a => a.Activity)
                .WithMany(u => u.Attendees)
                .HasForeignKey(a => a.ActivityId);
            
            builder.ComplexProperty<CancelationValueObject>(m => m.Cancel)
                 .IsRequired();
        }
    }
}
