## Backend — local setup

This backend requires a MongoDB connection string in an `.env` file.

Steps to get running locally:

1. Copy the example `.env.example` to `.env` inside the `backend/` folder.
2. Fill in the values (for example `MONGO_URI`, `JWT_SECRET`, `FRONTEND_URL`, and `PORT`).

Example `.env` lines:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/events-dev
JWT_SECRET=some-secure-random-string
FRONTEND_URL=http://localhost:3000
```

3. Install dependencies and run:

```powershell
cd backend
npm install
npm run dev
```

If `MONGO_URI` is not set the server will print a clear error and exit — see `config/db.js` for the validation.

Security: Do not commit your `.env` file — it's already included in `.gitignore`.
