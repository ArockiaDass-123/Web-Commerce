# E-Commerce Shopping Cart Application

A complete full-stack e-commerce shopping cart application built with Node.js, Express, MongoDB, React, and Tailwind CSS.

## Features

- **User Authentication**: JWT-based authentication with single-device login enforcement
- **Shopping Cart**: Add items to cart, view cart contents
- **Order Management**: Convert cart to orders, view order history
- **Secure API**: Protected routes with JWT middleware
- **Modern UI**: Beautiful, responsive design with Tailwind CSS

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (jsonwebtoken)
- bcryptjs for password hashing
- CORS enabled

### Frontend
- React 18
- Vite
- Tailwind CSS
- Axios
- Lucide React (icons)

## Project Structure

```
Web-Commerce/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Item.js
│   │   ├── Cart.js
│   │   └── Order.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── itemRoutes.js
│   │   ├── cartRoutes.js
│   │   └── orderRoutes.js
│   ├── server.js
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   ├── ItemList.jsx
│   │   │   └── Navbar.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
└── package.json
```

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or MongoDB Atlas)

### Setup

1. **Install all dependencies**:
   ```bash
   npm run install-all
   ```

   Or install separately:
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

2. **Configure Backend Environment**:
   
   Edit `backend/.env` file:
   ```env
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   PORT=5000
   ```

3. **Start MongoDB**:
   
   Make sure MongoDB is running on your system.

## Running the Application

### Option 1: Run Both Servers Concurrently
```bash
npm run dev
```

### Option 2: Run Separately

**Terminal 1 - Backend**:
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend**:
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## API Endpoints

### Users
- `POST /users` - Create new user
- `GET /users` - List all users
- `POST /users/login` - Login (returns JWT token)
- `POST /users/logout` - Logout (clears token)

### Items
- `POST /items` - Create item
- `GET /items` - List all items

### Carts (Protected)
- `POST /carts` - Add items to cart
- `GET /carts` - List all carts

### Orders (Protected)
- `POST /orders` - Convert cart to order
- `GET /orders` - List all orders

## Usage Flow

1. **Sign Up**: Create a new account
2. **Login**: Login with your credentials
   - Single-device login enforced
   - If already logged in elsewhere, you'll see an alert
3. **Browse Items**: View all available items
4. **Add to Cart**: Click on items to add them to your cart
5. **View Cart**: Click the "Cart" button to see your cart contents
6. **Checkout**: Click "Checkout" to convert your cart to an order
7. **View Orders**: Click "Orders" to see your order history
8. **Logout**: Click "Logout" to end your session

## Key Features

### Single-Device Login
- Users can only be logged in from one device at a time
- Token is stored in the User model
- Attempting to login from another device shows an alert
- Logout clears the token, allowing login from another device

### Authentication
- Passwords are hashed using bcryptjs
- JWT tokens are used for authentication
- Protected routes require valid token in Authorization header
- Token validation checks against stored token in database

### Cart Management
- One cart per user
- Items can be added to cart
- Cart is cleared when converted to order

## Testing

### Create Test Items

Use a tool like Postman or curl to create test items:

```bash
curl -X POST http://localhost:5000/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop","price":999}'

curl -X POST http://localhost:5000/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Mouse","price":25}'

curl -X POST http://localhost:5000/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Keyboard","price":75}'
```

## Notes

- This is a development build. For production, ensure to:
  - Change JWT_SECRET to a strong, random value
  - Use environment-specific MongoDB URIs
  - Enable HTTPS
  - Add rate limiting
  - Implement proper error logging
  - Add input validation and sanitization

## License

ISC
