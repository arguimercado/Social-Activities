namespace Domain.Contracts;

public interface IUnitWork
{
    Task<bool> CommitSaveAsync();

    IActivityContext ActivityContext { get; }
}