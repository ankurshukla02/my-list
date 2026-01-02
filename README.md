# OTT My List Service

A Node.js/TypeScript API service for managing user watchlists in an OTT (Over-The-Top) platform. Users can add movies and TV shows to their personal lists, view their collections, and remove items.

## Features

- **User Management**: Basic user authentication with mock user IDs
- **Content Management**: Support for Movies and TV Shows with detailed metadata
- **My List Management**: Add, view, and remove items from personal watchlists
- **Soft Delete**: Data preservation through soft delete functionality
- **Database Integration**: MySQL database with Sequelize ORM
- **RESTful API**: Clean REST endpoints with proper HTTP status codes
- **Input Validation**: Joi schema validation for all API inputs
- **Testing**: Comprehensive integration tests with Jest
- **CI/CD**: GitHub Actions pipeline for automated deployment to VPS

## Tech Stack

- **Runtime**: Node.js v20+
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MySQL with Sequelize ORM
- **Testing**: Jest with Supertest
- **Process Management**: PM2
- **Deployment**: VPS with SSH/SCP

## Project Structure

```
├── src/
│   ├── app.ts                 # Express application setup
│   ├── server.ts              # Server entry point
│   ├── config/
│   │   ├── env.ts            # Environment configuration
│   │   └── sequelize.ts      # Database configuration
│   ├── constants/
│   │   └── contentType.ts    # Content type constants
│   ├── controllers/
│   │   └── myList.controller.ts # My List API endpoints
│   ├── errors/
│   │   └── domainError.ts    # Custom error handling
│   ├── middlewares/
│   │   └── mockAuth.middleware.ts # Mock authentication
│   ├── models/
│   │   ├── index.ts          # Model exports
│   │   ├── movie.model.ts    # Movie model
│   │   ├── tvShow.model.ts   # TV Show model
│   │   ├── user.model.ts     # User model
│   │   └── myList.model.ts   # My List model
│   ├── repositories/
│   │   └── myList.repository.ts # Data access layer
│   ├── routes/
│   │   └── myList.routes.ts  # API routes
│   ├── services/
│   │   └── myList.service.ts # Business logic
│   └── validations/
│       └── myList.validation.ts # Input validation
├── config/
│   └── config.js             # Sequelize CLI configuration
├── migrations/               # Database migrations
├── seeders/                  # Database seeders
├── tests/                    # Integration tests
└── .github/workflows/        # CI/CD pipeline
```

## Setup Instructions

### Prerequisites

- Node.js v20+
- MySQL database
- npm or yarn

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ott-my-list-service
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```bash
   # Database Configuration
   DB_USERNAME=root
   DB_PASSWORD=your_password
   DB_DATABASE=ott_my_list
   DB_HOST=localhost
   DB_DIALECT=mysql

   # Environment
   NODE_ENV=development
   ```

4. **Database Setup**
   ```bash
   # Create database
   mysql -u root -p -e "CREATE DATABASE ott_my_list;"

   # Run migrations
   npm run db:migrate

   # Run seeders (optional - adds sample data)
   npm run db:seed
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:3000`

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Build for Production

```bash
# Build TypeScript
npm run build

# Start production server
npm start
```

## API Endpoints

### My List Management

All endpoints require an `x-user-id` header with a mock user ID.

```
GET    /my-list          # Get user's list items with pagination
POST   /my-list          # Add item to list
DELETE /my-list          # Remove item from list (soft delete)
```

#### Soft Delete Behavior

The service implements **soft deletes** for data preservation. When an item is "removed" from a user's list:

- The item is marked as deleted with a `deleted_at` timestamp
- It no longer appears in list queries
- The data is preserved for potential future restoration or analytics
- Duplicate prevention still works (can't add the same item twice, even if previously soft deleted)

### Request/Response Examples

**Add to My List:**
```bash
POST /my-list
x-user-id: user_001
Content-Type: application/json

{
  "contentId": "movie_001",
  "contentType": "movie"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "contentId": "movie_001",
    "contentType": "movie",
    "addedAt": "2026-01-03T10:00:00.000Z",
    "content": {
      "id": "movie_001",
      "title": "Sample Movie",
      "description": "A great movie",
      "genres": ["Action", "Drama"],
      "releaseDate": "2023-01-01"
    }
  }
}
```

**Remove from My List:**
```bash
DELETE /my-list
x-user-id: user_001
Content-Type: application/json

{
  "contentId": "movie_001",
  "contentType": "movie"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Item removed from My List"
}
```

## Design Choices

### Architecture

- **Layered Architecture**: Clear separation between routes, controllers, services, and repositories
- **Repository Pattern**: Data access abstraction for better testability and maintainability
- **Service Layer**: Business logic separation from controllers
- **Validation Layer**: Input validation using Joi schemas

### Performance Optimizations

- **Database Indexing**: Proper indexing on frequently queried columns (user_id, content_id)
- **Connection Pooling**: Sequelize connection pooling for efficient database connections
- **Lazy Loading**: Models are loaded only when needed
- **Efficient Queries**: Optimized SQL queries with proper joins and selections

### Scalability Considerations

- **Stateless API**: No server-side sessions, all state in database
- **Database Optimization**: Proper normalization and indexing
- **Modular Code**: Easy to add new features and content types
- **Environment Configuration**: Different configs for dev/test/prod environments

### Security

- **Input Validation**: All inputs validated using Joi schemas
- **SQL Injection Prevention**: Sequelize parameterized queries
- **Error Handling**: Proper error responses without sensitive data exposure
- **Environment Variables**: Sensitive data stored in environment variables

## Assumptions

- Basic user authentication is handled externally (mock user IDs used)
- MySQL is the primary database (with SQLite for testing)
- Content types are limited to Movies (1) and TV Shows (2)
- Single watchlist per user (no multiple lists feature)
- Content metadata is stored as JSON for flexibility
- API responses follow REST conventions
- Database constraints ensure data integrity

## Deployment

This application includes a complete CI/CD pipeline for deployment to VPS:

- **GitHub Actions**: Automated build, test, and deploy
- **VPS Deployment**: SSH-based deployment with PM2 process management
- **Environment Management**: Separate configurations for different environments

See `DEPLOY.md` for detailed deployment instructions.

## Testing

- **Integration Tests**: Full API testing with database setup/teardown
- **Test Database**: SQLite in-memory for fast, isolated tests
- **Seeders**: Idempotent seeders that prevent duplicate data insertion
- **Coverage**: Comprehensive test coverage for all endpoints

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

ISC