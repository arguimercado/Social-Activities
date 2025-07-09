# Troubleshooting Guide

This guide helps you resolve common issues encountered when developing, building, or running the Social Activities application.

## 🔧 Build Issues

### .NET Build Problems

#### Issue: Package Restore Fails
**Error**: `Assets file 'obj/project.assets.json' not found`

**Solution**:
```bash
# Clear NuGet cache
dotnet nuget locals all --clear

# Restore packages
dotnet restore

# If still failing, delete obj and bin folders
rm -rf */obj */bin
dotnet restore
```

#### Issue: Entity Framework Migration Errors
**Error**: `Unable to create an object of type 'ActivityContext'`

**Solution**:
```bash
# Ensure connection string is configured
# Check appsettings.Development.json

# Create migration with explicit context
dotnet ef migrations add InitialCreate -p Persistence -s API -c ActivityContext

# Update database
dotnet ef database update -p Persistence -s API
```

#### Issue: Dependency Conflicts
**Error**: `Version conflict detected for package`

**Solution**:
```bash
# Check package versions
dotnet list package --outdated

# Update specific package
dotnet add package PackageName --version SpecificVersion

# Or use central package management
# Add to Directory.Packages.props
```

### Frontend Build Problems

#### Issue: npm Install Fails
**Error**: `ENOENT: no such file or directory`

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

#### Issue: TypeScript Compilation Errors
**Error**: `Cannot find module or its corresponding type declarations`

**Solution**:
```bash
# Install missing type definitions
npm install --save-dev @types/package-name

# Or update tsconfig.json to include proper paths
```

#### Issue: Vite Build Fails
**Error**: `Failed to resolve import`

**Solution**:
```bash
# Check import paths (case-sensitive)
# Ensure file extensions are correct
# Check vite.config.ts configuration

# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

## 🗄️ Database Issues

### Connection Problems

#### Issue: Cannot Connect to SQL Server
**Error**: `Login failed for user 'sa'`

**Solution**:
```bash
# Check SQL Server is running
sudo systemctl status mssql-server  # Linux
# Or check Services in Windows

# Verify connection string
# Check username/password
# Ensure SQL Server authentication is enabled
```

#### Issue: Database Does Not Exist
**Error**: `Cannot open database "ActivityDb" requested by the login`

**Solution**:
```bash
# Create database manually
sqlcmd -S localhost -U sa -P YourPassword
> CREATE DATABASE ActivityDb;
> GO
> EXIT

# Or run migrations
dotnet ef database update -p Persistence -s API
```

### Migration Issues

#### Issue: Migration Already Applied
**Error**: `Migration 'InitialCreate' has already been applied`

**Solution**:
```bash
# Check migration status
dotnet ef migrations list -p Persistence -s API

# Remove last migration if needed
dotnet ef migrations remove -p Persistence -s API

# Or create new migration
dotnet ef migrations add NewMigration -p Persistence -s API
```

#### Issue: Data Loss During Migration
**Error**: `Destructive changes detected`

**Solution**:
```bash
# Backup database first
sqlcmd -S localhost -U sa -P YourPassword -Q "BACKUP DATABASE ActivityDb TO DISK='backup.bak'"

# Create script instead of direct update
dotnet ef migrations script -p Persistence -s API

# Review script before applying
```

## 🔐 Authentication Issues

### JWT Token Problems

#### Issue: Token Validation Fails
**Error**: `IDX10223: Unable to validate token`

**Solution**:
```csharp
// Check token configuration in appsettings.json
{
  "Token": {
    "Key": "YourSecretKey_MustBe_AtLeast32Characters",
    "Expiration": 7
  }
}

// Ensure same key is used for signing and validation
```

#### Issue: Token Expires Too Quickly
**Error**: `Token has expired`

**Solution**:
```csharp
// Update token expiration in appsettings.json
{
  "Token": {
    "Expiration": 7  // Days
  }
}

