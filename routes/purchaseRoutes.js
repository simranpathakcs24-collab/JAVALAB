// backend/routes/purchaseRoutes.js

import express from "express";
import Event from "../models/Event.js";
import Purchase from "../models/Purchase.js";
import { protect } from "../middleware/authMiddleware.js"; // Only 'protect' is needed

const router = express.Router();

// @desc    Create a new purchase (Buy Event)
// @route   POST /api/purchases
// @access  Private/Authenticated
router.post("/", protect, async (req, res) => {
    try {
        const { eventId, purchasePrice } = req.body;

        // 1. INTEGRITY CHECK: Ensure the event actually exists
        const event = await Event.findById(eventId)
            .populate('registrationsCount').lean();
        
        if (!event) {
            return res
                .status(404)
                .json({ message: "Event not found. Cannot purchase." });
        }

        if (event.registrationsCount >= event.capacity) {
            return res.status(400).json({ message: 'Registration failed. Event is fully booked.'});
        }

        // 2. CREATE the purchase document (customerId comes securely from the token)
        const purchase = await Purchase.create({
            customerId: req.user._id,
            eventId,
            purchasePrice,
        });

        res.status(201).json(purchase);
        
    } catch (error) {
        console.error(error);
        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid data format provided." });
        }
        res.status(500).json({ message: "Server error during purchase creation." });
    }
});

// @desc    Get all purchases for the logged-in user
// @route   GET /api/purchases/me
// @access  Private/Authenticated
router.get("/me", protect, async (req, res) => {
    try {
        // Find purchases where customerId matches the authenticated user's ID
        const orders = await Purchase.find({ customerId: req.user._id })
            // Populate the event details for readable output
            .populate("eventId", "title date location price imageUrl");

        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error retrieving orders." });
    }
});

router.put('/:id/status', protect, async (req, res) => {
    try {

        const { status } = req.body;
    
        if (!['completed', 'failed'].includes(status))
            return res.status(400).json({ message: 'Invalid status provided' });
    
        const updatedPurchase = await Purchase.findByIdAndUpdate(
            req.params.id,
            { status: status },
            { new: true, runValidators: true }
        );
    
        if (!updatedPurchase) return res.status(404).json({ message: 'Purchase record not found'});
    
        res.json(updatedPurchase);
        
    } catch (error) {
        
        console.error(error);
        if (error.name === 'CastError') return res.status(400).json({message: 'Invalid Purchase ID format.'});

        res.status(500).json({ message: 'Purchase record not found.' });
    }
});

export default router;
