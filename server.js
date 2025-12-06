import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './config/db.js';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import purchaseRoutes from './routes/purchaseRoutes.js';

import { errorHandler, notFound } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express(); 

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const PORT = process.env.PORT || 5000;

app.use(express.json());
// app.use(cors());

// Defining the API routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/purchases', purchaseRoutes);

app.get('/', (req, res) => {
    res.send('GOOD MORNING EVERYONE PRESENT HERE');
});

app.use(notFound)
app.use(errorHandler)

const startServer = () => {
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`);
    });
};

const initializeApp = async () => {
    try {
        await connectDb();
        startServer();
    }
    catch (error) {
        console.error(`Failed to initialize application: ${error.message}`);
    }
};

initializeApp();
