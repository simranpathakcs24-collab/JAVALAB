import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Event title is required'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Event description is required'],
        },
        date: {
            type: Date,
            required: [true, 'Event date is required'],
        },
        price: {
            type: Number,
            required: [true, 'Event price is required'],
            min: [0, 'Price cannot be negative'],
        },
        location: {
            type: String,
            required: [true, 'Location is required'],
        },
        capacity: {
            type: Number,
            required: [true, 'Capacity is required'],
            min: [1, "Capacity must be atleast 1"],
        },
        imageUrl: {
            type: String,
            default: 'https://media.istockphoto.com/id/2159173395/vector/404-error-page.jpg?s=612x612&w=0&k=20&c=Pds7cCdFW-1bKnUDuITaFuGIY3XTUXQizq6UwdBOjCc=',
        },
        managerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {timestamps: true}
);

EventSchema.virtual('registrationsCount', {
    ref: 'Purchase',
    localField: '_id',
    foreignField: 'eventId',
    count: true
});

EventSchema.set('toObject', { virtuals: true});
EventSchema.set('toJSON', { virtuals: true } );


const Event = mongoose.model('Event', EventSchema);
export default Event;

