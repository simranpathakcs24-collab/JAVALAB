import mongoose from "mongoose";

export const connectDb = async () => {
    // prefer MONGO_URI but accept MONGODB_URI as alternate env name
    const uri = process.env.MONGO_URI || process.env.MONGODB_URI;

    if (!uri) {
        console.error("Missing database connection string: no MONGO_URI or MONGODB_URI found in environment.");
        console.error("Create a .env file in the backend folder (or set environment variables) and add a line like:\n  MONGO_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/mydb\nSee backend/.env.example for details.");
        process.exit(1);
    }

    try {
        const connection = await mongoose.connect(uri);
        console.log(`Successfully connected to database: ${connection.connection.host}`);
    } catch (error) {
        console.error(`Couldn't connect to database, error is ${error.message}`);
        process.exit(1);
    }
};