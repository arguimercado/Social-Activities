using Domain.Contracts;

namespace Persistence.UnitWorks
{
    public class UnitWork : IUnitWork
    {
        private readonly ActivityContext _context;

        public UnitWork(IActivityContext context)
        {
            _context = (ActivityContext)context;
        }

        public IActivityContext ActivityContext => _context;

        public async Task<bool> CommitSaveAsync()
        {
            var returnVal = await _context.SaveChangesAsync();
            return returnVal > 0 ? true : false;
        }   
    }
}