# Second Brain

A simple Second Brain backend API with a small dashboard UI. Users can sign up, sign in, save content, view their own notes, delete their own notes, and share or disable a public brain link.

## Tech Stack

Node.js, TypeScript, Express, MongoDB, Mongoose, JWT, bcryptjs, Zod, dotenv.

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Set these values in `.env` before starting:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Open `http://localhost:3000` for the UI.

## Scripts

```bash
npm run dev
npm run build
npm start
```

## API

Use protected routes with:

```http
Authorization: Bearer <JWT_TOKEN>
```

### Signup

```http
POST /api/v1/signup
```

```json
{
  "username": "harkirat",
  "password": "12345678"
}
```

### Signin

```http
POST /api/v1/signin
```

```json
{
  "username": "harkirat",
  "password": "12345678"
}
```

### Create Content

```http
POST /api/v1/content
```

```json
{
  "type": "youtube",
  "link": "https://www.youtube.com/watch?v=example",
  "title": "Backend Development",
  "tags": ["backend", "nodejs", "mongodb"]
}
```

### Get Content

```http
GET /api/v1/content
```

### Delete Content

```http
DELETE /api/v1/content
```

```json
{
  "contentId": "CONTENT_ID"
}
```

### Enable Or Disable Sharing

```http
POST /api/v1/brain/share
```

```json
{
  "share": true
}
```

Use `{ "share": false }` to disable sharing.

### Public Shared Brain

```http
GET /api/v1/brain/:shareLink
```

## Testing

Use the UI or an API client like Postman. Test signup, signin, content creation, content fetch, deletion ownership, sharing, public shared brain access, and disabling a share link.
