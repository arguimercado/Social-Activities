using System.Net;
using System.Net.Http.Headers;
using WebApp.Models;

namespace WebApp.Services.Activities;

public interface IActivityService
{
    Task<IEnumerable<Activity>> GetActivities();
}
public class ActivityService : IActivityService
{
    private readonly HttpClient _httpClient;
    private readonly ILogger<ActivityService> _logger;

    public ActivityService(HttpClient httpClient,ILogger<ActivityService> logger)
    {
        _httpClient = httpClient;
        _logger = logger;
    }
    public async Task<IEnumerable<Activity>> GetActivities()
    {
        try
        {
            var token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImJvYiIsIm5hbWVpZCI6ImQzNGVjNTYzLWQzMDEtNDM0YS1hOWU3LWY2ZjY5MzNkYmI1YiIsImVtYWlsIjoiYm9iQHRlc3QuY29tIiwibmJmIjoxNzA2MjU4MDY4LCJleHAiOjE3MDY4NjI4NjgsImlhdCI6MTcwNjI1ODA2OH0.2DNhG47Au76gTEAqMyBm2N9o5Xm1znnC5S4NqAo5RWIQrjv8iG7PTOmgOl51WubuDSsnu6Rw5f2pk21WgCTWYQ";
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer",token);
            var results = await _httpClient.GetAsync("api/activities");
            if(!results.IsSuccessStatusCode)
            {
                throw new Exception("Error on API");
            }
        
            return await results.Content.ReadFromJsonAsync<IEnumerable<Activity>>();

        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message, ex);
        }

        return default;
    }
}