// Or implement refresh token logic
```

### CORS Issues

#### Issue: CORS Policy Violation
**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Solution**:
```csharp
// Update CORS configuration in Program.cs
builder.Services.AddCors(opt => {
    opt.AddPolicy("CorsPolicy", policy => {
        policy
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials()
            .WithOrigins("http://localhost:5173"); // Add your frontend URL
    });
});
```

#### Issue: Preflight Request Fails
**Error**: `OPTIONS request fails`

**Solution**:
```csharp
// Ensure CORS is configured before authentication
app.UseCors("CorsPolicy");
app.UseAuthentication();
app.UseAuthorization();
```

## 🌐 API Issues

### Controller Problems

#### Issue: 404 Not Found
**Error**: `No action was found on the controller`

**Solution**:
```csharp
// Check route configuration
[Route("api/[controller]")]
[ApiController]
public class ActivitiesController : BaseApiController

// Verify action method signatures
[HttpGet("{id}")]
public async Task<IActionResult> GetActivity(string id)
```

#### Issue: Model Binding Fails
**Error**: `The JSON value could not be converted`

**Solution**:
```csharp
// Check request model structure
public record Command(ActivityRequest Activity) : IRequest<Result<Unit>>;

// Ensure request body matches expected structure
{
  "activity": {
    "title": "Test Activity",
    "date": "2024-01-15T08:00:00Z"
  }
}
```

### MediatR Issues

#### Issue: Handler Not Found
**Error**: `No handlers for request`

**Solution**:
```csharp
// Ensure MediatR is registered
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(List.Handler).Assembly));

// Check handler implements correct interface
public class Handler : IRequestHandler<Query, Result<List<Activity>>>
```

## 📡 SignalR Issues

### Connection Problems

#### Issue: SignalR Connection Fails
**Error**: `Failed to start connection`

**Solution**:
```typescript
// Check SignalR hub configuration
app.MapHub<ChatHub>("/chat");

// Verify client connection
const connection = new HubConnectionBuilder()
    .withUrl("/chat")
    .build();
```

#### Issue: Messages Not Received
**Error**: `Hub method not found`

**Solution**:
```csharp
// Check hub method name matches client call
public async Task SendComment(Create.Command command)

// Verify client method registration
connection.on("ReceiveComment", (comment) => {
    // Handle received comment
});
```

## 🎨 Frontend Issues

### React/TypeScript Problems

#### Issue: Component Not Rendering
**Error**: `Cannot read property of undefined`

**Solution**:
```typescript
// Check props and state initialization
interface Props {
    activity?: Activity;  // Make optional if it might be undefined
}

// Use optional chaining
const ActivityCard: React.FC<Props> = ({ activity }) => {
    if (!activity) return <div>Loading...</div>;
    
    return <div>{activity.title}</div>;
};
```

#### Issue: State Not Updating
**Error**: `Component not re-rendering`

**Solution**:
```typescript
// Check MobX observable configuration
class ActivityStore {
    @observable activities: Activity[] = [];
    
    @action
    loadActivities = async () => {
        this.activities = await agent.Activities.list();
    }
}

// Ensure component is wrapped with observer
export default observer(ActivityList);
```

### Routing Issues

#### Issue: Route Not Found
**Error**: `Cannot GET /activities`

**Solution**:
```typescript
// Check route configuration
<Route path="/activities" element={<ActivityDashboard />} />

// Ensure Router is properly configured
<BrowserRouter>
    <Routes>
        <Route path="/activities" element={<ActivityDashboard />} />
    </Routes>
</BrowserRouter>
```

## 🔍 Performance Issues

### Database Performance

#### Issue: Slow Query Performance
**Symptoms**: Long response times, timeout errors

**Solution**:
```sql
-- Add indexes to frequently queried columns
CREATE INDEX IX_Activities_Date ON Activities(Date);
CREATE INDEX IX_Activities_Category ON Activities(Category);
CREATE INDEX IX_Activities_Creator ON Activities(Creator);
```

```csharp
// Use explicit loading instead of lazy loading
var activities = await context.Activities
    .Include(a => a.Attendees)
    .ThenInclude(aa => aa.AppUser)
    .ToListAsync();
```

### Memory Issues

#### Issue: High Memory Usage
**Symptoms**: Application crashes, slow performance

**Solution**:
```csharp
// Dispose DbContext properly
using var context = new ActivityContext();

