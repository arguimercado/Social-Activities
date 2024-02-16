using System.Text;
using API.Services;
using Domain.Users;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using Persistence;
using Persistence.Securities;

namespace API.Extensions;

public static class IdentityServiceCollection
{
    public static IServiceCollection AddIdentityServices(this IServiceCollection services,IConfiguration configuration) {

        services.AddIdentityCore<AppUser>(opt => {
            opt.Password.RequireNonAlphanumeric = false;
            opt.User.RequireUniqueEmail = true;
        })
        .AddEntityFrameworkStores<ActivityContext>();

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetValue<string>("Token:Key")));
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(opt => {
            opt.TokenValidationParameters = new TokenValidationParameters {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = key,
                ValidateIssuer = false,
                ValidateAudience = false
            };
            opt.Events = new JwtBearerEvents {
                OnMessageReceived = context => {
                    var accessToken = context.Request.Query["access_token"];
                    var path = context.HttpContext.Request.Path;
                    if(!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/chat")) {
                        context.Token = accessToken;
                    }
                    return Task.CompletedTask;
                }
            };
        });

        services.AddAuthorization(opt => {
            opt.AddPolicy("IsActivityHost", policy => {
                policy.Requirements.Add(new HostRequirement());
            });
        });
        services.AddSignalR();
        services.AddTransient<IAuthorizationHandler,HostRequirementHandler>();
        services.AddScoped<TokenService>();
    
        services.Configure<TokenOptions>(configuration.GetSection("Token"));

        return services;

    }
}