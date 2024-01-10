namespace Domain.Activities;

public class CancelationValueObject
{
    public CancelationValueObject()
    {
       
    }
    public CancelationValueObject(bool isCancelled)
    {
       
        IsCancelled = isCancelled;
        Date = isCancelled ? DateTime.UtcNow : null;
    }

    public bool IsCancelled { get; private set;} = false;
    public DateTime? Date { get; private set;}
}