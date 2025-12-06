import express from 'express';

import Event from '../models/Event.js';
import Purchase from '../models/Purchase.js';

import { protect, manager } from '../middleware/authMiddleware.js';
import { check, validationResult } from 'express-validator';

const router = express.Router();

router.post('/', protect, manager, 
    
    [
        check('title', 'Title is required').not().isEmpty(),
        check('location', 'Location is required').not().isEmpty(),
        check('date', 'Date is required').isISO8601().toDate(),
        check('price', 'Price must be a valid number').isNumeric(),
        check('capacity', 'Capacity must be a number greater than 0').isInt({min: 1}),
    ],

    async (req, res) => {

        const errors = validationResult(req);
        
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        try {
            const { title, description, date, price, location, capacity, imageUrl } = req.body;

            const event = await Event.create({
                title,
                description,
                date,
                price,
                location,
                capacity,
                imageUrl,
                managerId: req.user._id,
            });

            res.status(201).json(event);

        } catch (error) {

            console.error(error);
            res.status(500).json({ message: `Server error during event creation: ${error.message}`});

        }
});

router.get('/', async (req, res) => {
    try {
        const events = await Event.find({}).sort({ createdAt: -1});

        res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error retrieving events.'});
    }
});

router.get('/:id', async (req, res) => {
    try {
        // Find a single event by the ID provided in the URL parameter
        const event = await Event.findById(req.params.id);

        if (!event) {
            // If the ID is valid but no event is found, return 404
            return res.status(404).json({ message: 'Event not found' });
        }
        
        res.json(event);

    } catch (error) {
        console.error(error);
        
        // 🚨 CRITICAL: This is where we catch the CastError for the ID format.
        if (error.name === 'CastError') {
             return res.status(400).json({ message: 'Invalid Event ID format.' });
        }
        res.status(500).json({ message: 'Server error retrieving event.' });
    }
});


router.put('/:id', protect, manager, 
    
    [
        check('date', 'Date must be a valid date').optional().isISO8601().toDate(),
        check('price', 'Price must be a numeric value').optional().isNumeric(),
        check('capacity', 'Capacity must a number greater than 0').optional().isInt({min: 1}),
    ],
    
    async (req, res) => {

        const errors = validationResult(req);

        if(!errors.isEmpty())
           return res.status(400).json({ errors: errors.array()});

        try {
            const event = await Event.findById(req.params.id);
            
            if (!event)
                return res.status(404).json({ message: 'Event not found' });
            
            if (event.managerId.toString() !== req.user._id.toString())
                return res.status(403).json({ message: 'Not authorized to update this event'} );

            const updateEvent = await Event.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true}
            );

            res.json(updateEvent);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error during event update'});
        }
});

router.delete('/:id', protect, manager, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        
        if (!event)
            return res.status(404).json({ message: 'Event not found' });
        
        if (event.managerId.toString() !== req.user._id.toString())
            return res.status(403).json({ message: 'Not authorized to delete this event'} );
        
        await Purchase.deleteMany({ eventId: req.params.id });
        await event.deleteOne();
        
        res.json({ message: 'Event and associated purchase removed successfully'});
        
    } catch (error) {
        console.error(error);
        if (error.name === 'CastError')
            return res.status(400).json({ message: 'Invalid Event ID format.'});

        res.status(500).json({ message: 'Server error during event deletion'});
        
    }
});


export default router;