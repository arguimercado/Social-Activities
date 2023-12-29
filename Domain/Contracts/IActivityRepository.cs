namespace Domain.Contracts;

public interface IActivityRepository
{

    Task Create(Activity activity);

    Task Update(Activity activity);

    Task Delete(Activity activity);

    Task<Activity> GetById(string id);
    Task<IEnumerable<Activity>> GetAll(CancellationToken cancellationToken = default);
}