// Use streaming for large datasets
var activities = context.Activities.AsAsyncEnumerable();
await foreach (var activity in activities)
{
    // Process activity
}
```

### Frontend Performance

#### Issue: Large Bundle Size
**Symptoms**: Slow initial load

**Solution**:
```typescript
// Use lazy loading for components
const ActivityList = lazy(() => import('./ActivityList'));

// Code splitting for routes
<Route path="/activities" element={
    <Suspense fallback={<Loading />}>
        <ActivityList />
    </Suspense>
} />
```

## 🐛 Debugging Tips

### Backend Debugging

#### Enable Detailed Logging
```csharp
// In appsettings.Development.json
{
  "Logging": {
    "LogLevel": {
      "Default": "Debug",
      "Microsoft.AspNetCore": "Information",
      "Microsoft.EntityFrameworkCore": "Information"
    }
  }
}
```

#### Debug Entity Framework Queries
```csharp
// Enable sensitive data logging
builder.Services.AddDbContext<ActivityContext>(options =>
{
    options.UseSqlServer(connectionString);
    options.EnableSensitiveDataLogging();
    options.LogTo(Console.WriteLine);
});
```

### Frontend Debugging

#### React DevTools
```typescript
// Install React DevTools browser extension
// Enable MobX DevTools
import { configure } from 'mobx';

configure({
    enforceActions: 'always',
    computedRequiresReaction: true,
    reactionRequiresObservable: true,
    observableRequiresReaction: true,
    disableErrorBoundaries: true
});
```

#### Network Debugging
```typescript
// Add request/response interceptors
axios.interceptors.request.use(request => {
    console.log('Starting Request:', request);
    return request;
});

axios.interceptors.response.use(response => {
    console.log('Response:', response);
    return response;
}, error => {
    console.log('Error:', error);
    return Promise.reject(error);
});
```

## 📋 Common Error Codes

### HTTP Status Codes
- **400 Bad Request**: Invalid input data
- **401 Unauthorized**: Missing or invalid token
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server-side error

### Database Error Codes
- **2**: Cannot connect to server
- **18456**: Login failed
- **208**: Invalid object name
- **2627**: Primary key violation

### SignalR Error Codes
- **Connection failed**: Check hub configuration
- **Negotiation failed**: CORS or authentication issue
- **Transport error**: Network connectivity problem

## 🔧 Diagnostic Commands

### Check System Status
```bash
# Check .NET version
dotnet --version

# Check Node.js version
node --version

# Check database connectivity
sqlcmd -S localhost -U sa -P YourPassword -Q "SELECT @@VERSION"

# Check ports
netstat -tulpn | grep :5000
```

### Log Analysis
```bash
# Check application logs
tail -f /var/log/social-activities/app.log

# Check system logs
journalctl -u social-activities -f

# Check database logs
tail -f /var/log/mssql/error.log
```

## 🆘 Getting Help

### Documentation Resources
- [.NET Documentation](https://docs.microsoft.com/en-us/dotnet/)
- [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/)
- [React Documentation](https://reactjs.org/docs/)
- [SignalR Documentation](https://docs.microsoft.com/en-us/aspnet/core/signalr/)

### Community Support
- Stack Overflow
- GitHub Issues
- .NET Community Discord
- React Community Forums

### Development Tools
- Visual Studio Debugger
- Browser Developer Tools
- Database Management Tools
- Network Analysis Tools

## 🚀 Performance Optimization

### Database Optimization
```sql
-- Add indexes for common queries
CREATE INDEX IX_Activities_Date_Category ON Activities(Date, Category);

-- Update statistics
UPDATE STATISTICS Activities;
```

### API Optimization
```csharp
// Use async/await properly
public async Task<Result<List<Activity>>> Handle(Query request, CancellationToken cancellationToken)
{
    var activities = await _context.Activities
        .AsNoTracking()  // For read-only operations
        .ToListAsync(cancellationToken);
    
    return Result.Ok(activities);
}
```

### Frontend Optimization
```typescript
// Use React.memo for expensive components
const ActivityCard = React.memo(({ activity }: Props) => {
    return <div>{activity.title}</div>;
});

// Implement virtualization for large lists
import { FixedSizeList as List } from 'react-window';
```

Remember: Most issues can be resolved by checking logs, verifying configuration, and ensuring all dependencies are properly installed and configured. When in doubt, start with the basics and work your way up to more complex solutions.