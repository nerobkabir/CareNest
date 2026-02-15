import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  serviceId: { type: String, required: true },
  serviceName: { type: String, required: true },
  duration: { type: Number, required: true }, // in hours
  location: {
    division: String,
    district: String,
    city: String,
    area: String,
    address: String,
  },
  totalCost: { type: Number, required: true },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
    default: 'Pending',
  },
  paymentIntentId: String,
}, { timestamps: true });

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);