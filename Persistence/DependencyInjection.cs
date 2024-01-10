using Domain.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Persistence.Repositories;
using Persistence.Securities;
using Persistence.UnitWorks;

namespace Persistence;

public static class DependencyInjection
{
    public static IServiceCollection AddPersistence(this IServiceCollection services,IConfiguration configuration) {
        
        services.AddDbContext<ActivityContext>(opt => {
            var connectionString = configuration.GetConnectionString("DefaultConnection");
            opt.UseSqlServer(connectionString);
        });

        services.TryAddSingleton<IHttpContextAccessor,HttpContextAccessor>();
        services.AddScoped<IUnitWork,UnitWork>();
        services.AddScoped<IUserAccessor,UserAccessor>();
        services.AddScoped<IActivityRepository,ActivityRepository>();
        services.AddScoped<IUserRepository,UserRepository>();
        return services;
    }
}