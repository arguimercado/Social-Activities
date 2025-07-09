# Contributing to Social Activities

Thank you for your interest in contributing to the Social Activities project! This guide will help you get started with development and understand our contribution process.

## 🚀 Getting Started

### Prerequisites
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) (v16 or higher)
- [SQL Server](https://www.microsoft.com/sql-server) or SQL Server Express
- [Git](https://git-scm.com/)
- IDE: [Visual Studio](https://visualstudio.microsoft.com/), [VS Code](https://code.visualstudio.com/), or [Rider](https://www.jetbrains.com/rider/)

### Development Setup

1. **Fork the repository**
   ```bash
   # Fork the repo on GitHub, then clone your fork
   git clone https://github.com/your-username/Social-Activities.git
   cd Social-Activities
   
   # Add upstream remote
   git remote add upstream https://github.com/arguimercado/Social-Activities.git
   ```

2. **Backend Setup**
   ```bash
   # Restore packages
   dotnet restore
   
   # Update database connection in API/appsettings.Development.json
   # Run migrations
   dotnet ef database update -p Persistence -s API
   
   # Build solution
   dotnet build
   ```

3. **Frontend Setup**
   ```bash
   cd client-app
   npm install
   ```

4. **Run the application**
   ```bash
   # Terminal 1: Backend
   cd API
   dotnet watch run
   
   # Terminal 2: Frontend  
   cd client-app
   npm run dev
   ```

## 🏗️ Project Structure

### Backend (.NET)
```
├── API/                    # Web API controllers, SignalR hubs
├── Application/            # Business logic, CQRS handlers
├── Domain/                 # Domain entities and business rules
├── Persistence/           # Data access, EF Core context
└── WebApp/                # Blazor components (optional)
```

### Frontend (React)
```
client-app/
├── src/
│   ├── app/
│   │   ├── components/     # Reusable UI components
│   │   ├── features/       # Feature-specific components
│   │   ├── stores/         # MobX state management
│   │   └── layout/         # App layout components
│   └── ...
```

## 📋 Development Guidelines

### Code Standards

#### Backend (.NET)
- Follow [Microsoft C# Coding Conventions](https://docs.microsoft.com/en-us/dotnet/csharp/fundamentals/coding-style/coding-conventions)
- Use Clean Architecture principles
- Implement CQRS pattern with MediatR
- Use meaningful names for classes, methods, and variables
- Add XML documentation for public APIs

**Example**:
```csharp
namespace Application.Features.Activities
{
    /// <summary>
    /// Creates a new activity
    /// </summary>
    public static class Create
    {
        public record Command(ActivityRequest Activity) : IRequest<Result<Unit>>;
        
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
            }
        }
        
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            // Implementation
        }
    }
}
```

#### Frontend (TypeScript/React)
- Use TypeScript for type safety
- Follow React best practices and hooks patterns
- Use functional components over class components
- Implement proper error boundaries
- Use semantic HTML and accessibility best practices

**Example**:
```typescript
interface Props {
    activity: Activity;
    onEdit: (activity: Activity) => void;
}

export const ActivityCard: React.FC<Props> = ({ activity, onEdit }) => {
    const handleEdit = useCallback(() => {
        onEdit(activity);
    }, [activity, onEdit]);
    
    return (
        <Card>
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Description>{activity.description}</Card.Description>
            </Card.Content>
        </Card>
    );
};
```

### File Naming Conventions

#### Backend
- **Classes**: PascalCase (`ActivityService.cs`)
- **Methods**: PascalCase (`GetActivitiesAsync`)
- **Properties**: PascalCase (`Title`, `Description`)
- **Fields**: camelCase with underscore (`_repository`)
- **Constants**: PascalCase (`MaxFileSize`)

#### Frontend
- **Components**: PascalCase (`ActivityCard.tsx`)
- **Hooks**: camelCase starting with 'use' (`useActivityStore.ts`)
- **Utilities**: camelCase (`formatDate.ts`)
- **Stores**: camelCase (`activityStore.ts`)

### Git Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/activity-filtering
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow existing patterns and conventions
   - Add appropriate tests

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add activity filtering functionality"
   ```

4. **Push and create PR**
   ```bash
   git push origin feature/activity-filtering
   ```

### Commit Message Format

Use [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes

**Examples**:
```
feat(activities): add activity filtering by category
fix(auth): resolve token refresh issue
docs: update API documentation
test(activities): add unit tests for activity service
```

## 🧪 Testing

### Backend Testing
```bash
# Run all tests
dotnet test

# Run specific test project
dotnet test Application.Tests/

# Run with coverage
dotnet test --collect:"XPlat Code Coverage"
```

### Frontend Testing
```bash
cd client-app

# Run tests
npm test

# Run with coverage
npm test -- --coverage

# Run end-to-end tests
npm run test:e2e
```

### Test Structure

#### Backend Tests
```csharp
[TestClass]
public class ActivityServiceTests
{
    [TestMethod]
    public async Task CreateActivity_ValidData_ReturnsSuccess()
    {
        // Arrange
        var activity = new Activity { Title = "Test Activity" };
        
        // Act
        var result = await _service.CreateActivityAsync(activity);
        
        // Assert
        Assert.IsTrue(result.IsSuccess);
    }
}
```

#### Frontend Tests
```typescript
describe('ActivityCard', () => {
    it('renders activity title correctly', () => {
        const activity = { id: '1', title: 'Test Activity' };
        
        render(<ActivityCard activity={activity} onEdit={jest.fn()} />);
        
        expect(screen.getByText('Test Activity')).toBeInTheDocument();
    });
});
```

## 🔍 Code Review Process

### Before Submitting a PR

1. **Self-review your code**
   - Check for consistent formatting
   - Verify all tests pass
   - Ensure no sensitive data is committed

2. **Update documentation**
   - Update README if needed
   - Add/update API documentation
   - Include inline code comments

3. **Check build status**
   ```bash
   # Backend
   dotnet build
   dotnet test
   
   # Frontend
   npm run build
   npm test
   npm run lint
   ```

### PR Requirements

- **Clear description**: Explain what the PR does and why
- **Linked issues**: Reference related GitHub issues
- **Small, focused changes**: Avoid large, monolithic PRs
- **Tests included**: Add tests for new functionality
- **Documentation updated**: Keep docs in sync with code changes

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests pass locally
```

## 🚀 Feature Development

### Adding New Features

1. **Create feature branch**
   ```bash
   git checkout -b feature/new-feature-name
   ```

2. **Backend development**
   ```bash
   # Add domain entities (if needed)
   # Create application handlers
   # Add API controllers
   # Update database (migrations)
   ```

3. **Frontend development**
   ```bash
   # Create React components
   # Add MobX stores
   # Implement API calls
   # Update routing
   ```

### Feature Structure Example

For a new "Activity Categories" feature:

**Backend**:
```
Domain/Categories/
├── Category.cs
└── CategoryType.cs

Application/Features/Categories/
├── Create.cs
├── List.cs
├── Update.cs
└── Delete.cs

API/Controllers/
└── CategoriesController.cs
```

**Frontend**:
```
src/app/features/categories/
├── CategoryList.tsx
├── CategoryForm.tsx
├── CategoryCard.tsx
└── hooks/
    └── useCategoryStore.ts
```

## 🐛 Bug Fixes

### Bug Report Process

1. **Check existing issues** first
2. **Create detailed bug report** with:
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details
   - Screenshots (if applicable)

3. **Fix the bug**:
   - Create branch: `fix/bug-description`
   - Write failing test first
   - Implement fix
   - Verify test passes
   - Submit PR

## 📚 Documentation

### Types of Documentation

1. **Code Documentation**
   - Inline comments for complex logic
   - XML documentation for public APIs
   - README updates for new features

2. **API Documentation**
   - Update `API_DOCUMENTATION.md`
   - Swagger annotations
   - Request/response examples

3. **Architecture Documentation**
   - Update `ARCHITECTURE.md`
   - Diagram updates
   - Design decision explanations

## 🔧 Development Tools

### Recommended Extensions

#### VS Code
- C# Extension Pack
- REST Client
- GitLens
- Prettier
- ESLint
- TypeScript Hero

#### Visual Studio
- ReSharper (optional)
- Web Essentials
- Git Extensions

### Debugging

#### Backend Debugging
```bash
# Run in debug mode
dotnet run --configuration Debug

# Attach debugger
# Set breakpoints in IDE
```

#### Frontend Debugging
```bash
# Run dev server
npm run dev

# Chrome DevTools
# React Developer Tools
# MobX Developer Tools
```

## 📦 Dependencies

### Adding Dependencies

#### Backend
```bash
# Add NuGet package
dotnet add package PackageName

# Update project file
# Update documentation
```

#### Frontend
```bash
# Add npm package
npm install package-name

# Update package.json
# Update documentation
```

### Security Considerations

- Review dependency security advisories
- Keep dependencies updated
- Use npm audit for frontend security
- Follow OWASP guidelines

## 🤝 Community

### Getting Help

- **GitHub Issues**: Report bugs and request features
- **Discussions**: Ask questions and share ideas
- **Code Review**: Learn from feedback

### Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help newcomers learn
- Follow GitHub's community guidelines

## 📋 Release Process

### Version Numbering

We follow [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes

### Release Checklist

1. Update version numbers
2. Update CHANGELOG.md
3. Create release branch
4. Run full test suite
5. Create GitHub release
6. Deploy to production

## 🏆 Recognition

Contributors are recognized through:
- GitHub contributor listings
- CHANGELOG.md mentions
- Special thanks in releases

Thank you for contributing to Social Activities! Your efforts help make this project better for everyone. 🎉