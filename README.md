# Social Activities - Event Management Platform

A full-stack social event management platform built with modern web technologies, following Clean Architecture principles. This application allows users to create, manage, and participate in social activities and events.

## 🌟 Features

### Core Functionality
- **Event Management**: Create, edit, and manage social activities
- **User Authentication**: Secure registration and login system
- **Profile Management**: User profiles with photo uploads and bios
- **Activity Participation**: Join/leave activities, track attendees
- **Real-time Comments**: Live chat system for activities using SignalR
- **Photo Management**: Upload, delete, and set main profile photos
- **Social Features**: Follow/unfollow users, activity feeds
- **Activity Cancellation**: Hosts can cancel activities
- **Responsive Design**: Mobile-friendly interface

### Technical Highlights
- **Clean Architecture**: Separation of concerns with Domain, Application, Infrastructure layers
- **CQRS Pattern**: Command Query Responsibility Segregation using MediatR
- **Real-time Communication**: SignalR for live comments and notifications
- **Authentication & Authorization**: JWT-based authentication with role-based access
- **Database**: Entity Framework Core with SQL Server
- **Modern Frontend**: React with TypeScript, MobX state management
- **API Documentation**: Swagger/OpenAPI integration

## 🏗️ Architecture

### Backend (.NET 8)
```
┌─────────────────┐
│      API        │ ← Controllers, SignalR Hubs, Middleware
├─────────────────┤
│   Application   │ ← Features (CQRS), DTOs, Validators
├─────────────────┤
│     Domain      │ ← Entities, Value Objects, Interfaces
├─────────────────┤
│   Persistence   │ ← DbContext, Repositories, Migrations
└─────────────────┘
```

### Frontend (React + TypeScript)
```
┌─────────────────┐
│   Components    │ ← Reusable UI Components
├─────────────────┤
│    Features     │ ← Feature-specific components
├─────────────────┤
│     Stores      │ ← MobX state management
├─────────────────┤
│    Services     │ ← API calls, utilities
└─────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) (v16+)
- [SQL Server](https://www.microsoft.com/sql-server) or SQL Server Express
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/arguimercado/Social-Activities.git
   cd Social-Activities
   ```

2. **Setup Backend**
   ```bash
   # Restore NuGet packages
   dotnet restore
   
   # Update database connection string in API/appsettings.Development.json
   # Update the ConnectionStrings:DefaultConnection value
   
   # Run database migrations
   dotnet ef database update -p Persistence -s API
   
   # Build the solution
   dotnet build
   ```

3. **Setup Frontend**
   ```bash
   cd client-app
   npm install
   ```

4. **Run the Application**
   
   **Backend** (Terminal 1):
   ```bash
   cd API
   dotnet run
   ```
   Backend will run on: `https://localhost:5000`

   **Frontend** (Terminal 2):
   ```bash
   cd client-app
   npm run dev
   ```
   Frontend will run on: `http://localhost:5173`

## 📊 Database Schema

### Key Entities

**Activities**
- Id (Guid), Title, Description, Date, Category, City, Venue
- Creator, CreatedAt, Cancel status
- Relationships: Attendees, Comments

**Users (AppUser)**
- Extends IdentityUser
- DisplayName, Bio, Photos, Activities, Followers/Following

**Comments**
- Real-time comments on activities
- Author, Body, CreatedAt, Activity association

**Photos**
- User profile photos with main photo designation
- Cloudinary integration for storage

## 🔧 Configuration

### Backend Configuration
Update `API/appsettings.Development.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Your SQL Server connection string"
  },
  "Token": {
    "Key": "Your JWT secret key",
    "Expiration": 1
  },
  "Cloudinary": {
    "CloudName": "your-cloudinary-name",
    "ApiKey": "your-api-key",
    "ApiSecret": "your-api-secret"
  }
}
```

### Frontend Configuration
Update `client-app/.env.development`:
```env
VITE_API_URL=http://localhost:5000/api
```

## 🛠️ Development

### Backend Development
```bash
# Run with hot reload
dotnet watch run --project API

# Run tests (if available)
dotnet test

# Create new migration
dotnet ef migrations add MigrationName -p Persistence -s API
```

### Frontend Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Preview production build
npm run preview
```

## 📡 API Endpoints

### Authentication
- `POST /api/account/register` - Register new user
- `POST /api/account/login` - User login  
- `GET /api/account` - Get current user

### Activities
- `GET /api/activities` - Get all activities
- `GET /api/activities/{id}` - Get specific activity
- `POST /api/activities` - Create activity
- `PUT /api/activities/{id}` - Update activity
- `DELETE /api/activities/{id}` - Delete activity
- `POST /api/activities/{id}/attend` - Join/leave activity

### Profiles
- `GET /api/profiles/{username}` - Get user profile
- `PUT /api/profiles` - Update profile

### Photos
- `POST /api/photos` - Upload photo
- `DELETE /api/photos/{id}` - Delete photo
- `POST /api/photos/{id}/setMain` - Set main photo

### Real-time (SignalR)
- Hub endpoint: `/chat`
- Join activity chat groups
- Send/receive real-time comments

## 🔐 Security Features

- JWT Authentication with refresh tokens
- Role-based authorization
- CORS configuration
- Input validation with FluentValidation
- SQL injection prevention with Entity Framework
- XSS protection

## 📦 Technologies Used

### Backend
- **.NET 8**: Core framework
- **Entity Framework Core**: ORM for database operations
- **MediatR**: CQRS and mediator pattern implementation
- **ASP.NET Identity**: User authentication and authorization
- **SignalR**: Real-time communication
- **FluentValidation**: Input validation
- **AutoMapper**: Object-to-object mapping
- **Swagger**: API documentation

### Frontend
- **React 18**: UI framework
- **TypeScript**: Type-safe JavaScript
- **MobX**: State management
- **React Router**: Client-side routing
- **Semantic UI React**: UI component library
- **Axios**: HTTP client
- **Formik**: Form handling
- **React Toastify**: Notifications
- **Vite**: Build tool and development server

### Infrastructure
- **SQL Server**: Database
- **Cloudinary**: Image storage (optional)
- **SignalR**: Real-time communication

## 🚀 Deployment

### Backend Deployment
1. Update `appsettings.json` with production settings
2. Build the application: `dotnet build --configuration Release`
3. Publish: `dotnet publish --configuration Release`
4. Deploy to your hosting provider (Azure, AWS, etc.)

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder to your hosting provider
3. Update API URL in environment configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and commit: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

### Development Guidelines
- Follow Clean Architecture principles
- Use CQRS pattern for new features
- Write unit tests for business logic
- Follow naming conventions
- Update documentation for new features

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Troubleshooting

### Common Issues

**Database Connection Issues**
- Ensure SQL Server is running
- Check connection string in appsettings.json
- Run migrations: `dotnet ef database update`

**CORS Issues**
- Verify frontend URL in CORS policy (Program.cs)
- Check API URL in frontend configuration

**SignalR Connection Issues**
- Ensure both backend and frontend are running
- Check browser console for connection errors
- Verify SignalR hub endpoint configuration

## 📞 Support

For support, please create an issue in the GitHub repository or contact the maintainers.

