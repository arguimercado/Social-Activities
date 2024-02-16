using Domain.Activities;
using Microsoft.EntityFrameworkCore;

namespace Domain.Contracts;

public interface IActivityRepository
{

    DbSet<Activity> Activites { get;  }

    void Create(Activity activity);

    void Update(Activity activity);

    void Delete(Activity activity);

    Task<Activity> GetById(string id);
    Task<Activity> GetActivityWithAttendees(string id,bool trackChanges = false);
    Task<IEnumerable<Activity>> GetAll(CancellationToken cancellationToken = default);
}