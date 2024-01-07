using Domain.Contracts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Persistence.Repositories;

namespace Persistence;

public static class DependencyInjection
{
    public static IServiceCollection AddPersistence(this IServiceCollection services,IConfiguration configuration) {
        
        services.AddDbContext<ActivityContext>(opt => {
            var connectionString = configuration.GetConnectionString("DefaultConnection");
            opt.UseSqlServer(connectionString);
        });
        

        
        services.AddScoped<IActivityRepository,ActivityRepository>();
        return services;
    }
}