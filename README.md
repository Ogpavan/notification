# Node.js API for Vercel

A basic Node.js API built with Express.js that can be deployed on Vercel.

## Features

- Express.js server
- CORS enabled
- JSON parsing middleware
- Sample endpoints for users
- Health check endpoint
- Error handling
- Ready for Vercel deployment

## Endpoints

### GET /
Welcome message with timestamp

### GET /api/health
Health check endpoint

### GET /api/users
Get all users (sample data)

### GET /api/users/:id
Get user by ID

### POST /api/users
Create a new user
Required fields: `name`, `email`

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The server will run on `http://localhost:3000`

## Deployment on Vercel

1. Install Vercel CLI (if not already installed):
```bash
npm i -g vercel
```

2. Deploy to Vercel:
```bash
vercel
```

3. Follow the prompts to configure your deployment

## Project Structure

```
├── api/
│   └── index.js          # Main API file
├── package.json          # Project dependencies
├── vercel.json          # Vercel configuration
└── README.md            # This file
```

## Environment Variables

No environment variables are required for basic functionality, but you can add them in Vercel dashboard for production use.

## Sample API Calls

### Get all users
```bash
curl https://your-deployment-url.vercel.app/api/users
```

### Create a user
```bash
curl -X POST https://your-deployment-url.vercel.app/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice Brown", "email": "alice@example.com"}'
```
