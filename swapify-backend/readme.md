# Swapify Backend API

A robust Node.js backend API for the Swapify marketplace platform, enabling users to buy, sell, and swap items with integrated authentication, real-time chat, and secure offer management.

## Features

- **User Authentication & Authorization**

  - JWT-based authentication
  - Google OAuth integration
  - Password reset functionality
  - Email verification system
  - Role-based access control (User/Admin)
- **Listing Management**

  - Create, read, update, delete listings
  - Image upload and management
  - Category and subcategory organization
  - Location-based filtering
  - Status management (draft, active, sold, etc.)
- **Real-time Chat System**

  - Direct messaging between users
  - Chat history management
  - Message notifications
- **Offer Management**

  - Send and receive offers on listings
  - Accept/reject offer functionality
  - Offer status tracking
- **Security Features**

  - Password hashing with bcrypt
  - JWT token validation
  - CORS configuration
  - Input validation and sanitization

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT, Google OAuth
- **Email Service**: Nodemailer
- **Security**: bcryptjs, CORS
- **Development**: Nodemon
- **Process Management**: PM2

## Project Structure

```
swapify-backend/
├── app.js                 # Main application entry point
├── package.json          # Project dependencies and scripts
├── .env.example          # Environment variables template
├── config/
│   └── db.js            # Database connection configuration
├── middlewares/
│   └── authMiddleware.js # JWT authentication middleware
├── models/
│   ├── User.js          # User data model
│   ├── Listing.js       # Listing data model
│   ├── Chat.js          # Chat data model
│   └── Offer.js         # Offer data model
├── routes/
│   ├── authRoutes.js    # Authentication endpoints
│   ├── listingRoutes.js # Listing management endpoints
│   ├── chatRoutes.js    # Chat system endpoints
│   └── offerRoutes.js   # Offer management endpoints
└── utils/
    └── emailService.js  # Email notification utilities
```

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn package manager

### 1. Clone the Repository

```bash
git clone <repository-url>
cd swapify-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory and configure the following variables:

```env
# Server Configuration
PORT=5000

# Database
MONGO_URI=mongodb://localhost:27017/swapify
# OR use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/swapify

# JWT Secret
JWT_SECRET=your_super_secure_jwt_secret_key_here

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password
```

### 4. Database Setup

Ensure MongoDB is running locally or configure MongoDB Atlas connection string in your `.env` file.

### 5. Start the Development Server

```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000` (or your configured PORT).

## API Endpoints

### Authentication Routes


| Method | Endpoint                    | Description               |
| ------ | --------------------------- | ------------------------- |
| POST   | `/api/auth/register`        | User registration         |
| POST   | `/api/auth/login`           | User login                |
| POST   | `/api/auth/forgot-password` | Request password reset    |
| POST   | `/api/auth/reset-password`  | Reset password with token |
| GET    | `/api/auth/verify-token`    | Verify JWT token          |
| GET    | `/api/auth/user`            | Get current user profile  |

### Listing Routes


| Method | Endpoint            | Description                   |
| ------ | ------------------- | ----------------------------- |
| GET    | `/api/listings`     | Get all listings with filters |
| GET    | `/api/listings/:id` | Get specific listing          |
| POST   | `/api/listings`     | Create new listing            |
| PUT    | `/api/listings/:id` | Update listing                |
| DELETE | `/api/listings/:id` | Delete listing                |
| GET    | `/api/my-listings`  | Get user's listings           |

### Chat Routes


| Method | Endpoint                      | Description                   |
| ------ | ----------------------------- | ----------------------------- |
| GET    | `/api/chats`                  | Get user's chat conversations |
| GET    | `/api/chats/:chatId`          | Get specific chat messages    |
| POST   | `/api/chats`                  | Create new chat               |
| POST   | `/api/chats/:chatId/messages` | Send message                  |

### Offer Routes


| Method | Endpoint                         | Description            |
| ------ | -------------------------------- | ---------------------- |
| GET    | `/api/offers`                    | Get user's offers      |
| POST   | `/api/offers`                    | Create new offer       |
| PUT    | `/api/offers/:id`                | Update offer status    |
| GET    | `/api/offers/listing/:listingId` | Get offers for listing |

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

Protected routes require valid JWT tokens. The `authMiddleware.js` handles token verification.

## Data Models

### User Model

- Profile information (username, email, phone, address)
- Authentication data (password hash, Google ID)
- Verification status
- Role management

### Listing Model

- Product details (title, description, price)
- Images (cover + additional images)
- Location and category information
- Status management (active, sold, etc.)

### Chat Model

- Conversation between users
- Message history
- Participant management

### Offer Model

- Offer details and pricing
- Status tracking (pending, accepted, rejected)
- Buyer-seller relationship

## Deployment

### Using PM2 (Recommended)

```bash
# Install PM2 globally
npm install -g pm2

# Start application with PM2
pm2 start app.js --name "swapify-backend"

# Monitor applications
pm2 monit

# Restart application
pm2 restart swapify-backend
```

### Environment Variables for Production

Ensure all production environment variables are properly configured:

- Use strong JWT secrets
- Configure production MongoDB URI
- Set up production email credentials
- Update FRONTEND_URL to production domain

## Development

### Available Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm test           # Run tests (not configured yet)
```

### Code Style & Best Practices

- Follow RESTful API conventions
- Use async/await for asynchronous operations
- Implement proper error handling
- Validate input data
- Use meaningful commit messages


Built with ❤️ for the Swapify marketplace platform.
