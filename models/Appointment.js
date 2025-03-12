// models/Appointment.js
import Appointments from '@/pages/Appointment';
import mongoose from 'mongoose';
const AppointmentSchema = new mongoose.Schema({
  doctor: { type: String, required: true },
  patient: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  meetingID: { type: String, required: true },
  status: { type: String, default: 'Pending' },
}, { timestamps: true });

export default mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema);

//  export default Appointment