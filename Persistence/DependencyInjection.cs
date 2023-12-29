using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Persistence;

public static class DependencyInjection
{
    public static IServiceCollection AddPersistence(this IServiceCollection services,IConfiguration configuration) {
        
        services.AddDbContext<ActivityContext>(opt => {
            var connectionString = configuration.GetConnectionString("DefaultConnection");
            opt.UseSqlServer(connectionString);
        });
        
        return services;
    }
}