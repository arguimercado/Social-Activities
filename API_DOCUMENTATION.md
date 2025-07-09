# API Documentation

## Overview

This document provides comprehensive information about the Social Activities API endpoints, request/response formats, and authentication requirements.

## Base URL

- **Development**: `https://localhost:5000/api`
- **Production**: `https://your-domain.com/api`

## Authentication

The API uses JWT (JSON Web Token) authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

Most endpoints require authentication except for registration and login.

## Response Format

All API responses follow a consistent format:

### Success Response
```json
{
  "isSuccess": true,
  "value": { /* actual data */ },
  "error": null
}
```

### Error Response
```json
{
  "isSuccess": false,
  "value": null,
  "error": "Error message"
}
```

## Authentication Endpoints

### Register User
**POST** `/api/account/register`

Register a new user account.

**Request Body**:
```json
{
  "displayName": "John Doe",
  "email": "john@example.com",
  "username": "johndoe",
  "password": "Password123!"
}
```

**Response**:
```json
{
  "isSuccess": true,
  "value": {
    "displayname": "John Doe",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "username": "johndoe",
    "image": null
  }
}
```

### Login
**POST** `/api/account/login`

Authenticate user and receive JWT token.

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "Password123!"
}
```

**Response**:
```json
{
  "isSuccess": true,
  "value": {
    "displayname": "John Doe",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "username": "johndoe",
    "image": "https://res.cloudinary.com/..."
  }
}
```

### Get Current User
**GET** `/api/account`

Get current authenticated user information.

**Headers**: `Authorization: Bearer <token>`

**Response**:
```json
{
  "isSuccess": true,
  "value": {
    "displayname": "John Doe",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "username": "johndoe",
    "image": "https://res.cloudinary.com/..."
  }
}
```

## Activity Endpoints

### Get All Activities
**GET** `/api/activities`

Retrieve all activities.

**Headers**: `Authorization: Bearer <token>`

**Response**:
```json
{
  "isSuccess": true,
  "value": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "title": "Morning Yoga",
      "date": "2024-01-15T08:00:00Z",
      "description": "Relaxing yoga session",
      "category": "Health",
      "city": "New York",
      "venue": "Central Park",
      "creator": "johndoe",
      "createdAt": "2024-01-01T10:00:00Z",
      "cancel": {
        "isCancelled": false
      },
      "attendees": [
        {
          "username": "johndoe",
          "displayName": "John Doe",
          "image": "https://res.cloudinary.com/...",
          "isHost": true
        }
      ]
    }
  ]
}
```

### Get Activity Details
**GET** `/api/activities/{id}`

Get detailed information about a specific activity.

**Parameters**:
- `id`: Activity ID (GUID)

**Headers**: `Authorization: Bearer <token>`

**Response**:
```json
{
  "isSuccess": true,
  "value": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "title": "Morning Yoga",
    "date": "2024-01-15T08:00:00Z",
    "description": "Relaxing yoga session",
    "category": "Health",
    "city": "New York",
    "venue": "Central Park",
    "creator": "johndoe",
    "createdAt": "2024-01-01T10:00:00Z",
    "cancel": {
      "isCancelled": false
    },
    "attendees": [
      {
        "username": "johndoe",
        "displayName": "John Doe",
        "image": "https://res.cloudinary.com/...",
        "isHost": true
      }
    ],
    "comments": [
      {
        "id": 1,
        "body": "Looking forward to this!",
        "createdAt": "2024-01-02T10:00:00Z",
        "userName": "janedoe",
        "displayname": "Jane Doe",
        "image": "https://res.cloudinary.com/..."
      }
    ]
  }
}
```

### Create Activity
**POST** `/api/activities`

Create a new activity.

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "activity": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "title": "Morning Yoga",
    "date": "2024-01-15T08:00:00Z",
    "description": "Relaxing yoga session",
    "category": "Health",
    "city": "New York",
    "venue": "Central Park"
  }
}
```

**Response**:
```json
{
  "isSuccess": true,
  "value": null
}
```

### Update Activity
**PUT** `/api/activities/{id}`

Update an existing activity (host only).

**Parameters**:
- `id`: Activity ID (GUID)

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "activity": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "title": "Evening Yoga",
    "date": "2024-01-15T18:00:00Z",
    "description": "Relaxing evening yoga session",
    "category": "Health",
    "city": "New York",
    "venue": "Central Park"
  }
}
```

**Response**:
```json
{
  "isSuccess": true,
  "value": null
}
```

### Delete Activity
**DELETE** `/api/activities/{id}`

Delete an activity (host only).

**Parameters**:
- `id`: Activity ID (GUID)

**Headers**: `Authorization: Bearer <token>`

**Response**:
```json
{
  "isSuccess": true,
  "value": null
}
```

### Join/Leave Activity
**POST** `/api/activities/{id}/attend`

Toggle attendance for an activity.

**Parameters**:
- `id`: Activity ID (GUID)

**Headers**: `Authorization: Bearer <token>`

**Response**:
```json
{
  "isSuccess": true,
  "value": null
}
```

### Remove Attendee
**DELETE** `/api/activities/{id}/remove/{username}`

Remove an attendee from activity (host only).

**Parameters**:
- `id`: Activity ID (GUID)
- `username`: Username to remove

**Headers**: `Authorization: Bearer <token>`

**Response**:
```json
{
  "isSuccess": true,
  "value": null
}
```

## Profile Endpoints

### Get User Profile
**GET** `/api/profiles/{username}`

Get user profile information.

**Parameters**:
- `username`: Username

**Headers**: `Authorization: Bearer <token>`

**Response**:
```json
{
  "isSuccess": true,
  "value": {
    "username": "johndoe",
    "displayName": "John Doe",
    "bio": "Yoga enthusiast and nature lover",
    "image": "https://res.cloudinary.com/...",
    "photos": [
      {
        "id": "photo123",
        "url": "https://res.cloudinary.com/...",
        "isMain": true
      }
    ],
    "activities": [
      {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "title": "Morning Yoga",
        "date": "2024-01-15T08:00:00Z",
        "category": "Health"
      }
    ]
  }
}
```

### Update Profile
**PUT** `/api/profiles`

Update current user's profile.

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "displayname": "John Smith",
  "bio": "Updated bio information"
}
```

**Response**:
```json
{
  "isSuccess": true,
  "value": null
}
```

## Photo Endpoints

### Upload Photo
**POST** `/api/photos`

Upload a new profile photo.

**Headers**: `Authorization: Bearer <token>`

**Request Body**: `multipart/form-data`
- `file`: Image file

**Response**:
```json
{
  "isSuccess": true,
  "value": {
    "id": "photo123",
    "url": "https://res.cloudinary.com/...",
    "isMain": false
  }
}
```

### Delete Photo
**DELETE** `/api/photos/{photoId}`

Delete a profile photo.

**Parameters**:
- `photoId`: Photo ID

**Headers**: `Authorization: Bearer <token>`

**Response**:
```json
{
  "isSuccess": true,
  "value": null
}
```

### Set Main Photo
**POST** `/api/photos/{photoId}/setMain`

Set a photo as the main profile photo.

**Parameters**:
- `photoId`: Photo ID

**Headers**: `Authorization: Bearer <token>`

**Response**:
```json
{
  "isSuccess": true,
  "value": null
}
```

## Follow Endpoints

### Follow/Unfollow User
**POST** `/api/follow/{username}`

Toggle follow status for a user.

**Parameters**:
- `username`: Username to follow/unfollow

**Headers**: `Authorization: Bearer <token>`

**Response**:
```json
{
  "isSuccess": true,
  "value": null
}
```

## Real-time Communication (SignalR)

### Connection
**WebSocket**: `/chat`

Connect to the SignalR hub for real-time comments.

### Join Activity Chat
When connecting, provide the activity ID as a query parameter:
```
/chat?activityId=123e4567-e89b-12d3-a456-426614174000
```

### Send Comment
**Method**: `SendComment`

**Parameters**:
```json
{
  "activityId": "123e4567-e89b-12d3-a456-426614174000",
  "body": "This is a comment"
}
```

### Receive Comments
**Event**: `ReceiveComment`

**Data**:
```json
{
  "id": 1,
  "body": "This is a comment",
  "createdAt": "2024-01-02T10:00:00Z",
  "userName": "johndoe",
  "displayname": "John Doe",
  "image": "https://res.cloudinary.com/..."
}
```

### Load Comments
**Event**: `LoadComments`

Receives all comments for the activity when joining.

## Error Codes

### HTTP Status Codes
- `200`: Success
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (authentication required)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found
- `500`: Internal Server Error

### Common Error Messages
- `"Invalid email or password"`: Login failed
- `"Email already exists"`: Registration with existing email
- `"Activity not found"`: Invalid activity ID
- `"Unauthorized"`: Missing or invalid token
- `"Problem updating profile"`: Profile update failed

## Rate Limiting

Currently no rate limiting is implemented, but it's recommended for production deployments.

## Swagger Documentation

In development mode, interactive API documentation is available at:
- `https://localhost:5000/swagger`

## Sample API Calls

### JavaScript/Axios Examples

```javascript
// Login
const loginResponse = await axios.post('/api/account/login', {
  email: 'john@example.com',
  password: 'Password123!'
});

// Get activities with authentication
const activitiesResponse = await axios.get('/api/activities', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

// Create activity
const createResponse = await axios.post('/api/activities', {
  activity: {
    id: '123e4567-e89b-12d3-a456-426614174000',
    title: 'Morning Yoga',
    date: '2024-01-15T08:00:00Z',
    description: 'Relaxing yoga session',
    category: 'Health',
    city: 'New York',
    venue: 'Central Park'
  }
}, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

### cURL Examples

```bash
# Login
curl -X POST https://localhost:5000/api/account/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"Password123!"}'

# Get activities
curl -X GET https://localhost:5000/api/activities \
  -H "Authorization: Bearer <your-token>"

# Create activity
curl -X POST https://localhost:5000/api/activities \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "activity": {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "title": "Morning Yoga",
      "date": "2024-01-15T08:00:00Z",
      "description": "Relaxing yoga session",
      "category": "Health",
      "city": "New York",
      "venue": "Central Park"
    }
  }'
```

This API documentation provides comprehensive information for integrating with the Social Activities platform. For additional support or questions, please refer to the main README or create an issue in the repository.